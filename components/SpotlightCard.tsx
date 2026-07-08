"use client";

import { useRef } from "react";

export default function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-neutral-800
        bg-neutral-900/60
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-blue-500/70
        hover:-translate-y-2
        hover:shadow-[0_0_60px_rgba(59,130,246,.15)]
        ${className}
      `}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(500px circle at var(--x) var(--y), rgba(59,130,246,.18), transparent 40%)",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}