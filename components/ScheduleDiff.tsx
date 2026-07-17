interface ScheduleDiffProps {
  comparison: any;
}

export default function ScheduleDiff({
  comparison,
}: ScheduleDiffProps) {
  if (!comparison) return null;

  return (
    <div className="mt-10 space-y-8">

      {/* Added */}
      <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
        <h3 className="mb-4 text-xl font-bold text-green-400">
          Added Classes
        </h3>

        {comparison.added.length === 0 ? (
          <p className="text-neutral-500">
            No additions.
          </p>
        ) : (
          <div className="space-y-3">
            {comparison.added.map((item: any, i: number) => (
              <div
                key={i}
                className="rounded-lg bg-neutral-900 p-4"
              >
                <p className="font-semibold">
                  + {item.course}
                </p>

                <p className="text-sm text-neutral-400">
                  {item.meeting_type}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Removed */}

      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
        <h3 className="mb-4 text-xl font-bold text-red-400">
          Removed Classes
        </h3>

        {comparison.removed.length === 0 ? (
          <p className="text-neutral-500">
            No removals.
          </p>
        ) : (
          <div className="space-y-3">
            {comparison.removed.map((item: any, i: number) => (
              <div
                key={i}
                className="rounded-lg bg-neutral-900 p-4"
              >
                <p className="font-semibold">
                  − {item.course}
                </p>

                <p className="text-sm text-neutral-400">
                  {item.meeting_type}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Changed */}

      <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
        <h3 className="mb-4 text-xl font-bold text-yellow-400">
          Modified Classes
        </h3>

        {comparison.changed.length === 0 ? (
          <p className="text-neutral-500">
            No changes detected.
          </p>
        ) : (
          <div className="space-y-5">
            {comparison.changed.map((item: any, i: number) => (
              <div
                key={i}
                className="rounded-xl bg-neutral-900 p-5"
              >
                <h4 className="font-bold">
                  {item.course}
                </h4>

                <div className="mt-3 space-y-2">
                  {Object.entries(item.changes).map(
                    ([field, values]: any) => (
                      <div
                        key={field}
                        className="flex items-center gap-4"
                      >
                        <span className="w-28 capitalize text-neutral-400">
                          {field}
                        </span>

                        <span className="text-red-400">
                          {values.old}
                        </span>

                        <span>→</span>

                        <span className="text-green-400">
                          {values.new}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}