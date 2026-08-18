import { SEGMENTS, SCALE_MIN, SCALE_MAX, scalePosition, type BMICategory } from "@/lib/bmi";
import { useCountUp } from "@/hooks/use-count-up";

const COLORS: Record<string, string> = {
  under: "bg-under",
  healthy: "bg-healthy",
  over: "bg-over",
  obese: "bg-obese",
};

export function BMIGauge({ bmi, category }: { bmi: number; category: BMICategory }) {
  const animated = useCountUp(bmi, 1000);
  const pos = scalePosition(animated);

  return (
    <figure className="mt-2">
      <div
        className="relative"
        role="img"
        aria-label={`BMI scale from ${SCALE_MIN} to ${SCALE_MAX}. Your BMI of ${bmi.toFixed(1)} falls in the ${category} range.`}
      >
        {/* marker */}
        <div
          className="absolute -top-9 z-10 -translate-x-1/2 transition-[left] duration-700 ease-out"
          style={{ left: `${pos}%` }}
        >
          <div className="rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-semibold tabular-nums shadow-soft">
            {animated.toFixed(1)}
          </div>
          <div className="mx-auto mt-1 size-2 rotate-45 border-r border-b border-border/70 bg-card" />
        </div>

        <div className="flex h-4 gap-1 overflow-hidden rounded-full">
          {SEGMENTS.map((s) => (
            <div
              key={s.token}
              className={`${COLORS[s.token]} h-full rounded-full`}
              style={{ width: `${((s.to - s.from) / (SCALE_MAX - SCALE_MIN)) * 100}%` }}
            />
          ))}
        </div>

        <div
          className="absolute top-0 h-4 w-1 -translate-x-1/2 rounded-full bg-foreground/85 shadow-lift transition-[left] duration-700 ease-out"
          style={{ left: `${pos}%` }}
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1 text-[11px] leading-tight sm:text-xs">
        {SEGMENTS.map((s) => (
          <div key={s.token} className={s.label === category ? "text-foreground font-semibold" : "text-muted-foreground"}>
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{s.short}</span>
            <div className="mt-0.5 tabular-nums opacity-70">
              {s.from === SCALE_MIN ? "< 18.5" : s.to === SCALE_MAX ? "30+" : s.to === 25 ? "18.5–24.9" : "25–29.9"}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
