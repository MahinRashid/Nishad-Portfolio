import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import { CaseStudyDashboard } from "@/components/case-study-dashboard";
import { ProjectAssistant } from "@/components/project-assistant";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.title} | Nishad Rashid Mahi`, description: project.summary, url: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const isPoliticalDonations = project.slug === "uk-political-donations";
  const isAmazonOperations = project.slug === "retail-performance-analysis";
  const isWalmartSales = project.slug === "walmart-sales-trend";
  const isMaternalHealth = project.slug === "maternity-health-risk";
  const source = isPoliticalDonations
    ? "Electoral Commission register of donations"
    : isAmazonOperations
      ? "Amazon.in apparel seller order and stock reports"
      : isWalmartSales
        ? "Walmart weekly store sales dataset"
        : isMaternalHealth
          ? "UCI Maternal Health Risk dataset"
      : project.verified
        ? "Synthetic e-commerce order, customer, product and order-line datasets"
        : "Synthetic demonstration data";
  const verificationNote = isPoliticalDonations
    ? "I built this verified project using published Electoral Commission data."
    : isAmazonOperations
      ? "I rebuilt this verified project from the raw Amazon.in order and stock reports."
      : isWalmartSales
        ? "I rebuilt this verified project from 6,435 complete Walmart store-week records."
        : isMaternalHealth
          ? "I tested this screening model on 452 distinct records using grouped cross-validation. It is not a medical device."
      : project.verified
        ? "I built this verified project from the supplied order, customer, product and order-line datasets."
        : "I included this demonstration to show how I structure an analysis.";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    author: { "@type": "Person", name: "Nishad Rashid Mahi" },
    isBasedOn: source,
  };

  return <main id="main" className="case-page" style={{ "--accent": project.accent } as React.CSSProperties}>
    <nav className="case-nav" aria-label="Breadcrumb">
      <Link href="/"><ArrowLeft /> Overview</Link><span>/</span><Link href="/projects">Projects</Link><span>/</span><b>{project.title}</b>
    </nav>
    <header className="case-hero">
      <div>
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        {project.githubUrl && <div className="case-hero-actions"><a href={project.githubUrl} target="_blank" rel="noreferrer">View GitHub repository <ExternalLink /></a></div>}
      </div>
      <aside><span>THE BUSINESS QUESTION</span><blockquote>“{project.businessProblem}”</blockquote><small>{verificationNote}</small></aside>
    </header>
    <section className="story-flow" aria-label="Project story">
      <span>Business question</span><ChevronRight /><span>Data</span><ChevronRight /><span>Analysis</span><ChevronRight /><span>Insight</span><ChevronRight /><span>Recommendation</span><ChevronRight /><b>Decision</b>
    </section>
    <section className="case-section two-col">
      <div><p className="eyebrow">01 · CONTEXT</p><h2>From a broad concern to testable questions.</h2></div>
      <div><h3>Business problem</h3><p>{project.businessProblem}</p><h3>Questions explored</h3><ul>{project.questions.map((question) => <li key={question}>{question}</li>)}</ul><h3>Dataset</h3><p>{project.dataset}</p></div>
    </section>
    <section className="case-section muted-section">
      <p className="eyebrow">02 · ANALYSIS</p><h2>A transparent path from preparation to interpretation.</h2>
      <div className="process-grid">{project.process.map((step, index) => <article key={step}><span>0{index + 1}</span><p>{step}</p></article>)}</div>
    </section>
    <section className="case-section dashboard-section"><p className="eyebrow">03 · DASHBOARD</p><CaseStudyDashboard project={project} /></section>
    <section className="case-section">
      <p className="eyebrow">04 · FINDINGS</p>
      <div className="case-kpis">{project.kpis.map((kpi) => <article key={kpi.label}><span>{kpi.label}</span><strong>{kpi.value}</strong><small>{kpi.note}</small></article>)}</div>
      <div className="findings-grid">
        <div><h2>What the analysis surfaced</h2>{project.findings.map((finding, index) => <p key={finding}><span>0{index + 1}</span>{finding}</p>)}</div>
        <div><h2>Recommended next moves</h2>{project.recommendations.map((recommendation, index) => <p key={recommendation}><span>0{index + 1}</span>{recommendation}</p>)}</div>
      </div>
    </section>
    <section className="case-section limits">
      <div><p className="eyebrow">LIMITATIONS</p><h2>{project.verified ? "What the analysis does not establish." : "What this demo cannot claim."}</h2></div>
      <ul>{project.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}{!project.verified && (!project.githubUrl || !project.notebookUrl || !project.dashboardUrl) && <li>Any resource without a link remains a placeholder until a verified URL is provided.</li>}</ul>
    </section>
    <section className="case-cta"><div><span>NEXT CASE STUDY</span><h2>{nextProject.title}</h2></div><Link href={`/projects/${nextProject.slug}`}>Continue exploring <ArrowRight /></Link></section>
    <footer className="case-footer">
      <Link href="/projects"><ArrowLeft /> All projects</Link>
      <div>
        {project.dashboardUrl ? <a href={project.dashboardUrl} target="_blank" rel="noreferrer">Live dashboard <ExternalLink /></a> : <span aria-disabled="true">Dashboard URL <ExternalLink /></span>}
        {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ExternalLink /></a> : <span aria-disabled="true">GitHub <ExternalLink /></span>}
        {project.notebookUrl ? <a href={project.notebookUrl} target="_blank" rel="noreferrer">Notebook <ExternalLink /></a> : <span aria-disabled="true">Notebook <ExternalLink /></span>}
      </div>
    </footer>
    <ProjectAssistant project={project} relatedSlug={nextProject.slug} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
