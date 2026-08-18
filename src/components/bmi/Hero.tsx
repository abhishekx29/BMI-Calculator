import { ShieldCheck, Sparkles } from "lucide-react";
import bmiImage from "@/bmi.png";

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-14 pb-10 sm:pt-20 sm:pb-14 md:grid-cols-[0.85fr_1.15fr] md:gap-12 lg:gap-16">
        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Body composition insight
          </p>
          <h1 className="font-display mt-6 text-4xl leading-[1.05] text-balance sm:text-6xl">
            Know Your BMI. <span className="text-primary">Understand Your Health.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0">
            Calculate your Body Mass Index in seconds and get a clear, easy-to-understand snapshot
            of where you stand.
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground md:justify-start">
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
        <img
          src={bmiImage}
          alt="Body mass index scales and health indicators"
          className="mx-auto max-h-[24rem] w-full max-w-3xl object-contain md:mx-0 md:max-h-[30rem]"
        />
      </div>
    </header>
  );
}
