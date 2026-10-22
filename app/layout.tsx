import type { Metadata } from "next";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteUrl } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: "Nishad Rashid Mahi | Business Data Analyst", template: "%s | Nishad Rashid Mahi" },
  description: "Business Data Analyst portfolio focused on turning business data into clear insights and better decisions through SQL, Python, Tableau, Power BI and Excel.",
  keywords: ["Business Data Analyst", "Business Intelligence", "SQL", "Python", "Tableau", "Power BI", "KPI Dashboard", "Business Performance Analysis"],
  alternates: { canonical: "/" }, openGraph: { type: "website", title: "Nishad Rashid Mahi — Business Data Analyst", description: "Business → Data → Insight → Decision", url: siteUrl, siteName: "Nishad Rashid Mahi" },
  twitter: { card: "summary", title: "Nishad Rashid Mahi — Business Data Analyst", description: "Business → Data → Insight → Decision" }, robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
const personSchema = { "@context": "https://schema.org", "@type": "Person", name: "Nishad Rashid Mahi", jobTitle: "Business Data Analyst", url: siteUrl, knowsAbout: ["Business analysis", "Data visualization", "SQL", "Python", "Tableau", "Power BI", "Excel"] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><ScrollReveal/>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /><Analytics/></body></html>;
}
