"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, Download, Mail, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";

type ChatMessage = { from: "nishad" | "visitor"; text: string; href?: string; label?: string };
type DeliveryResult = { mode: "delivered" | "partial" | "demo"; delivered?: string[]; message?: string };

export const OPEN_LEAD_CHAT_EVENT = "open-lead-chat";

export function openLeadChat(intent = "general") {
  window.dispatchEvent(new CustomEvent(OPEN_LEAD_CHAT_EVENT, { detail: { intent } }));
}

async function sendLead(payload: Record<string, unknown>): Promise<DeliveryResult> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as DeliveryResult;
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

function DeliveryNotice({ result }: { result: DeliveryResult }) {
  const isDemo = result.mode === "demo";
  return <div className={`delivery-notice ${isDemo ? "demo" : "sent"}`} role="status">
    <span>{isDemo ? <Mail size={18}/> : <Check size={18}/>}</span>
    <div><b>{isDemo ? "Message captured in demo mode" : "Your message has been sent"}</b><p>{isDemo ? "Connect an email or WhatsApp account to activate direct delivery." : `Delivered by ${result.delivered?.join(" and ") || "the configured contact channel"}. I can follow up using the details you provided.`}</p></div>
  </div>;
}

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<DeliveryResult | null>(null);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true); setError(""); setResult(null);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      const response = await sendLead({ ...values, source: "contact form" });
      setResult(response);
      if (response.mode !== "demo") form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message.");
    } finally { setSending(false); }
  }

  return <form className="contact-form-card" onSubmit={submit}>
    <div className="form-heading"><span><i/> DIRECT MESSAGE</span><b>Tell me what you need</b><p>Leave an email, a WhatsApp number, or both.</p></div>
    <div className="field-row"><label>Name<input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name"/></label><label>Email<input name="email" type="email" maxLength={120} autoComplete="email" placeholder="you@company.com"/></label></div>
    <label>Phone / WhatsApp<input name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="+1 555 000 0000"/></label>
    <fieldset><legend>Preferred reply</legend><label><input type="radio" name="preferredContact" value="email" defaultChecked/> Email</label><label><input type="radio" name="preferredContact" value="whatsapp"/> WhatsApp</label></fieldset>
    <label>Note<textarea name="message" required minLength={10} maxLength={2000} rows={4} placeholder="Briefly describe the role, project, or question…"/></label>
    <input className="trap" name="companyWebsite" tabIndex={-1} autoComplete="off"/>
    <button className="button" disabled={sending}>{sending ? "Sending…" : "Send message"}<Send size={15}/></button>
    <small className="privacy-note">Your details are used only to reply to this message.</small>
    {error && <p className="form-error" role="alert">{error}</p>}
    {result && <DeliveryNotice result={result}/>} 
  </form>;
}

const initialMessages: ChatMessage[] = [{ from: "nishad", text: "Hi — what would you like to do? Choose an option or write your own message." }];

