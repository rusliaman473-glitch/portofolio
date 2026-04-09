"use client";

import React, { useEffect, useRef } from "react";
import { ChatDots } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Hendro Rachmad",
    role: "CEO, Simvent",
    avatar: "RH",
    text: "Fuad completely transformed our app's user experience. The redesign led to a 40% increase in retention and our users absolutely love the new interface. His attention to detail is unmatched.",
  },
  {
    name: "Prasetya Adi",
    role: "Product Lead, Kawakibi",
    avatar: "PA",
    text: "Working with Fuad was a game-changer. He doesn't just design screens — he thinks holistically about the entire user journey. Our e-commerce conversion increased by 40% after launch.",
    gradient: "linear-gradient(135deg, #06b6d4, #8b5cf6)"
  },
  {
    name: "Bryan Arvi",
    role: "Founder, Firzil Tech",
    avatar: "BA",
    text: "Exceptional communication and incredibly fast delivery without compromising on quality. Fuad delivered a design system that scaled perfectly as our product grew. Highly recommended!",
    gradient: "linear-gradient(135deg, #ec4899, #f59e0b)"
  },
];

const Testimonials = () => {
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
    <section id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag"><ChatDots size={16} /> Testimonials</div>
          <h2 className="section-title">What Clients <span className="gradient-text">Say</span></h2>
          <p className="section-desc">Feedback from people I've had the pleasure of working with on meaningful projects.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testimonial-card fade-in-up fade-delay-${i}`}>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, j) => <span key={j} className="star">★</span>)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={t.gradient ? { background: t.gradient } : {}}>
                  {t.avatar}
                </div>
                <div className="author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
