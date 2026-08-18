import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCALE_MAX, SCALE_MIN, segmentToken, type BMIRecord } from "@/lib/bmi";

const DOT: Record<string, string> = {
  under: "bg-under",
  healthy: "bg-healthy",
  over: "bg-over",
  obese: "bg-obese",
};

function Sparkline({ records }: { records: BMIRecord[] }) {
  const points = [...records].reverse();
  const w = 200;
  const h = 48;
  const path = points
    .map((r, i) => {
      const x = points.length === 1 ? w / 2 : (i / (points.length - 1)) * w;
      const clamped = Math.min(Math.max(r.bmi, SCALE_MIN), SCALE_MAX);
      const y = h - ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const first = points[0]!.bmi;
  const last = points[points.length - 1]!.bmi;
  const delta = last - first;

  return (
    <div className="flex items-center gap-4">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-12 w-full max-w-[200px] overflow-visible"
        role="img"
        aria-label={`Trend of your last ${points.length} BMI results, from ${first.toFixed(1)} to ${last.toFixed(1)}.`}
      >
        <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="text-sm tabular-nums whitespace-nowrap text-muted-foreground">
        {delta === 0 ? "No change" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)} since first`}
      </p>
    </div>
  );
}

export function BMIHistory({ records, onClear }: { records: BMIRecord[]; onClear: () => void }) {
  if (records.length === 0) return null;

  return (
    <section aria-labelledby="history-heading" className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="history-heading" className="flex items-center gap-2 text-sm font-semibold">
          <History className="size-4 text-primary" aria-hidden="true" /> Your history
        </h2>
        <Button variant="ghost" size="sm" onClick={onClear} className="min-h-11 rounded-full text-muted-foreground">
          <Trash2 className="size-4" aria-hidden="true" /> Clear
        </Button>
      </div>

      {records.length > 1 && (
        <div className="mt-5 rounded-2xl bg-surface-2 p-4">
          <Sparkline records={records} />
        </div>
      )}

      <ul className="mt-5 divide-y divide-border/70">
        {records.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              <span className={`size-2.5 rounded-full ${DOT[segmentToken(r.category)]}`} aria-hidden="true" />
              <span className="text-lg font-semibold tabular-nums">{r.bmi.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">{r.category}</span>
            </div>
            <time dateTime={r.date} className="text-xs text-muted-foreground">
              {new Date(r.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
