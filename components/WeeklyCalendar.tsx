type Event = {
  course: string;
  days: string[];
  start_time: string;
  end_time: string;
  building: string;
  room?: string;
};

const days = ["M", "T", "W", "R", "F"];

const dayNames: Record<string, string> = {
  M: "Mon",
  T: "Tue",
  W: "Wed",
  R: "Thu",
  F: "Fri",
};

const colors = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-cyan-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-red-500",
];

function toMinutes(time: string) {
  const suffix = time.slice(-1);

  let [h, m] = time
    .slice(0, -1)
    .split(":")
    .map(Number);

  if (suffix === "P" && h !== 12) h += 12;
  if (suffix === "A" && h === 12) h = 0;

  return h * 60 + m;
}

export default function WeeklyCalendar({
  events,
}: {
  events: Event[];
}) {
  const courses = Array.from(new Set(events.map((e) => e.course)));

  const colorMap = new Map<string, string>();

  courses.forEach((course, i) => {
    colorMap.set(course, colors[i % colors.length]);
  });

  return (
    <section className="mt-16">

      <h2 className="mb-8 text-3xl font-bold">
        Weekly Schedule
      </h2>

      <div className="overflow-x-auto rounded-3xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl">

        <div className="grid grid-cols-5">

          {days.map((day) => (
            <div
              key={day}
              className="border-r border-neutral-800 last:border-r-0"
            >

              <div className="sticky top-0 border-b border-neutral-800 bg-neutral-900/80 p-4 text-center text-xl font-semibold backdrop-blur-xl">
                {dayNames[day]}
              </div>

              <div className="space-y-4 p-4">

                {events
                  .filter((e) => e.days.includes(day))
                  .sort(
                    (a, b) =>
                      toMinutes(a.start_time) -
                      toMinutes(b.start_time)
                  )
                  .map((event, index) => (
                    <div
                      key={index}
                      className={`
                        rounded-2xl
                        p-4
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-[1.03]
                        hover:shadow-2xl
                        ${colorMap.get(event.course)}
                      `}
                    >
                      <div className="font-semibold text-sm">
                        {event.course}
                      </div>

                      <div className="mt-2 text-xs opacity-90">
                        {event.start_time} – {event.end_time}
                      </div>

                      <div className="mt-2 text-xs opacity-80">
                        {event.building}
                        {event.room ? ` ${event.room}` : ""}
                      </div>

                    </div>
                  ))}

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}