export function LeadConversation() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [composer, setComposer] = useState(false);
  const [capture, setCapture] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<DeliveryResult | null>(null);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = (event: Event) => {
      setOpen(true);
      const intent = (event as CustomEvent<{ intent?: string }>).detail?.intent;
      if (intent === "help") choose("I need help", true);
    };
    window.addEventListener(OPEN_LEAD_CHAT_EVENT, show);
    return () => window.removeEventListener(OPEN_LEAD_CHAT_EVENT, show);
  }, []);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => panelRef.current?.querySelector<HTMLElement>("button, input")?.focus(), 30);
  }, [open]);

  useEffect(() => { messageEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, capture, composer, result]);

  function choose(choice: string, fromEvent = false) {
    let reply: ChatMessage;
    if (choice === "View my projects") reply = { from: "nishad", text: "You can explore five verified projects covering political funding, e-commerce, Amazon.in operations, Walmart performance and responsible maternal-health risk modelling.", href: "/projects", label: "View projects" };
    else if (choice === "Experience") reply = { from: "nishad", text: "I focus on business questions, reliable analysis, useful dashboards and clear decision support. My approach combines technical analysis with stakeholder communication and disciplined project delivery.", href: "#about", label: "Read about me" };
    else if (choice === "Download résumé") reply = { from: "nishad", text: "Here is my résumé as a PDF, with my experience, skills and five portfolio projects.", href: "/Nishad_Rashid_Mahi_Resume.pdf", label: "Download résumé (PDF)" };
    else if (choice === "Other") {
      reply = { from: "nishad", text: "Of course — write your question below and I’ll include it in your message to me." };
      setComposer(true); setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      reply = { from: "nishad", text: "Please share a little about what you need, then add the best email or WhatsApp number for me to contact you." };
      setComposer(true); setCapture(true); setTimeout(() => inputRef.current?.focus(), 50);
    }
    setMessages(current => [...current, ...(fromEvent ? [] : [{ from: "visitor" as const, text: choice }]), reply]);
  }

  function sendDraft(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages(current => [...current, { from: "visitor", text }, { from: "nishad", text: "Thanks — what is the best email or WhatsApp number for me to reach you?" }]);
    setDraft(""); setCapture(true);
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true); setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const transcript = messages.map(item => `${item.from === "visitor" ? "Visitor" : "Chat"}: ${item.text}`).join("\n");
    const visitorMessages = messages.filter(item => item.from === "visitor").map(item => item.text);
    try {
      const response = await sendLead({ ...values, message: visitorMessages.at(-1) || "Portfolio contact request", transcript, source: "website chat" });
      setResult(response);
      setMessages(current => [...current, { from: "nishad", text: response.mode === "demo" ? "Your details were captured in demo mode. Direct delivery will activate after an email or WhatsApp account is connected." : "Thank you — I’ve received your full message and contact details." }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message.");
    } finally { setSending(false); }
  }

  return <>
    <button className="chat-launcher" onClick={() => setOpen(true)} aria-label="Open Let’s talk chat"><MessageCircle size={20}/><span>Let’s talk</span><Sparkles size={14}/></button>
    {open && <div className="overlay" role="presentation" onMouseDown={event => event.target === event.currentTarget && setOpen(false)}>
      <div className="chat-panel real-chat-panel" role="dialog" aria-modal="true" aria-label="Let’s talk" ref={panelRef}>
        <header><div><span className="chat-avatar">N</span><div><b>Let’s talk</b><small><i/> Replies and contact requests</small></div></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X/></button></header>
        <div className="messages" aria-live="polite">
          {messages.map((message, index) => <div key={`${message.text}-${index}`} className={`message ${message.from === "visitor" ? "user" : "bot"}`}><p>{message.text}</p>{message.href && (message.href.endsWith(".pdf")
            ? <a href={message.href} target="_blank" rel="noreferrer">{message.label}<ChevronRight size={15}/></a>
            : <Link href={message.href} onClick={() => message.href?.startsWith("#") && setOpen(false)}>{message.label}<ChevronRight size={15}/></Link>)}</div>)}
          {!result && <div className="chat-options" aria-label="Conversation options">
            <button onClick={() => choose("View my projects")}><ArrowRight/>View my projects</button>
            <button onClick={() => choose("Experience")}><Sparkles/>Experience</button>
            <button onClick={() => choose("Download résumé")}><Download/>Download résumé</button>
            <button onClick={() => choose("I need help")}><MessageCircle/>I need help</button>
            <button onClick={() => choose("Other")}><span>•••</span>Other</button>
          </div>}
          {composer && !result && <form className="chat-composer" onSubmit={sendDraft}><input ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} maxLength={1000} aria-label="Write your message" placeholder="Write your message…"/><button disabled={!draft.trim()} aria-label="Send message"><Send/></button></form>}
          {capture && !result && <form className="chat-contact-capture" onSubmit={submitContact}><div className="capture-title"><b>How should I contact you?</b><small>Email, WhatsApp, or both</small></div><label>Name<input required name="name" minLength={2} maxLength={80} autoComplete="name" placeholder="Your name"/></label><div className="field-row"><label><Mail/>Email<input name="email" type="email" maxLength={120} autoComplete="email" placeholder="you@company.com"/></label><label><Phone/>Phone / WhatsApp<input name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="+1 555 000 0000"/></label></div><fieldset><legend>Preferred reply</legend><label><input type="radio" name="preferredContact" value="email" defaultChecked/> Email</label><label><input type="radio" name="preferredContact" value="whatsapp"/> WhatsApp</label></fieldset><input className="trap" name="companyWebsite" tabIndex={-1} autoComplete="off"/><button className="button" disabled={sending}>{sending ? "Sending…" : "Send message"}<Send size={15}/></button>{error && <p className="form-error" role="alert">{error}</p>}</form>}
          {result && <DeliveryNotice result={result}/>} 
          <div ref={messageEndRef}/>
        </div>
      </div>
    </div>}
  </>;
}
