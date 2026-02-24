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
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="relative h-1 w-full rounded-full bg-border overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--burnt-orange-light)))",
          }}
        />
      </div>

      {/* Step circles row */}
      <div className="flex items-start justify-between px-2">
        {steps.map((step) => {
          const isComplete = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-body font-bold transition-all duration-300 ${
                  isComplete
                    ? "bg-accent text-accent-foreground"
                    : isActive
                    ? "bg-accent text-accent-foreground ring-4 ring-accent/15 shadow-md"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {isComplete ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-[11px] font-body whitespace-nowrap ${
                  isActive ? "text-accent font-bold" : isComplete ? "text-foreground font-medium" : "text-muted-foreground font-medium"
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
