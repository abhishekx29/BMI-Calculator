import bmiImage from "@/bmi.png";

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 pt-10 pb-10 sm:gap-10 sm:pt-14 sm:pb-14">
        <img
          src={bmiImage}
          alt="Body mass index scales and health indicators"
          className="mx-auto max-h-[18rem] w-full max-w-4xl object-contain sm:max-h-[24rem]"
        />
        <div className="text-center md:text-left">
          <h1 className="font-display mt-6 text-4xl leading-[1.05] text-balance sm:text-6xl">
            Know Your BMI. <span className="text-primary">Understand Your Health.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0">
            Calculate your Body Mass Index in seconds and get a clear, easy-to-understand snapshot
            of where you stand.
          </p>
        </div>
      </div>
    </header>
  );
}
