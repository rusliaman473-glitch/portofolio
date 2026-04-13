"use client";

import React, { useEffect, useRef, useState } from "react";
import { Envelope, PaperPlaneTilt } from "@phosphor-icons/react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag"><Envelope size={16} /> Get In Touch</div>
          <h2 className="section-title">Let's <span className="gradient-text">Work Together</span></h2>
          <p className="section-desc">Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.</p>
        </div>

        <div className="contact-inner">
          <div className="contact-info fade-in-up">
            <h3 className="contact-title">Ready to<br /><span className="gradient-text">start a project?</span></h3>
            <p className="contact-desc">Whether it's a startup MVP or enterprise redesign, I bring the same energy and dedication to every project. Let's turn your vision into reality.</p>

            <div className="contact-details">
              {[
                { label: "Email", value: "fuadbaharudin14@gmail.com", icon: "📧", href: "mailto:fuadbaharudin14@gmail.com" },
                { label: "WhatsApp", value: "0888-0305-9891", icon: "📱", href: "https://wa.me/6288803059891" },
                { label: "Location", value: "sidoarjo, jawa timur-indonesia", icon: "📍", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="contact-detail-item">
                  <div className="detail-icon">{item.icon}</div>
                  <div className="detail-text">
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="social-links">
              {["🏀", "🅱️", "💼", "🐦", "🐙"].map((s, i) => (
                <a key={i} href="#" className="social-link">{s}</a>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap fade-in-up fade-delay-2">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} id="contactForm">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="form-control" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" className="form-control" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Project Type</label>
                  <select id="subject" name="subject" className="form-control" required style={{ appearance: "none", cursor: "pointer" }} defaultValue="">
                    <option value="" disabled>Select project type...</option>
                    <option value="mobile-app">Mobile App Design</option>
                    <option value="web-design">Web Design</option>
                    <option value="design-system">Design System</option>
                    <option value="ux-audit">UX Audit</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" className="form-control" placeholder="Tell me about your project, timeline and budget..." required></textarea>
                </div>
                <button type="submit" className="form-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : <><PaperPlaneTilt size={20} /> Send Message</>}
                </button>
              </form>
            ) : (
              <div className="form-success show">
                <span className="success-icon">🎉</span>
                <div className="success-title">Message Sent!</div>
                <p className="success-msg">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
