"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Briefcase, PaperPlaneTilt, RocketLaunch } from "@phosphor-icons/react";

const Hero = () => {
  const phrases = [
    "✦ Available for new projects",
    "✦ Open to freelance work",
    "✦ Let's build something great",
  ];

  const [counts, setCounts] = useState({ projects: 0, clients: 0, exp: 0 });
  const [badgeText, setBadgeText] = useState(phrases[0]);

  useEffect(() => {
    // Counter Animation
    const targetCounts = { projects: 50, clients: 30, exp: 5 };
    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.round(targetCounts.projects * eased),
        clients: Math.round(targetCounts.clients * eased),
        exp: Math.round(targetCounts.exp * eased),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();

    // Typewriter effect
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let typingTimeout: NodeJS.Timeout;

    const type = () => {
      const current = phrases[phraseIndex];
      if (!isDeleting) {
        setBadgeText(current.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          typingTimeout = setTimeout(type, 2200);
          return;
        }
      } else {
        setBadgeText(current.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingTimeout = setTimeout(type, 400);
          return;
        }
      }
      typingTimeout = setTimeout(type, isDeleting ? 40 : 70);
    };

    const initialTypeTimeout = setTimeout(type, 2000);

    // Parallax logic for hero image shift
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 8;
      const y = (e.clientY / h - 0.5) * 8;
      const heroImg = document.querySelector(".hero-image-wrap") as HTMLElement;
      if (heroImg) {
        heroImg.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(initialTypeTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span>{badgeText}</span>
            </div>

            <h1 className="hero-title">
              Designing Digital<br />
              <span>Experiences That</span>
              Matter.
            </h1>

            <p className="hero-desc">
              I'm <strong>Fuad Baharudin</strong>, a Senior UI/UX Designer with 5+ years of experience
              creating intuitive, beautiful, and conversion-driven digital products for startups
              and enterprise brands.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <Briefcase size={20} weight="bold" /> View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                <PaperPlaneTilt size={20} weight="bold" /> Let's Talk
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{counts.projects}+</span>
                <span className="stat-label">Projects Done</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{counts.clients}+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{counts.exp}+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <div className="hero-image-ring"></div>
              <Image
                src="/images/hero_profile.png"
                alt="Fuad Baharudin - UI/UX Designer"
                width={420}
                height={420}
                className="hero-img"
                priority
              />

              <div className="hero-floating-card card-2">
                <div className="card-icon cyan"><RocketLaunch size={20} weight="fill" /></div>
                <div className="card-text">
                  <strong>50+ Projects</strong>
                  <span>Successfully Shipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
