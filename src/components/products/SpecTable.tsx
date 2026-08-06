import type { SpecGroup } from "@/types/product";
import { SPEC_GROUP_LABELS } from "@/types/product";

export function SpecTable({
  specs,
  highlightDiff,
  compareValues,
}: {
  specs: Record<SpecGroup, Record<string, string>>;
  highlightDiff?: boolean;
  compareValues?: Record<string, string[]>;
}) {
  const groups = (Object.keys(SPEC_GROUP_LABELS) as SpecGroup[]).filter(
    (g) => Object.keys(specs[g] ?? {}).length > 0,
  );

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {SPEC_GROUP_LABELS[group]}
          </h3>
          <dl className="divide-y divide-neutral-100 rounded-lg border border-neutral-200">
            {Object.entries(specs[group]).map(([key, value]) => {
              const values = compareValues?.[`${group}:${key}`];
              const differs =
                highlightDiff &&
                values &&
                new Set(values).size > 1;
              return (
                <div
                  key={key}
                  className={`grid grid-cols-[1fr_1.2fr] gap-2 px-3 py-2 text-sm ${
                    differs ? "bg-amber-50/80" : ""
                  }`}
                >
                  <dt className="text-neutral-600">{key}</dt>
                  <dd className="font-medium text-neutral-950">{value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
    </div>
  );
}
