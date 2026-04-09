"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Reviews", href: "#testimonials" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="nav-inner">
          <Link href="#hero" className="nav-logo">
            FB.
          </Link>

          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} color="white" /> : <List size={22} color="white" />}
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={activeSection === link.href.substring(1) ? "active" : ""}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                className="nav-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
