"use client";

import React, { useEffect } from "react";

const BackgroundOrbs = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const orbs = document.querySelectorAll(".orb");
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.04;
        (orb as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-orbs">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
    </div>
  );
};

export default BackgroundOrbs;
