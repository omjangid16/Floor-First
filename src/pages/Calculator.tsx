import { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import CalculatorWizard, { type WizardInputs } from "@/components/calculator/CalculatorWizard";
import CalculatorResults from "@/components/calculator/CalculatorResults";

const CalculatorPage = () => {
  const [results, setResults] = useState<WizardInputs | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Compact Header */}
      <section className="gradient-walnut py-6 lg:py-8">
        <div className="container-luxury">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center">
              <CalcIcon className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-display font-bold text-primary-foreground">
                Flooring Calculator
              </h1>
              <p className="text-primary-foreground/50 font-body text-xs">
                Get instant cost estimates step by step
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={results ? "container-luxury py-8 md:py-12" : ""}>
        {results ? (
          <CalculatorResults inputs={results} onBack={() => setResults(null)} />
        ) : (
          <CalculatorWizard onCalculate={(inputs) => setResults(inputs)} />
        )}
      </div>
    </main>
  );
};

export default CalculatorPage;
