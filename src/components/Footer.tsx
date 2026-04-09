import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <Link href="#hero" className="footer-logo">FB.</Link>
          <p className="footer-copy">© 2024 Fuad Baharudin. Crafted with ❤️ and lots of ☕</p>
          <ul className="footer-links">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#projects">Work</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
