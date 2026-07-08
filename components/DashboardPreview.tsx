"use client";

export default function DashboardPreview() {
  return (
    <section className="relative z-10 mx-auto mt-40 max-w-7xl px-8">

      <div className="text-center">

        <p className="mb-3 text-blue-400 font-semibold tracking-widest uppercase">
          Preview
        </p>

        <h2 className="text-5xl font-black">
          See UniSync
        </h2>

        <p className="mt-4 text-neutral-400 text-xl">
          Before you even upload your schedule.
        </p>

      </div>

      <div
        className="
        mt-20
        rounded-[36px]
        border
        border-neutral-800
        bg-neutral-900/60
        backdrop-blur-3xl
        p-8
        shadow-[0_0_80px_rgba(59,130,246,.08)]
      "
      >

        {/* Top Stats */}

        <div className="grid gap-6 md:grid-cols-4">

          <Stat number="16" label="Events" />
          <Stat number="6" label="Courses" />
          <Stat number="8:10 AM" label="Earliest" />
          <Stat number="Thursday" label="Longest Day" />

        </div>

        {/* Calendar */}

        <div
          className="
          mt-10
          rounded-3xl
          border
          border-neutral-800
          bg-neutral-950
          p-8
        "
        >

          <div className="mb-8 flex justify-between">

            <h3 className="text-2xl font-bold">
              Weekly Calendar
            </h3>

            <div className="rounded-full bg-blue-500/20 px-4 py-1 text-blue-300">
              Fall 2026
            </div>

          </div>

          <div className="grid grid-cols-5 gap-4">

            {["Mon","Tue","Wed","Thu","Fri"].map(day=>(
              <div key={day}>

                <div className="mb-3 text-center font-semibold text-neutral-300">
                  {day}
                </div>

                <div className="space-y-3">

                  <FakeClass />

                  <FakeClass small />

                  <FakeClass />

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

function Stat({
  number,
  label,
}:{
  number:string;
  label:string;
}){

  return(

    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">

      <h3 className="text-3xl font-bold">
        {number}
      </h3>

      <p className="mt-2 text-neutral-400">
        {label}
      </p>

    </div>

  )

}

function FakeClass({
  small=false,
}:{
  small?:boolean;
}){

  return(

    <div
      className={`
      rounded-xl
      bg-gradient-to-r
      from-blue-600/70
      to-cyan-500/70
      ${small?"h-14":"h-24"}
      `}
    />

  )

}