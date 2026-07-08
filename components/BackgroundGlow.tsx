"use client";

import { useEffect, useState } from "react";

export default function BackgroundGlow() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (mouse.x - prev.x) * 0.08,
        y: prev.y + (mouse.y - prev.y) * 0.08,
      }));

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [mouse]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[140px] transition-transform"
        style={{
          transform: `translate(${position.x - 350}px, ${
            position.y - 350
          }px)`,
        }}
      />

      <div
        className="absolute h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[130px]"
        style={{
          transform: `translate(${position.x - 250}px, ${
            position.y - 250
          }px)`,
        }}
      />
    </div>
  );
}