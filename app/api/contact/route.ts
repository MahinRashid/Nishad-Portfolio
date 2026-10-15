import { NextResponse } from "next/server";

const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/[<>]/g, "").trim().slice(0, max) : "";
}

function configured(name: string) {
  return Boolean(process.env[name]?.trim());
}

function buildMessage(data: { source: string; name: string; email: string; phone: string; preferredContact: string; message: string; transcript: string }) {
  return [
    "New portfolio enquiry",
    `Source: ${data.source}`,
    `Name: ${data.name}`,
    `Email: ${data.email || "Not provided"}`,
    `Phone / WhatsApp: ${data.phone || "Not provided"}`,
    `Preferred reply: ${data.preferredContact || "Not specified"}`,
    "", "Message:", data.message,
    ...(data.transcript ? ["", "Conversation transcript:", data.transcript] : []),
  ].join("\n");
}

async function deliverEmail(subject: string, text: string, replyTo: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL, to: [process.env.LEAD_TO_EMAIL], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
}

async function deliverWhatsApp(text: string) {
  const response = await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: process.env.WHATSAPP_TO_NUMBER, type: "text", text: { preview_url: false, body: text.slice(0, 4000) } }),
  });
  if (!response.ok) throw new Error(`WhatsApp provider returned ${response.status}`);
}

async function deliverWebhook(payload: Record<string, string>) {
  const response = await fetch(process.env.LEAD_WEBHOOK_URL!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const current = hits.get(key);
  if (current && current.resetAt > now && current.count >= MAX_REQUESTS) return NextResponse.json({ message: "Too many messages. Please wait a minute and try again." }, { status: 429 });
  hits.set(key, current && current.resetAt > now ? { ...current, count: current.count + 1 } : { count: 1, resetAt: now + WINDOW_MS });

  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  if (clean(body.companyWebsite, 100)) return NextResponse.json({ mode: "demo" });

  const data = {
    source: clean(body.source, 60) || "website",
    name: clean(body.name, 80),
    email: clean(body.email, 120).toLowerCase(),
    phone: clean(body.phone, 30),
    preferredContact: clean(body.preferredContact, 20),
    message: clean(body.message, 2000),
    transcript: clean(body.transcript, 6000),
  };
  if (data.name.length < 2 || data.message.length < 10) return NextResponse.json({ message: "Please add your name and a little more detail about your message." }, { status: 400 });
  if (!data.email && !data.phone) return NextResponse.json({ message: "Please provide an email address or phone / WhatsApp number." }, { status: 400 });
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  if (data.phone && data.phone.replace(/\D/g, "").length < 7) return NextResponse.json({ message: "Please enter a valid phone or WhatsApp number." }, { status: 400 });

  const fullText = buildMessage(data);
  const subject = `Portfolio enquiry from ${data.name}`;
  const deliveries: Array<{ name: string; run: () => Promise<void> }> = [];
  if (["RESEND_API_KEY", "LEAD_FROM_EMAIL", "LEAD_TO_EMAIL"].every(configured)) deliveries.push({ name: "email", run: () => deliverEmail(subject, fullText, data.email) });
  if (["WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_TO_NUMBER"].every(configured)) deliveries.push({ name: "WhatsApp", run: () => deliverWhatsApp(fullText) });
  if (configured("LEAD_WEBHOOK_URL")) deliveries.push({ name: "webhook", run: () => deliverWebhook({ ...data, fullText }) });
  if (!deliveries.length) return NextResponse.json({ mode: "demo", delivered: [], message: "Validated in demo mode; no delivery provider is configured." });

  const results = await Promise.allSettled(deliveries.map(channel => channel.run()));
  const delivered = deliveries.filter((_, index) => results[index].status === "fulfilled").map(channel => channel.name);
  const failed = deliveries.filter((_, index) => results[index].status === "rejected").map(channel => channel.name);
  if (!delivered.length) {
    console.error("Lead delivery failed", results.map(result => result.status === "rejected" ? result.reason : null));
    return NextResponse.json({ message: "Your message could not be delivered right now. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ mode: failed.length ? "partial" : "delivered", delivered, failed });
}
