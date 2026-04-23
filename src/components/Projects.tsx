"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { SquaresFour, Clock, Users, FigmaLogo, Globe } from "@phosphor-icons/react";

const projects = [
  {
    id: "fintech",
    title: "Simvent — Platform Tiketing",
    desc: "A comprehensive SaaS platform for event organizers to manage ticket sales and attendees efficiently. Features real-time dashboard and seamless booking flow.",
    image: "/images/simvent.jpg",
    tags: ["SaaS", "Ticketing System", "Web Platform"],
    stats: [
      { icon: <Clock size={16} />, text: "12 weeks" },
      { icon: <Users size={16} />, text: "2M+ users impacted" },
    ],
    featured: true,
  },
  {
    id: "ecommerce",
    title: "Lumière — Luxury Fashion Store",
    desc: "Crafted a premium shopping experience that increased conversion rate by 40% and reduced cart abandonment significantly.",
    image: "/images/project_ecommerce.png",
    tags: ["E-Commerce", "Web"],
    stats: [{ icon: <Clock size={16} />, text: "8 weeks" }],
    featured: false,
  },
  {
    id: "fintech-khasanah",
    title: "KhasanahPay — Digital Finance Transformation",
    desc: "A modern financial management platform designed for Islamic boarding schools (Pesantren), focusing on transparency, efficiency, and integrated payment systems.",
    image: "/images/khasanahpay.jpg",
    tags: ["Fintech", "Transparency", "Web Platform"],
    stats: [{ icon: <Clock size={16} />, text: "10 weeks" }],
    featured: false,
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateEls = sectionRef.current?.querySelectorAll(".fade-in-up, .section-tag, .section-title, .section-desc");
    animateEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag"><SquaresFour size={16} /> Case Studies</div>
          <h2 className="section-title">Selected <span className="gradient-text">Work</span></h2>
          <p className="section-desc">A curated selection of projects that showcase my design thinking, problem-solving approach, and visual craftsmanship.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`project-card ${project.featured ? "featured" : ""} fade-in-up fade-delay-${idx}`}
            >
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={project.featured ? 800 : 400}
                  height={project.featured ? 400 : 225}
                  className="project-img"
                />

              </div>
              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-meta">
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {project.stats.map((stat, i) => (
                      <div key={i} className="project-stat">
                        {stat.icon} {stat.text}
                      </div>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-link-btn" title="Prototype"><FigmaLogo size={18} /></a>
                    <a href="#" className="project-link-btn" title="Live"><Globe size={18} /></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
