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
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group}>
          <h3 className="field-label mb-2">{SPEC_GROUP_LABELS[group]}</h3>
          <dl className="spec-sheet catalog-panel divide-y-2 divide-ink/10 overflow-hidden">
            {Object.entries(specs[group]).map(([key, value]) => {
              const values = compareValues?.[`${group}:${key}`];
              const differs =
                highlightDiff && values && new Set(values).size > 1;
              return (
                <div
                  key={key}
                  className={`grid grid-cols-[1fr_1.15fr] gap-2 px-3 py-2.5 ${
                    differs ? "bg-[#fff8e6]" : "bg-panel"
                  }`}
                >
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
    </div>
  );
}
