export default function HowItWorks() {
  const steps = [
    "Upload Schedule",
    "Review Events",
    "Export Anywhere",
  ];

  return (
    <section className="mx-auto mt-24 mb-24 max-w-5xl">

      <h2 className="mb-10 text-center text-3xl font-bold">
        How It Works
      </h2>

      <div className="grid gap-8 md:grid-cols-3">

        {steps.map((step, index) => (

          <div
            key={step}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center"
          >
            <div className="mb-5 text-4xl font-bold text-blue-500">
              {index + 1}
            </div>

            <h3 className="text-xl font-semibold">
              {step}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}