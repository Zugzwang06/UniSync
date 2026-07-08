import {
  FileText,
  Calendar,
  Apple,
  Building2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Banner PDF",
    description: "Parse university schedules instantly.",
  },
  {
    icon: Apple,
    title: "Apple Calendar",
    description: "Export recurring .ics calendars.",
  },
  {
    icon: Calendar,
    title: "Google Calendar",
    description: "Direct sync coming soon.",
  },
  {
    icon: Building2,
    title: "Outlook",
    description: "Microsoft integration coming soon.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-4">

      {features.map((feature) => {

        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
          >
            <Icon size={28} />

            <h3 className="mt-5 text-lg font-semibold">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm text-neutral-400">
              {feature.description}
            </p>

          </div>
        );

      })}

    </section>
  );
}