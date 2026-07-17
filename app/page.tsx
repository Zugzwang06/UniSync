"use client";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CursorGlow from "@/components/CursorGlow";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

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
  const [semesterId, setSemesterId] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const { getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  const dashboardRef = useRef<HTMLDivElement>(null);

  const [comparison, setComparison] = useState<any | null>(null);

  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    created: number;
    updated: number;
  }>({
    created: 0,
    updated: 0,
  });

  useEffect(() => {
    async function loadSchedule() {
      if (!isSignedIn) return;

      const token = await getToken();
      if (!token) return;

      try {
        const res = await axios.get("http://127.0.0.1:8000/me/schedule", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.has_schedule) {
          setEvents(res.data.events);
          setSemesterId(res.data.semester?.id ?? null);
        }

        console.log("Loading history...");

        const historyRes = await axios.get(
          "http://127.0.0.1:8000/semester/history",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("History response:", historyRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        console.error("History request failed:", err);
      }
    }

    loadSchedule();
  }, [isSignedIn, getToken]);

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

  async function exportICS() {
    try {
      const semesterStart =
        prompt("Enter first day of classes (YYYY-MM-DD)") ?? "2026-08-24";

      const res = await axios.post(
        "http://127.0.0.1:8000/export/ics",
        { semester_start: semesterStart, events },
        { responseType: "blob" }
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

  async function compareVersions(oldSemesterId: number) {
    if (!semesterId || oldSemesterId === semesterId) return;

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/semester/${oldSemesterId}/compare/${semesterId}`
      );
      setComparison(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function testGoogleEvents() {
    const token = await getToken();
    if (!token) return;

    setSyncing(true);

    const toastId = toast.loading("Synchronizing Google Calendar...");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/export/google",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSyncResult({
        created: res.data.events_created,
        updated: res.data.events_updated,
      });

      toast.dismiss(toastId);

      toast.success(
        `Google Calendar synchronized!\nCreated ${res.data.events_created}, Updated ${res.data.events_updated}`
      );
    } catch (err: any) {
      console.error(err);

      toast.dismiss(toastId);

      toast.error(err.response?.data?.detail ?? "Synchronization failed.");
    } finally {
      setSyncing(false);
    }
  }

  async function removeGoogleEvents() {
    const token = await getToken();
    if (!token) return;

    if (!confirm("Remove all UniSync events from your Google Calendar?")) {
      return;
    }

    const toastId = toast.loading("Removing UniSync events...");

    try {
      const res = await axios.delete("http://127.0.0.1:8000/export/google", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.dismiss(toastId);

      toast.success(
        `Removed ${res.data.events_removed} event${
          res.data.events_removed === 1 ? "" : "s"
        } from Google Calendar.`
      );
    } catch (err: any) {
      console.error(err);

      toast.dismiss(toastId);

      toast.error(err.response?.data?.detail ?? "Couldn't remove events.");
    }
  }

  const handleGoogleConnect = async () => {
    const token = await getToken();

    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const clerkId = payload.sub;

    window.location.href = `http://127.0.0.1:8000/auth/google?state=${clerkId}`;
  };

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
                Your schedules are securely saved to your account and can be
                synced across devices.
              </p>
              <SignInButton mode="modal">
                <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500 hover:scale-105">
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
          className="relative z-10 mx-auto mt-24 grid max-w-6xl grid-cols-1 gap-6 px-8 md:grid-cols-3"
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
            <StepCard number="1" title="Upload PDF" />
            <StepCard number="2" title="Review Schedule" />
            <StepCard number="3" title="Export Anywhere" />
          </div>
        </section>
      </Reveal>

      {showDashboard && (
        <Reveal>
          <section
            ref={dashboardRef}
            className="relative z-10 mx-auto mt-24 max-w-7xl px-8 pb-24 animate-in fade-in slide-in-from-bottom-10 duration-700"
          >
            <div className="mb-10 flex flex-col gap-8">
              {/* Dashboard Header */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
                    UniSync
                  </p>

                  <h2 className="mt-2 text-5xl font-bold">Dashboard</h2>

                  <p className="mt-3 max-w-xl text-neutral-400">
                    Manage your schedule, compare uploads, and synchronize
                    your calendars.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-6 py-4">
                    <p className="text-xs uppercase tracking-widest text-neutral-500">
                      Status
                    </p>

                    <p className="mt-2 text-lg font-semibold text-green-400">
                      Schedule Ready
                    </p>
                  </div>

                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-6 py-4">
                    <p className="text-xs uppercase tracking-widest text-neutral-500">
                      Calendar
                    </p>

                    <p className="mt-2 text-lg font-semibold">Google</p>
                  </div>
                </div>
              </div>

              {/* Calendar Integrations */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Google Card */}
                <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Google Calendar
                      </h3>
                      <p className="mt-1 text-sm text-neutral-400">
                        Connect, sync, or clear your UniSync events.
                      </p>
                    </div>
                    <span className="text-2xl">📅</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleGoogleConnect}
                      className="rounded-xl bg-red-600 px-5 py-2.5 font-medium transition-all duration-300 hover:scale-105 hover:bg-red-500"
                    >
                      Connect Google
                    </button>

                    <button
                      onClick={testGoogleEvents}
                      disabled={syncing}
                      className="rounded-xl bg-green-600 px-5 py-2.5 font-medium transition-all duration-300 hover:scale-105 hover:bg-green-500 disabled:opacity-50"
                    >
                      {syncing ? "Syncing..." : "Sync to Google"}
                    </button>

                    <button
                      onClick={removeGoogleEvents}
                      className="rounded-xl bg-neutral-800 px-5 py-2.5 font-medium transition-all duration-300 hover:scale-105 hover:bg-neutral-700"
                    >
                      Remove from Google
                    </button>
                  </div>

                  {(syncResult.created > 0 || syncResult.updated > 0) && (
                    <div className="rounded-lg border border-green-600/30 bg-green-500/10 p-4">
                      <p className="font-semibold text-green-400">
                        Google Calendar synchronized successfully
                      </p>

                      <div className="mt-2 text-sm text-neutral-300">
                        <p>Created: {syncResult.created}</p>
                        <p>Updated: {syncResult.updated}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apple Card */}
                <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Apple Calendar
                      </h3>
                      <p className="mt-1 text-sm text-neutral-400">
                        Export a .ics file to import into Apple Calendar.
                      </p>
                    </div>
                    <span className="text-2xl">🍎</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={exportICS}
                      className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,.45)]"
                    >
                      Export ICS
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <DashboardStats events={events} />

            <div className="mt-12 rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8 backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold">Schedule History</h3>

                  <p className="mt-2 text-neutral-400">
                    Compare previous uploads and review changes.
                  </p>
                </div>
              </div>

              {history.map((semester) => (
                <div
                  key={semester.id}
                  className="mb-4 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-neutral-900"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-semibold">
                          {semester.name}
                        </h4>

                        {semester.is_current && (
                          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                            CURRENT
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-neutral-400">
                        Version {semester.version}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        Uploaded{" "}
                        {new Date(semester.uploaded_at).toLocaleString()}
                      </p>
                    </div>

                    {!semester.is_current && (
                      <button
                        onClick={() => compareVersions(semester.id)}
                        className="rounded-xl bg-blue-600 px-6 py-3 transition hover:scale-105 hover:bg-blue-500"
                      >
                        Compare Version
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {comparison && (
                <div className="mt-12 rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8 backdrop-blur-xl">
                  <h3 className="mb-6 text-2xl font-semibold">
                    Schedule Changes
                  </h3>

                  {comparison.added.length > 0 && (
                    <div className="mb-6">
                      <h4 className="mb-3 font-semibold text-green-400">
                        Added Classes
                      </h4>
                      {comparison.added.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="mb-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3"
                        >
                          <strong>{item.course}</strong>
                          <div className="text-sm text-neutral-300">
                            {item.meeting_type}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {comparison.removed.length > 0 && (
                    <div className="mb-6">
                      <h4 className="mb-3 font-semibold text-red-400">
                        Removed Classes
                      </h4>
                      {comparison.removed.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="mb-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3"
                        >
                          <strong>{item.course}</strong>
                          <div className="text-sm text-neutral-300">
                            {item.meeting_type}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {comparison.changed.length > 0 && (
                    <div>
                      <h4 className="mb-3 font-semibold text-yellow-400">
                        Modified Classes
                      </h4>
                      {comparison.changed.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="mb-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3"
                        >
                          <strong>{item.course}</strong>
                          <div className="mt-2 space-y-1 text-sm">
                            {Object.entries(item.changes).map(
                              ([field, values]: any) => (
                                <div key={field}>
                                  <span className="font-semibold capitalize">
                                    {field}
                                  </span>
                                  {" : "}
                                  <span className="text-red-300">
                                    {values[0]}
                                  </span>
                                  {" → "}
                                  <span className="text-green-300">
                                    {values[1]}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {comparison.added.length === 0 &&
                    comparison.removed.length === 0 &&
                    comparison.changed.length === 0 && (
                      <p className="text-neutral-400">
                        No differences found between these versions.
                      </p>
                    )}
                </div>
              )}
            </div>

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
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-3xl transition group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-4 leading-7 text-neutral-400">{description}</p>
      <div className="mt-6 space-y-2 text-sm text-neutral-500">
        <p>✓ Fast</p>
        <p>✓ Accurate</p>
        <p>✓ Automatic</p>
      </div>
    </div>
  );
}

function StepCard({ number, title }: { number: string; title: string }) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_50px_rgba(59,130,246,.15)]">
      <div className="mb-5 text-5xl font-black text-blue-500">{number}</div>
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
  );
}