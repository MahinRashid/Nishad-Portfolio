"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    const register = () => {
      const targets = document.querySelectorAll<HTMLElement>("main > section:not(#overview), .project-list > a, .case-section, .case-cta");
      targets.forEach((target,index) => {
        if (target.classList.contains("scroll-reveal")) return;
        target.classList.add("scroll-reveal", `reveal-${index % 3 === 0 ? "left" : index % 3 === 1 ? "right" : "up"}`);
        target.style.setProperty("--reveal-delay", `${Math.min(index % 4,3) * 70}ms`);
        if (reducedMotion) target.classList.add("is-visible");
        else observer.observe(target);
      });
      document.documentElement.classList.add("reveal-ready");
    };

    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); document.documentElement.classList.remove("reveal-ready"); };
  }, []);

  return null;
}
