import type { LucideIcon } from "lucide-react";

export function HealthInsightCard({
  icon: Icon,
  label,
  value,
  detail,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
  delay?: number;
}) {
  return (
    <div
      className="animate-rise rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-3 text-lg leading-snug font-semibold">{value}</p>
      {detail && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>}
    </div>
  );
}
