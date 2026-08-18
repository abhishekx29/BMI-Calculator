import { BookOpen, CircleAlert } from "lucide-react";

const LIMITS = [
  "It doesn't distinguish muscle from fat, so athletes can read high.",
  "It says nothing about where body fat sits, which matters for health.",
  "It isn't designed for pregnancy, children, or older adults in the same way.",
  "Individual history, genetics, and lifestyle all shape the fuller picture.",
];

export function EducationalSection() {
  return (
    <section aria-labelledby="edu-heading" className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          <BookOpen className="size-3.5 text-primary" aria-hidden="true" /> Understanding the number
        </p>
        <h2 id="edu-heading" className="font-display mt-4 text-3xl sm:text-4xl">
          What is BMI?
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Body Mass Index compares your weight to your height to produce a single number. It's a quick screening tool
          that helps place you in a broad range — nothing more, nothing less. It doesn't measure body fat, fitness, or
          health directly.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
          <h3 className="text-sm font-semibold">The formula</h3>
          <p className="font-display mt-5 text-2xl sm:text-3xl">
            BMI = weight (kg) ÷ height² (m)
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Example: 68 kg at 1.70 m → 68 ÷ (1.70 × 1.70) = <span className="font-semibold text-foreground">23.5</span>
          </p>
          <p className="mt-4 rounded-2xl bg-surface-2 p-4 text-sm text-muted-foreground">
            Imperial inputs are converted first: pounds × 0.45359237 for kilograms, inches × 2.54 for centimetres.
          </p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <CircleAlert className="size-4 text-over" aria-hidden="true" /> Where BMI falls short
          </h3>
          <ul className="mt-5 space-y-3">
            {LIMITS.map((l) => (
              <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Treat your result as a conversation starter, not a diagnosis.
          </p>
        </div>
      </div>
    </section>
  );
}
