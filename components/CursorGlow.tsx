"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let x = mouseX;
    let y = mouseY;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", move);

    function animate() {
      // Increase this value for less lag
      x += (mouseX - x) * 0.85;
y += (mouseY - y) * 0.85;

      if (ringRef.current)
        ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;

      if (glowRef.current)
        glowRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;

      // Dot follows perfectly
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9998] h-44 w-44 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,.18), transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9999] h-14 w-14 rounded-full border-2 border-blue-400/60"
      />

      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[10000] h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,.9)]"
      />
    </>
  );
}