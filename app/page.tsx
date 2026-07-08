"use client";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CursorGlow from "@/components/CursorGlow";
import { useAuth } from "@clerk/nextjs";



import AuroraBackground from "@/components/AuroraBackground";
import BackgroundGlow from "@/components/BackgroundGlow";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import FileDropZone from "@/components/FileDropZone";

import DashboardStats from "@/components/DashboardStats";
import WeeklyCalendar from "@/components/WeeklyCalendar";

import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);
const { isSignedIn } = useUser();
const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length > 0) {
      const timer = setTimeout(() => {
        setShowDashboard(true);
        setTimeout(() => {
  dashboardRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 250);
      }, 500);

      return () => clearTimeout(timer);
    }

    setShowDashboard(false);
  }, [events]);
  const { getToken } = useAuth();

  async function exportICS() {
    try {
      const semesterStart =
        prompt("Enter first day of classes (YYYY-MM-DD)") ??
        "2026-08-24";

      const res = await axios.post(
        "http://127.0.0.1:8000/export/ics",
        {
          semester_start: semesterStart,
          events,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(res.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = "schedule.ics";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">

      <AuroraBackground />
<BackgroundGlow />
<CursorGlow />

      <Navbar />

      <Hero />

      <Reveal>
  <section
    id="upload"
    className="relative z-10 mx-auto mt-12 flex max-w-7xl flex-col items-center px-8"
  >
    {isSignedIn ? (
      <FileDropZone onParsed={setEvents} getToken={getToken} />
    ) : (
      <div className="w-full max-w-3xl rounded-3xl border border-neutral-800 bg-neutral-900/70 p-12 text-center backdrop-blur-xl">
        <h2 className="mb-4 text-3xl font-bold">
          Sign in to upload your schedule
        </h2>

        <p className="mb-8 text-neutral-400">
          Your schedules are securely saved to your account and can be synced
          across devices.
        </p>

        <SignInButton mode="modal">
          <button
            className="
              rounded-xl
              bg-blue-600
              px-8
              py-4
              font-semibold
              transition
              hover:bg-blue-500
              hover:scale-105
            "
          >
            Continue with Google
          </button>
        </SignInButton>
      </div>
    )}
  </section>
</Reveal>
            <Reveal>
  <section
    id="features"
    className="relative z-10 mx-auto mt-24 grid max-w-6xl grid-cols-1 gap-6 px-8 md:grid-cols-4"
  >
    <SpotlightCard>
      <FeatureCard
        icon="📄"
        title="Banner PDFs"
        description="Automatically parse Banner schedules into structured recurring events."
      />
    </SpotlightCard>

    <SpotlightCard>
      <FeatureCard
        icon="🍎"
        title="Apple Calendar"
        description="Generate beautiful recurring .ics files in one click."
      />
    </SpotlightCard>

    <SpotlightCard>
      <FeatureCard
        icon="📅"
        title="Google Calendar"
        description="Direct synchronization arriving soon."
      />
    </SpotlightCard>

    <SpotlightCard>
      <FeatureCard
        icon="💼"
        title="Outlook"
        description="Microsoft Outlook integration coming soon."
      />
    </SpotlightCard>
  </section>
</Reveal>



      <Reveal>
        <section
          id="how"
          className="relative z-10 mx-auto mt-28 max-w-5xl px-8"
        >
          <h2 className="mb-12 text-center text-4xl font-bold">
            How It Works
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="1"
              title="Upload PDF"
            />

            <StepCard
              number="2"
              title="Review Schedule"
            />

            <StepCard
              number="3"
              title="Export Anywhere"
            />
          </div>
        </section>
      </Reveal>

      {showDashboard && (
        <Reveal>
          <section
          ref={dashboardRef}
            className="
              relative
              z-10
              mx-auto
              mt-24
              max-w-7xl
              px-8
              pb-24

              animate-in
              fade-in
              slide-in-from-bottom-10
              duration-700
            "
          >
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-5xl font-bold">
                  Dashboard
                </h2>

                <p className="mt-2 text-neutral-400">
                  Everything about your semester at a glance.
                </p>
              </div>

              <button
                onClick={exportICS}
                className="
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-medium
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-blue-500
                  hover:shadow-[0_0_35px_rgba(59,130,246,.45)]
                "
              >
                Export ICS
              </button>
            </div>

            <DashboardStats events={events} />

            <div className="mt-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <WeeklyCalendar events={events} />
            </div>
          </section>
        </Reveal>
      )}
    </main>
  );
}
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8">
      <div
        className="
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-blue-500/20
          to-violet-500/20
          text-3xl
          transition
          group-hover:scale-110
        "
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-neutral-400">
        {description}
      </p>

      <div className="mt-6 space-y-2 text-sm text-neutral-500">
        <p>✓ Fast</p>
        <p>✓ Accurate</p>
        <p>✓ Automatic</p>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-neutral-800
        bg-neutral-900/60
        p-10
        text-center
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500
        hover:shadow-[0_0_50px_rgba(59,130,246,.15)]
      "
    >
      <div className="mb-5 text-5xl font-black text-blue-500">
        {number}
      </div>

      <h3 className="text-2xl font-semibold">
        {title}
      </h3>
    </div>
  );
}