import { Activity, Check, Copy, Printer, RefreshCw, Ruler, Share2, Scale, Target, Lightbulb } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BMIGauge } from "./BMIGauge";
import { HealthInsightCard } from "./HealthInsightCard";
import { useCountUp } from "@/hooks/use-count-up";
import { CATEGORY_COPY, formatKg, healthyWeightRangeKg, segmentToken, type BMIRecord } from "@/lib/bmi";

const TEXT: Record<string, string> = {
  under: "text-under",
  healthy: "text-healthy",
  over: "text-over",
  obese: "text-obese",
};

export function BMIResult({ record, onRecalculate }: { record: BMIRecord; onRecalculate: () => void }) {
  const animated = useCountUp(record.bmi);
  const [copied, setCopied] = useState(false);
  const token = segmentToken(record.category);
  const range = healthyWeightRangeKg(record.heightM * 100);
  const copy = CATEGORY_COPY[record.category];

  const summary = `My BMI is ${record.bmi.toFixed(1)} (${record.category}). Healthy BMI range: 18.5–24.9.`;

  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "My BMI result", text: summary });
        return;
      } catch {
        /* dismissed — fall through to copy */
      }
    }
    await copyResult();
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Result copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — you can select the text instead.");
    }
  };

  return (
    <section aria-labelledby="result-heading" className="animate-rise">
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-lift sm:p-8">
        <h2 id="result-heading" className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Your BMI
        </h2>

        <div aria-live="polite" className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
          <p className={`font-display text-6xl leading-none tabular-nums sm:text-7xl ${TEXT[token]}`}>
            {animated.toFixed(1)}
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface-2 px-3 py-1.5 text-sm font-semibold">
            <span className={`size-2 rounded-full ${token === "healthy" ? "bg-healthy" : token === "under" ? "bg-under" : token === "over" ? "bg-over" : "bg-obese"}`} aria-hidden="true" />
            {record.category}
          </p>
        </div>

        <p className="sr-only">
          Your BMI is {record.bmi.toFixed(1)}, which is classified as {record.category}.
        </p>

        <div className="mt-12">
          <BMIGauge bmi={record.bmi} category={record.category} />
        </div>

        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.meaning}</p>

        <div className="no-print mt-7 flex flex-wrap gap-2">
          <Button onClick={onRecalculate} className="min-h-11 rounded-full">
            <RefreshCw className="size-4" aria-hidden="true" /> Calculate again
          </Button>
          <Button variant="outline" onClick={share} className="min-h-11 rounded-full">
            <Share2 className="size-4" aria-hidden="true" /> Share
          </Button>
          <Button variant="outline" onClick={copyResult} className="min-h-11 rounded-full">
            {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="min-h-11 rounded-full"
            aria-label="Print your result"
          >
            <Printer className="size-4" aria-hidden="true" /> Print
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <HealthInsightCard
          icon={Activity}
          label="BMI category"
          value={record.category}
          detail={`Based on a BMI of ${record.bmi.toFixed(1)}.`}
          delay={60}
        />
        <HealthInsightCard
          icon={Target}
          label="Healthy BMI range"
          value="18.5 – 24.9"
          detail="The standard adult reference range used by health organisations."
          delay={120}
        />
        <HealthInsightCard
          icon={Scale}
          label="Healthy weight range"
          value={`${formatKg(range.min, record.units)} – ${formatKg(range.max, record.units)}`}
          detail={`For your height of ${record.units === "metric" ? `${(record.heightM * 100).toFixed(0)} cm` : `${Math.floor((record.heightM * 100) / 2.54 / 12)}′${Math.round(((record.heightM * 100) / 2.54) % 12)}″`}.`}
          delay={180}
        />
        <HealthInsightCard
          icon={Ruler}
          label="What your result means"
          value={record.category === "Healthy Weight" ? "You're in the reference range" : "Worth keeping an eye on"}
          detail={copy.meaning}
          delay={240}
        />
        <div className="sm:col-span-2">
          <HealthInsightCard icon={Lightbulb} label="Next steps" value={copy.next} delay={300} />
        </div>
      </div>
    </section>
  );
}
