import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const progress = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="space-y-4">
      {/* Progress text */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-body font-semibold text-muted-foreground tracking-wide uppercase">
          Step {currentStep} of {steps.length} — {steps[currentStep - 1]?.label}
        </p>
        <span className="text-xs font-body font-bold text-accent">{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full rounded-full bg-border overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--burnt-orange-light)))",
          }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-bold transition-all duration-300 ${
                  isComplete
                    ? "bg-accent text-accent-foreground"
                    : isActive
                    ? "bg-accent text-accent-foreground ring-4 ring-accent/15"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete ? <Check className="w-3.5 h-3.5" /> : index + 1}
              </div>
              <span
                className={`text-[10px] font-body font-medium whitespace-nowrap ${
                  isActive ? "text-accent font-semibold" : isComplete ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
