"use client";

import React, { useEffect, useRef } from "react";
import { Lightning } from "@phosphor-icons/react";

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("skill-bar")) {
              const bar = entry.target as HTMLElement;
              const width = bar.getAttribute("data-width");
              setTimeout(() => {
                bar.style.width = `${width}%`;
              }, 200);
            } else {
              entry.target.classList.add("visible");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const animateEls = sectionRef.current?.querySelectorAll(".fade-in-up, .section-tag, .section-title, .section-desc, .skill-bar");
    animateEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const designSkills = [
    { name: "UI Design", p: 95 },
    { name: "UX Research", p: 88 },
    { name: "Prototyping", p: 92 },
    { name: "Design Systems", p: 85 },
  ];

  const frontendSkills = [
    { name: "HTML/CSS", p: 80 },
    { name: "JavaScript", p: 65 },
    { name: "Motion Design", p: 75 },
  ];

  const tools = [
    { name: "Figma", icon: "🎨" },
    { name: "Adobe XD", icon: "💜" },
    { name: "Photoshop", icon: "🖼️" },
    { name: "Sketch", icon: "💎" },
    { name: "HTML & CSS", icon: "🌐" },
    { name: "Prototyping", icon: "🚀" },
  ];

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag"><Lightning size={16} /> Expertise</div>
          <h2 className="section-title">Skills & <span className="gradient-text">Tools</span></h2>
          <p className="section-desc">My design toolkit spans from research and strategy to high-fidelity prototyping and design systems.</p>
        </div>

        <div className="skills-layout">
          <div className="skills-left">
            <div className="skill-category fade-in-up">
              <div className="skill-cat-title">Design Skills</div>
              <div className="skills-row">
                {designSkills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-wrap">
                      <div className="skill-bar" data-width={skill.p}></div>
                    </div>
                    <span className="skill-pct">{skill.p}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category fade-in-up fade-delay-1">
              <div className="skill-cat-title">Frontend Basics</div>
              <div className="skills-row">
                {frontendSkills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-wrap">
                      <div className="skill-bar" data-width={skill.p}></div>
                    </div>
                    <span className="skill-pct">{skill.p}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tools-grid fade-in-up fade-delay-2">
            {tools.map(tool => (
              <div key={tool.name} className="tool-card">
                <span className="tool-icon">{tool.icon}</span>
                <span className="tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
