"use client";

import { useEffect, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";

type Event = {
  course: string;
  days: string[];
  start_time: string;
  end_time: string;
};

function convert(time: string) {
  const suffix = time.slice(-1);

  let [h, m] = time.slice(0, -1).split(":").map(Number);

  if (suffix === "P" && h !== 12) h += 12;
  if (suffix === "A" && h === 12) h = 0;

  return h * 60 + m;
}

function Counter({
  target,
  duration = 900,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const step = Math.max(1, Math.ceil(target / (duration / 16)));

    const interval = setInterval(() => {
      start += step;

      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration]);

  return <>{count}</>;
}

export default function DashboardStats({
  events,
}: {
  events: Event[];
}) {
  if (!events.length) return null;

  const courses = new Set(events.map((e) => e.course));

  let earliest = events[0];
  let latest = events[0];

  for (const e of events) {
    if (convert(e.start_time) < convert(earliest.start_time))
      earliest = e;

    if (convert(e.end_time) > convert(latest.end_time))
      latest = e;
  }

  const dayCounts: Record<string, number> = {};

  events.forEach((e) => {
    e.days.forEach((d) => {
      dayCounts[d] = (dayCounts[d] ?? 0) + 1;
    });
  });

  const longestDay = Object.entries(dayCounts).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  const dayNames: Record<string, string> = {
    M: "Monday",
    T: "Tuesday",
    W: "Wednesday",
    R: "Thursday",
    F: "Friday",
  };

  const stats = [
    {
      title: "Meetings",
      icon: "📅",
      value: events.length,
      numeric: true,
    },
    {
      title: "Courses",
      icon: "🎓",
      value: courses.size,
      numeric: true,
    },
    {
      title: "Earliest",
      icon: "🌅",
      value: earliest.start_time,
      numeric: false,
    },
    {
      title: "Latest",
      icon: "🌙",
      value: latest.end_time,
      numeric: false,
    },
    {
      title: "Busiest Day",
      icon: "⚡",
      value: dayNames[longestDay],
      numeric: false,
    },
  ];

  return (
    <section className="mt-16">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">
          Schedule Overview
        </h2>

        <p className="mt-2 text-neutral-400">
          Your semester summarized at a glance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        {stats.map((s) => (
          <SpotlightCard key={s.title}>
            <div className="p-7">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-wider text-neutral-500">
                  {s.title}
                </p>

                <div className="text-2xl">
                  {s.icon}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-4xl font-black">
                  {s.numeric ? (
                    <Counter target={Number(s.value)} />
                  ) : (
                    s.value
                  )}
                </h3>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}