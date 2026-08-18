export type UnitSystem = "metric" | "imperial";
export type Sex = "female" | "male" | "unspecified";

export type BMICategory = "Underweight" | "Healthy Weight" | "Overweight" | "Obesity";

export interface BMIRecord {
  id: string;
  bmi: number;
  category: BMICategory;
  date: string;
  heightM: number;
  weightKg: number;
  units: UnitSystem;
  age?: number | undefined;
  sex?: Sex | undefined;
}

export const KG_PER_LB = 0.45359237;
export const CM_PER_IN = 2.54;

export const SCALE_MIN = 12;
export const SCALE_MAX = 42;

export const SEGMENTS: { label: BMICategory; short: string; from: number; to: number; token: string }[] = [
  { label: "Underweight", short: "Under", from: SCALE_MIN, to: 18.5, token: "under" },
  { label: "Healthy Weight", short: "Healthy", from: 18.5, to: 25, token: "healthy" },
  { label: "Overweight", short: "Over", from: 25, to: 30, token: "over" },
  { label: "Obesity", short: "Obese", from: 30, to: SCALE_MAX, token: "obese" },
];

export function lbToKg(lb: number) {
  return lb * KG_PER_LB;
}

export function kgToLb(kg: number) {
  return kg / KG_PER_LB;
}

export function feetInchesToCm(ft: number, inch: number) {
  return (ft * 12 + inch) * CM_PER_IN;
}

export function categorize(bmi: number): BMICategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy Weight";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

export function computeBMI(weightKg: number, heightCm: number) {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function healthyWeightRangeKg(heightCm: number) {
  const m = heightCm / 100;
  return { min: 18.5 * m * m, max: 24.9 * m * m };
}

/** Position on the visual scale, 0-100. */
export function scalePosition(bmi: number) {
  const clamped = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX);
  return ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
}

export function segmentToken(category: BMICategory) {
  return SEGMENTS.find((s) => s.label === category)!.token;
}

export const CATEGORY_COPY: Record<BMICategory, { meaning: string; next: string }> = {
  Underweight: {
    meaning:
      "Your BMI sits below the healthy range. This can happen for many reasons, and it doesn't automatically signal a problem.",
    next: "Focus on nutrient-dense meals and consistent eating patterns. A clinician or dietitian can help you build a plan.",
  },
  "Healthy Weight": {
    meaning:
      "Your BMI is within the healthy range. BMI is one screening measure and does not directly measure body fat.",
    next: "Keep doing what works: regular movement, balanced meals, and good sleep. Recheck occasionally to spot trends.",
  },
  Overweight: {
    meaning:
      "Your BMI is slightly above the healthy range. Body composition, muscle mass, and lifestyle all influence this number.",
    next: "Small, sustainable steps help most: daily walking, strength work twice a week, and mindful portions.",
  },
  Obesity: {
    meaning:
      "Your BMI is above the healthy range. This is a screening signal, not a diagnosis, and context matters a great deal.",
    next: "Consider a conversation with a healthcare professional who can look at the fuller picture with you.",
  },
};

export function formatKg(kg: number, units: UnitSystem) {
  return units === "metric" ? `${kg.toFixed(1)} kg` : `${kgToLb(kg).toFixed(1)} lb`;
}
