import { useEffect, useState } from "react";
import { Ruler, Scale, RotateCcw, Calculator as CalcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { feetInchesToCm, kgToLb, lbToKg, CM_PER_IN, type Sex, type UnitSystem } from "@/lib/bmi";

export interface FormResult {
  heightCm: number;
  weightKg: number;
  units: UnitSystem;
  age?: number | undefined;
  sex?: Sex | undefined;
}

const UNIT_KEY = "bmi.units";
const SEXES: { value: Sex; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "unspecified", label: "Prefer not to say" },
];

type Errors = Partial<Record<"height" | "weight" | "age", string>>;

export function BMIForm({ onCalculate, onReset }: { onCalculate: (r: FormResult) => void; onReset: () => void }) {
  const [units, setUnits] = useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = useState("170");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("7");
  const [weightKg, setWeightKg] = useState("68");
  const [weightLb, setWeightLb] = useState("150");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Sex | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(UNIT_KEY);
    if (stored === "metric" || stored === "imperial") setUnits(stored);
  }, []);

  const switchUnits = (next: UnitSystem) => {
    if (next === units) return;
    if (next === "imperial") {
      const cm = parseFloat(heightCm) || 170;
      const totalIn = cm / CM_PER_IN;
      setFeet(String(Math.floor(totalIn / 12)));
      setInches((totalIn % 12).toFixed(0));
      setWeightLb(kgToLb(parseFloat(weightKg) || 68).toFixed(0));
    } else {
      setHeightCm(feetInchesToCm(parseFloat(feet) || 5, parseFloat(inches) || 7).toFixed(0));
      setWeightKg(lbToKg(parseFloat(weightLb) || 150).toFixed(0));
    }
    setUnits(next);
    setErrors({});
    localStorage.setItem(UNIT_KEY, next);
  };

  const resolve = () => {
    const h = units === "metric" ? parseFloat(heightCm) : feetInchesToCm(parseFloat(feet), parseFloat(inches) || 0);
    const w = units === "metric" ? parseFloat(weightKg) : lbToKg(parseFloat(weightLb));
    return { h, w };
  };

  const validate = () => {
    const { h, w } = resolve();
    const next: Errors = {};
    if (!isFinite(h) || h <= 0) next.height = "Please enter your height.";
    else if (h < 90 || h > 250) next.height = "Height should be between 3′0″ and 8′2″ (90–250 cm).";
    if (!isFinite(w) || w <= 0) next.weight = "Please enter your weight.";
    else if (w < 20 || w > 350) next.weight = "Weight should be between 44 lb and 771 lb (20–350 kg).";
    if (age.trim()) {
      const a = parseFloat(age);
      if (!isFinite(a) || a < 2 || a > 120) next.age = "Age should be between 2 and 120.";
    }
    setErrors(next);
    return Object.keys(next).length === 0 ? { h, w } : null;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validate();
    if (!ok) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      onCalculate({
        heightCm: ok.h,
        weightKg: ok.w,
        units,
        age: age.trim() ? parseFloat(age) : undefined,
        sex: sex || undefined,
      });
    }, 260);
  };

  const reset = () => {
    setHeightCm("170");
    setFeet("5");
    setInches("7");
    setWeightKg("68");
    setWeightLb("150");
    setAge("");
    setSex("");
    setErrors({});
    onReset();
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:p-8"
      aria-label="BMI calculator"
    >
      {/* Unit toggle */}
      <div
        role="radiogroup"
        aria-label="Unit system"
        className="mb-8 grid grid-cols-2 gap-1 rounded-full bg-surface-2 p-1"
      >
        {(["metric", "imperial"] as UnitSystem[]).map((u) => (
          <button
            key={u}
            type="button"
            role="radio"
            aria-checked={units === u}
            onClick={() => switchUnits(u)}
            className={`min-h-11 rounded-full px-4 text-sm font-medium transition-all ${
              units === u
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {u === "metric" ? "Metric (kg / cm)" : "Imperial (lb / ft)"}
          </button>
        ))}
      </div>

      {/* Height */}
      <fieldset className="mb-8">
        <legend className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Ruler className="size-4 text-primary" aria-hidden="true" /> Height
        </legend>
        {units === "metric" ? (
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Label htmlFor="height-cm" className="text-xs text-muted-foreground">
                  Centimetres
                </Label>
                <Input
                  id="height-cm"
                  inputMode="decimal"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  aria-invalid={!!errors.height}
                  aria-describedby={errors.height ? "height-error" : undefined}
                  className="mt-1 h-12 rounded-xl text-lg tabular-nums"
                />
              </div>
              <span className="pb-3.5 text-sm text-muted-foreground">cm</span>
            </div>
            <Slider
              value={[Math.min(Math.max(parseFloat(heightCm) || 170, 120), 220)]}
              min={120}
              max={220}
              step={1}
              onValueChange={(v) => setHeightCm(String(v[0]))}
              aria-label="Height in centimetres"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="height-ft" className="text-xs text-muted-foreground">
                Feet
              </Label>
              <Input
                id="height-ft"
                inputMode="numeric"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                aria-invalid={!!errors.height}
                className="mt-1 h-12 rounded-xl text-lg tabular-nums"
              />
            </div>
            <div>
              <Label htmlFor="height-in" className="text-xs text-muted-foreground">
                Inches
              </Label>
              <Input
                id="height-in"
                inputMode="numeric"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                aria-invalid={!!errors.height}
                className="mt-1 h-12 rounded-xl text-lg tabular-nums"
              />
            </div>
          </div>
        )}
        {errors.height && (
          <p id="height-error" role="alert" className="mt-2 text-sm text-destructive">
            {errors.height}
          </p>
        )}
      </fieldset>

      {/* Weight */}
      <fieldset className="mb-8">
        <legend className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Scale className="size-4 text-primary" aria-hidden="true" /> Weight
        </legend>
        <div className="space-y-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Label htmlFor="weight" className="text-xs text-muted-foreground">
                {units === "metric" ? "Kilograms" : "Pounds"}
              </Label>
              <Input
                id="weight"
                inputMode="decimal"
                value={units === "metric" ? weightKg : weightLb}
                onChange={(e) => (units === "metric" ? setWeightKg(e.target.value) : setWeightLb(e.target.value))}
                aria-invalid={!!errors.weight}
                aria-describedby={errors.weight ? "weight-error" : undefined}
                className="mt-1 h-12 rounded-xl text-lg tabular-nums"
              />
            </div>
            <span className="pb-3.5 text-sm text-muted-foreground">{units === "metric" ? "kg" : "lb"}</span>
          </div>
          <Slider
            value={[
              units === "metric"
                ? Math.min(Math.max(parseFloat(weightKg) || 68, 30), 200)
                : Math.min(Math.max(parseFloat(weightLb) || 150, 66), 440),
            ]}
            min={units === "metric" ? 30 : 66}
            max={units === "metric" ? 200 : 440}
            step={1}
            onValueChange={(v) => (units === "metric" ? setWeightKg(String(v[0])) : setWeightLb(String(v[0])))}
            aria-label={units === "metric" ? "Weight in kilograms" : "Weight in pounds"}
          />
        </div>
        {errors.weight && (
          <p id="weight-error" role="alert" className="mt-2 text-sm text-destructive">
            {errors.weight}
          </p>
        )}
      </fieldset>

      {/* Optional */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="age" className="text-xs text-muted-foreground">
            Age <span className="opacity-70">(optional)</span>
          </Label>
          <Input
            id="age"
            inputMode="numeric"
            placeholder="e.g. 32"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? "age-error" : undefined}
            className="mt-1 h-12 rounded-xl tabular-nums"
          />
          {errors.age && (
            <p id="age-error" role="alert" className="mt-2 text-sm text-destructive">
              {errors.age}
            </p>
          )}
        </div>
        <div>
          <span className="text-xs text-muted-foreground">
            Sex <span className="opacity-70">(optional)</span>
          </span>
          <div role="radiogroup" aria-label="Sex" className="mt-1 flex flex-wrap gap-2">
            {SEXES.map((s) => (
              <button
                key={s.value}
                type="button"
                role="radio"
                aria-checked={sex === s.value}
                onClick={() => setSex(sex === s.value ? "" : s.value)}
                className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${
                  sex === s.value
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" disabled={busy} className="h-13 flex-1 rounded-full text-base">
          <CalcIcon className="size-4" aria-hidden="true" />
          {busy ? "Calculating…" : "Calculate BMI"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={reset}
          className="h-13 rounded-full sm:w-auto"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Reset
        </Button>
      </div>
    </form>
  );
}
