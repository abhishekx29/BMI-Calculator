import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { BMIForm, type FormResult } from "./BMIForm";
import { BMIResult } from "./BMIResult";
import { BMIHistory } from "./BMIHistory";
import { categorize, computeBMI, type BMIRecord } from "@/lib/bmi";

const HISTORY_KEY = "bmi.history";
const LAST_KEY = "bmi.last";

export function Calculator() {
  const [record, setRecord] = useState<BMIRecord | null>(null);
  const [history, setHistory] = useState<BMIRecord[]>([]);

  useEffect(() => {
    try {
      const last = localStorage.getItem(LAST_KEY);
      if (last) setRecord(JSON.parse(last) as BMIRecord);
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) setHistory(JSON.parse(stored) as BMIRecord[]);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const handleCalculate = (r: FormResult) => {
    const bmi = Math.round(computeBMI(r.weightKg, r.heightCm) * 10) / 10;
    const next: BMIRecord = {
      id: `${Date.now()}`,
      bmi,
      category: categorize(bmi),
      date: new Date().toISOString(),
      heightM: r.heightCm / 100,
      weightKg: r.weightKg,
      units: r.units,
      ...(r.age !== undefined ? { age: r.age } : {}),
      ...(r.sex !== undefined ? { sex: r.sex } : {}),
    };
    setRecord(next);
    const nextHistory = [next, ...history].slice(0, 8);
    setHistory(nextHistory);
    localStorage.setItem(LAST_KEY, JSON.stringify(next));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    requestAnimationFrame(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const clearResult = () => {
    setRecord(null);
    localStorage.removeItem(LAST_KEY);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const recalculate = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("height-cm")?.focus();
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
      <div id="calculator" className="lg:sticky lg:top-8">
        <BMIForm onCalculate={handleCalculate} onReset={clearResult} />
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" aria-hidden="true" /> Instant, accurate
            results
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" /> Private — stays on
            your device
          </li>
        </ul>
      </div>

      <div id="results" className="space-y-6 scroll-mt-8">
        {record ? (
          <BMIResult record={record} onRecalculate={recalculate} />
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-surface p-8 text-center">
            <p className="font-display text-2xl">Your result will appear here</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Enter your height and weight, then calculate to see your BMI, where it sits on the scale, and what it
              means.
            </p>
          </div>
        )}
        <BMIHistory records={history} onClear={clearHistory} />
      </div>
    </div>
  );
}
