"use client";

export default function AnimatedGrid() {
  return (
    <div
      className="
      pointer-events-none
      fixed
      inset-0
      -z-20
      overflow-hidden
    "
    >
      {/* Grid */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.06]
      "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large radial glow */}

      <div
        className="
        absolute
        left-1/2
        top-0
        h-[900px]
        w-[900px]
        -translate-x-1/2
        rounded-full
        bg-blue-500/10
        blur-[180px]
      "
      />

      {/* Secondary glow */}

      <div
        className="
        absolute
        right-0
        top-1/3
        h-[500px]
        w-[500px]
        rounded-full
        bg-violet-500/10
        blur-[160px]
      "
      />
    </div>
  );
}