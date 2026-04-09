"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { UserCircle, DownloadSimple } from "@phosphor-icons/react";

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const fadeEls = aboutRef.current?.querySelectorAll(".fade-in-up");
    fadeEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={aboutRef}>
      <div className="container">
        <div className="about-inner">
          <div className="about-image-wrap fade-in-up">
            <div className="about-img-container">
              <Image
                src="/images/hero_profile.png"
                alt="About Fuad Baharudin"
                width={500}
                height={625}
                className="about-img"
              />
              <div className="about-img-overlay"></div>
            </div>
            <div className="about-img-card">
              <div className="exp-number">5+</div>
              <div className="exp-label">Years of Experience</div>
            </div>
          </div>

          <div className="about-content">
            <div className="about-tag fade-in-up">
              <UserCircle size={20} /> About Me
            </div>
            <h2 className="about-title fade-in-up fade-delay-1">
              Crafting <span className="gradient-text">pixel-perfect</span><br />user experiences
            </h2>
            <p className="about-desc fade-in-up fade-delay-2">
              I'm a UI/UX designer passionate about bridging the gap between beautiful
              design and functional usability. My design process is rooted in deep user
              research, iterative prototyping, and data-driven decisions.
            </p>
            <p className="about-desc fade-in-up fade-delay-2">
              From early-stage startups to Fortune 500 companies, I've helped shape
              products that are used by millions of people worldwide. I believe great 
              design is invisible — it just works.
            </p>

            <div className="about-pillars fade-in-up fade-delay-3">
              {[
                { icon: "🎯", title: "User-First Approach", desc: "Every decision is driven by user behavior and needs" },
                { icon: "⚡", title: "Rapid Prototyping", desc: "From wireframe to hi-fi prototype in record time" },
                { icon: "📊", title: "Data-Driven Design", desc: "Continuous iteration based on analytics & testing" },
                { icon: "🤝", title: "Dev Collaboration", desc: "Bridging design and engineering seamlessly" },
              ].map((pillar, i) => (
                <div key={i} className="pillar-item">
                  <span className="pillar-icon">{pillar.icon}</span>
                  <div className="pillar-text">
                    <strong>{pillar.title}</strong>
                    <span>{pillar.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade-in-up fade-delay-4">
              <a href="https://drive.google.com/file/d/1i-q4yfdmx4UnVNpu67NAN9AfNqVdb2kT/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <DownloadSimple size={20} weight="bold" /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
