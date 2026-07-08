"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { UploadCloud } from "lucide-react";

interface Event {
  course: string;
  meeting_type: string;
  days: string[];
  start_time: string;
  end_time: string;
  building: string;
  room: string | null;
}

interface FileDropZoneProps {
  onParsed: (events: Event[]) => void;
  getToken: () => Promise<string | null | undefined>;
}

export default function FileDropZone({
  onParsed,
  getToken,
}: FileDropZoneProps) {
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,

    async onDrop(files) {
      const file = files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        setStatus("Uploading PDF...");
        setProgress(20);

        await new Promise((r) => setTimeout(r, 500));

        setStatus("Parsing Banner Schedule...");
        setProgress(55);

        await new Promise((r) => setTimeout(r, 600));

        setStatus("Generating Calendar...");
        setProgress(85);

        await new Promise((r) => setTimeout(r, 500));

        const token = await getToken();
        console.log("Token:", token);
        if (!token) {
          alert("No Clerk token returned");
          return;
        }
        const res = await axios.post(
          "http://127.0.0.1:8000/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const events = res.data.events ?? [];

        setProgress(100);
        setStatus("✓ Schedule Ready!");

        onParsed(events);
      } catch (err) {
        console.error(err);
        setStatus("❌ Upload failed");
        setProgress(0);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        group
        relative
        mt-10
        w-full
        max-w-3xl
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-neutral-800
        bg-neutral-900/60
        backdrop-blur-xl
        p-20
        transition-all
        duration-300

        ${
          isDragActive
            ? "scale-[1.02] border-blue-500 shadow-[0_0_80px_rgba(59,130,246,0.25)]"
            : "hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]"
        }
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

      <input {...getInputProps()} />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <UploadCloud
          size={72}
          className="text-neutral-300 transition duration-300 group-hover:scale-110 group-hover:text-blue-400"
        />

        <h2 className="text-3xl font-bold tracking-tight">
          Drop your schedule here
        </h2>

        <p className="max-w-xl leading-7 text-neutral-400">
          Upload a Banner PDF to automatically parse your courses,
          visualize your weekly schedule, and export directly to
          Apple Calendar. Google Calendar and Outlook sync are coming soon.
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-neutral-700 px-4 py-2 text-sm">
            📄 Banner PDF
          </span>

          <span className="rounded-full border border-neutral-700 px-4 py-2 text-sm">
            🍎 Apple Calendar
          </span>

          <span className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-500">
            📅 Google (Soon)
          </span>

          <span className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-500">
            💼 Outlook (Soon)
          </span>
        </div>

        {status && (
          <div className="mt-8 w-full max-w-xl">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium text-blue-400">
                {status}
              </span>

              <span className="text-neutral-400">
                {progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}