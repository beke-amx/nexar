"use client";

import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/use-media-query";

export default function SmoothFollower() {
  // 1️⃣ All hooks at the top
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });

  const [renderPos, setRenderPos] = useState({
    dot: { x: 0, y: 0 },
    border: { x: 0, y: 0 },
  });
  const [isHovering, setIsHovering] = useState(false);

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  // 2️⃣ Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3️⃣ Animation & event listeners
  useEffect(() => {
    if (!mounted || !isDesktop) return; // ✅ use the mounted flag inside effect, don't conditionally call hooks

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll(
      "a, button, img, input, textarea, select"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS
      );

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y,
        },
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      cancelAnimationFrame(animationId);
    };
  }, [mounted]); // dependency ensures effect runs after mounted

  if (!mounted || !isDesktop) return null; // ✅ render nothing until mounted or on mobile

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        className="absolute rounded-full dark:bg-gray-500 bg-black"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
        }}
      />

      <div
        className="absolute rounded-full border dark:border-gray-400 border-black"
        style={{
          width: isHovering ? "44px" : "28px",
          height: isHovering ? "44px" : "28px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </div>
  );
}
