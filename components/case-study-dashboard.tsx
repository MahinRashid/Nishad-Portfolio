"use client";
import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import type { Project } from "@/content/projects";

export function CaseStudyDashboard({ project }: { project: Project }) {
  const [segment,setSegment]=useState("All");
  const [activeImage,setActiveImage]=useState<number|null>(null);
  if (project.dashboardImages?.length && project.dashboardGallery === "showcase") {
    const hasDataModel = project.dashboardImages.some(image=>/data model/i.test(image.title || ""));
    const reportViewCount = project.dashboardImages.length - (hasDataModel ? 1 : 0);
    const platform = project.dashboardPlatform || "Dashboard";
    return <div className="powerbi-gallery" aria-label={`${platform} report gallery`}>
      <div className="gallery-intro">
        <div><span>{platform.toUpperCase()} REPORT GALLERY</span><strong>{reportViewCount} decision view{reportViewCount===1?"":"s"}{hasDataModel?" and the data model":""}</strong></div>
        <p>Select any view to inspect the dashboard at full size.</p>
      </div>
      <div className="powerbi-gallery-grid">
        {project.dashboardImages.map((image,index)=>{const isModel=/data model/i.test(image.title || "");return <figure key={image.src} className={`powerbi-gallery-card ${index===0?"featured":""} ${isModel?"model-card":""}`}>
          <header><span>0{index+1} · {isModel?"DATA MODEL":"REPORT VIEW"}</span><small><i/> VERIFIED BUILD</small></header>
          <button type="button" onClick={()=>setActiveImage(index)} aria-label={`Open ${image.title || `dashboard ${index+1}`} full size`}>
            <Image src={image.src} alt={image.alt} width={image.width || 1440} height={image.height || 808} sizes={index===0||isModel?"(max-width: 900px) 94vw, 86vw":"(max-width: 900px) 94vw, 43vw"}/>
            <span><Maximize2/> Inspect view</span>
          </button>
          <figcaption><strong>{image.title}</strong><span>{image.description}</span></figcaption>
        </figure>})}
      </div>
      {activeImage!==null&&<div className="dashboard-lightbox" role="dialog" aria-modal="true" aria-label={`${project.dashboardImages[activeImage].title} enlarged view`} onMouseDown={event=>event.target===event.currentTarget&&setActiveImage(null)}>
        <div><header><div><span>{platform.toUpperCase()} · VERIFIED PROJECT</span><strong>{project.dashboardImages[activeImage].title}</strong></div><button onClick={()=>setActiveImage(null)} aria-label="Close enlarged dashboard"><X/></button></header><Image src={project.dashboardImages[activeImage].src} alt={project.dashboardImages[activeImage].alt} width={project.dashboardImages[activeImage].width || 1440} height={project.dashboardImages[activeImage].height || 808} sizes="94vw"/></div>
      </div>}
    </div>;
  }
  if (project.dashboardImages?.length) {
    const dashboardDetails = [
      { title: "Who funds the parties?", description: "Funding sources, donor concentration and election-cycle patterns" },
      { title: "Can the data be trusted?", description: "Data quality, corrections and reporting reliability" },
    ];
    const dashboardPairs = project.dashboardImages.slice(0,2).map((dark,index) => ({
      dark,
      light: project.dashboardImages?.[index + 2],
      ...dashboardDetails[index],
    }));

    return <div className="tableau-gallery" aria-label="Tableau dashboard gallery">
      <div className="gallery-intro">
        <div><span>TABLEAU DASHBOARD GALLERY</span><strong>Two views of the analysis</strong></div>
        <p>Hover or focus on a dashboard to preview its light mode.</p>
      </div>
      <div className="gallery-grid">
        {dashboardPairs.map((dashboard,index)=><figure key={dashboard.dark.src} className="dashboard-gallery-card">
          <header><span>0{index + 1} · DASHBOARD</span><small><i/> DARK MODE</small></header>
          <a className="dashboard-image-stack" href={project.dashboardUrl} target="_blank" rel="noreferrer" aria-label={`Open ${dashboard.title} on Tableau Public. Hover or focus to preview light mode.`}>
            <Image className="dashboard-theme-image dashboard-dark-image" src={dashboard.dark.src} alt={dashboard.dark.alt} width={1200} height={800} sizes="(max-width: 900px) 94vw, 46vw" />
            {dashboard.light&&<Image className="dashboard-theme-image dashboard-light-image" src={dashboard.light.src} alt={dashboard.light.alt} width={1200} height={800} sizes="(max-width: 900px) 94vw, 46vw" />}
            <span className="theme-state"><b>Dark</b><b>Light</b></span>
            <span className="gallery-scan" aria-hidden="true"/>
          </a>
          <figcaption><div><strong>{dashboard.title}</strong><span>{dashboard.description}</span></div><span className="gallery-action">View on Tableau ↗</span></figcaption>
        </figure>)}
      </div>
    </div>;
  }
  const d=project.regions[segment]; const w=700,h=230;
  const pts=d.values.map((v,i)=>`${i*(w/(d.values.length-1))},${h-v*1.8}`).join(" ");
  return <div className="case-dashboard" style={{"--accent":project.accent} as React.CSSProperties}>
    <div className="case-dashboard-head"><div><span>INTERACTIVE DASHBOARD · DEMO DATA</span><h2>{project.chartLabel}</h2></div><div className="segment-control">{Object.keys(project.regions).map(s=><button key={s} className={s===segment?"active":""} onClick={()=>setSegment(s)}>{s}</button>)}</div></div>
    <div className="case-metrics"><div><span>Primary KPI</span><strong>{d.revenue}</strong></div><div><span>Supporting KPI</span><strong>{d.margin}</strong></div><p>{d.insight}</p></div>
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${project.chartLabel} for ${segment}`} preserveAspectRatio="none">{[0,1,2,3].map(i=><line key={i} x1="0" y1={35+i*52} x2={w} y2={35+i*52}/>) }<polyline points={pts} fill="none" stroke={project.accent} strokeWidth="5" vectorEffect="non-scaling-stroke"/>{d.values.map((v,i)=><circle key={i} cx={i*(w/(d.values.length-1))} cy={h-v*1.8} r="6" fill="white" stroke={project.accent} strokeWidth="4"/>)}</svg>
  </div>;
}
