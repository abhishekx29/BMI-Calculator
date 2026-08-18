export function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>BMI Studio — a calm, private way to check your Body Mass Index.</p>
        <p className="max-w-sm text-xs leading-relaxed">
          For general information only. Not medical advice, diagnosis, or treatment. Speak with a healthcare
          professional about your individual health.
        </p>
      </div>
    </footer>
  );
}
