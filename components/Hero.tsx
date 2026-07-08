"use client";

export default function Hero() {
  return (
    <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-16 text-center">

      {/* Badge */}

      <div
        className="
        mb-8
        rounded-full
        border
        border-blue-500/20
        bg-blue-500/10
        px-5
        py-2
        text-sm
        text-blue-300
        backdrop-blur-xl
      "
      >
        ✨ Universal Student Scheduling
      </div>

      {/* Heading */}

      <h1
        className="
        max-w-5xl
        text-6xl
        font-black
        leading-tight
        tracking-tight
        md:text-8xl
      "
      >
        Upload once.

        <br />

        <span
          className="
          bg-gradient-to-r
          from-cyan-300
          via-blue-400
          to-violet-400
          bg-clip-text
          text-transparent
        "
        >
          Sync everywhere.
        </span>

      </h1>

      {/* Subtitle */}

      <p
        className="
        mt-10
        max-w-3xl
        text-xl
        leading-8
        text-neutral-400
      "
      >
        UniSync transforms your university schedule into a beautiful,
        organized calendar that works across Apple Calendar,
        Google Calendar, Outlook, and ICS.
      </p>

      {/* Buttons */}

      <div className="mt-14 flex flex-wrap justify-center gap-5">

        <a
          href="#upload"
          className="
          rounded-2xl
          bg-blue-600
          px-8
          py-4
          font-semibold
          transition-all
          duration-300
          hover:scale-105
          hover:bg-blue-500
          hover:shadow-[0_0_40px_rgba(59,130,246,.45)]
        "
        >
          Upload Schedule
        </a>

        <a
          href="#features"
          className="
          rounded-2xl
          border
          border-neutral-700
          bg-neutral-900/60
          px-8
          py-4
          font-semibold
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-blue-500
          hover:bg-neutral-800
        "
        >
          Learn More
        </a>

      </div>

      {/* Stats */}

      <div
        className="
        mt-20
        grid
        w-full
        max-w-4xl
        grid-cols-2
        gap-6
        md:grid-cols-4
      "
      >

        <Stat
          number="1 Click"
          label="Import"
        />

        <Stat
          number="4"
          label="Calendar Platforms"
        />

        <Stat
          number="∞"
          label="Semester Exports"
        />

        <Stat
          number="100%"
          label="Free"
        />

      </div>

    </section>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-neutral-800
      bg-neutral-900/50
      p-6
      backdrop-blur-xl
      transition
      hover:-translate-y-1
      hover:border-blue-500
    "
    >
      <h3 className="text-3xl font-bold">
        {number}
      </h3>

      <p className="mt-2 text-neutral-400">
        {label}
      </p>
    </div>
  );
}