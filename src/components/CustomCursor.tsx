"use client";

import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursorFollower");
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
      requestAnimationFrame(animateFollower);
    };

    document.addEventListener("mousemove", onMouseMove);
    const frameId = requestAnimationFrame(animateFollower);

    const onMouseEnter = () => {
      cursor.classList.add("hovered");
      follower.classList.add("hovered");
    };
    const onMouseLeave = () => {
      cursor.classList.remove("hovered");
      follower.classList.remove("hovered");
    };

    const targets = document.querySelectorAll(
      "a, button, .project-card, .tool-card, .testimonial-card, input, textarea, select"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    // Handle visibility when leaving window
    const hideCursors = () => {
      cursor.style.opacity = "0";
      follower.style.opacity = "0";
      document.body.classList.remove("custom-cursor-active");
    };
    const showCursors = () => {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
      document.body.classList.add("custom-cursor-active");
    };

    document.addEventListener("mouseleave", hideCursors);
    document.addEventListener("mouseenter", showCursors);
    document.body.classList.add("custom-cursor-active");

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
      document.removeEventListener("mouseleave", hideCursors);
      document.removeEventListener("mouseenter", showCursors);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-follower" id="cursorFollower"></div>
    </>
  );
};

export default CustomCursor;
