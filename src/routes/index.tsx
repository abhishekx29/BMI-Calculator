import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/bmi/Hero";
import { Calculator } from "@/components/bmi/Calculator";
import { EducationalSection } from "@/components/bmi/EducationalSection";
import { Footer } from "@/components/bmi/Footer";

const title = "BMI Calculator — Know Your BMI, Understand Your Health";
const description =
  "Calculate your Body Mass Index in seconds with metric or imperial units, and see exactly where you fall on the BMI scale with clear, reassuring insights.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="ambient-bg min-h-dvh">
      <main>
        <Hero />
        <Calculator />
        <EducationalSection />
      </main>
      <Footer />
    </div>
  );
}
