"use client";

import React, { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const animateFollower = useCallback(() => {
    const follower = followerRef.current;
    if (!follower) return;

    followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12;
    followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12;
    follower.style.left = followerPos.current.x + "px";
    follower.style.top = followerPos.current.y + "px";
    rafId.current = requestAnimationFrame(animateFollower);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, input, textarea, select, .project-card, .tool-card, .testimonial-card, [role='button']"
      );

      if (isInteractive) {
        cursor.classList.add("hovered");
        follower.classList.add("hovered");
      } else {
        cursor.classList.remove("hovered");
        follower.classList.remove("hovered");
      }
    };

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

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", hideCursors);
    document.addEventListener("mouseenter", showCursors);
    document.body.classList.add("custom-cursor-active");

    rafId.current = requestAnimationFrame(animateFollower);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", hideCursors);
      document.removeEventListener("mouseenter", showCursors);
      document.body.classList.remove("custom-cursor-active");
      cancelAnimationFrame(rafId.current);
    };
  }, [animateFollower]);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  );
};

export default CustomCursor;
