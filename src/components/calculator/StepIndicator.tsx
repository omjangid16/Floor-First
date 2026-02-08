import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-8">
      {steps.map((step, index) => {
        const isComplete = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isComplete
                    ? "hsl(24 85% 50%)"
                    : isActive
                    ? "hsl(24 85% 50%)"
                    : "hsl(36 33% 90%)",
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-body font-bold transition-colors"
              >
                {isComplete ? (
                  <Check className="w-4 h-4 text-accent-foreground" />
                ) : (
                  <span className={isActive ? "text-accent-foreground" : "text-muted-foreground"}>
                    {step.id}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-[10px] font-body mt-1.5 whitespace-nowrap ${
                  isActive ? "text-accent font-semibold" : isComplete ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mt-[-16px]">
                <div
                  className={`h-full rounded-full transition-colors duration-300 ${
                    isComplete ? "bg-accent" : "bg-secondary"
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
