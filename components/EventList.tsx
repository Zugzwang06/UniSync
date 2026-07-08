"use client";

interface Event {
  course: string;
  meeting_type: string;
  days: string[];
  start_time: string;
  end_time: string;
  building: string;
  room: string | null;
}

interface Props {
  events: Event[];
}

export default function EventList({ events }: Props) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 w-full max-w-4xl rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-2xl font-semibold">
        Parsed Schedule ({events.length} events)
      </h2>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="rounded-lg border border-neutral-700 bg-neutral-800 p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  {event.course}
                </h3>

                <p className="text-neutral-300">
                  {event.meeting_type}
                </p>
              </div>

              <div className="text-right">
                <p>
                  {event.days.join(", ")}
                </p>

                <p>
                  {event.start_time} – {event.end_time}
                </p>

                <p className="text-neutral-400">
                  {event.building}
                  {event.room ? ` ${event.room}` : ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}