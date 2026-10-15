"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, X } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectAssistant({ project, relatedSlug }: { project: Project; relatedSlug: string }) {
  const [open,setOpen]=useState(false); const [answer,setAnswer]=useState(project.verified ? `Ask me about ${project.title}. My answers use the verified project details shown in this case study.` : `Ask me about ${project.title}. My answers use only the structured demonstration content shown in this case study.`);
  const dashboardExplanation = project.dashboardImages?.length
    ? `I built ${project.dashboardImages.length} report view${project.dashboardImages.length===1?"":"s"}: ${project.dashboardImages.map((image) => image.title).filter(Boolean).join(", ")}. ${project.regions.All.insight}`
    : `I designed the dashboard to help you compare segments while updating the primary KPI, supporting KPI and interpretation. ${project.regions.All.insight}`;
  const actions: Record<string,string> = { "What was the business problem?": project.businessProblem, "What tools were used?": `I used ${project.tools.join(", ")}.`, "What was analyzed?": `I analyzed ${project.dataset} ${project.verified ? "My process covered" : "The demonstration process covers"} ${project.process.join(", ").toLowerCase()}.`, "What recommendations came from the analysis?": `My recommendations were: ${project.recommendations.join(" ")}`, "Explain this dashboard.": dashboardExplanation };
  return <><button className="chat-launcher" onClick={()=>setOpen(true)}><MessageCircle size={19}/> <span>Ask about this case study</span> <Sparkles size={13}/></button>{open&&<div className="project-chat" role="dialog" aria-modal="true" aria-label={`Ask about ${project.title}`}><header><div><b>My case study guide</b><small>Ask about my work · {project.title}</small></div><button onClick={()=>setOpen(false)} aria-label="Close"><X/></button></header><div className="project-chat-body"><p>{answer}</p><div>{Object.keys(actions).map(a=><button key={a} onClick={()=>setAnswer(actions[a])}>{a}</button>)}<Link href={`/projects/${relatedSlug}`}>Show me a related project</Link></div></div></div>}</>;
}
