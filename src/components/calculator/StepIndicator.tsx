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
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => {
        const isComplete = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-body font-bold transition-all duration-300 ${
                  isComplete
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : isActive
                    ? "bg-accent text-accent-foreground shadow-lg ring-4 ring-accent/20"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-xs">{step.icon}</span>
                )}
              </div>
              <span
                className={`text-[10px] font-body mt-2 whitespace-nowrap font-semibold ${
                  isActive ? "text-accent" : isComplete ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-3 mt-[-16px]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isComplete ? "bg-accent" : "bg-border"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
