"use client";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">

      <div
        className="
        absolute
        left-1/2
        top-[-20%]
        h-[900px]
        w-[900px]
        -translate-x-1/2
        rounded-full
        bg-blue-500/10
        blur-[140px]
        animate-pulse
      "
      />

      <div
        className="
        absolute
        right-[-10%]
        bottom-[-20%]
        h-[700px]
        w-[700px]
        rounded-full
        bg-violet-500/10
        blur-[140px]
        animate-pulse
      "
        style={{
          animationDuration: "8s",
        }}
      />

      <div
        className="
        absolute
        left-[-10%]
        bottom-[20%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-400/10
        blur-[120px]
        animate-pulse
      "
        style={{
          animationDuration: "10s",
        }}
      />

    </div>
  );
}