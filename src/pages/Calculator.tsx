import { useState } from "react";
import CalculatorWizard, { type WizardInputs } from "@/components/calculator/CalculatorWizard";
import CalculatorResults from "@/components/calculator/CalculatorResults";

const CalculatorPage = () => {
  const [results, setResults] = useState<WizardInputs | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-10 lg:py-14">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Smart Tool</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
            Flooring Calculator
          </h1>
          <p className="text-primary-foreground/60 font-body mt-3 max-w-xl">
            Get instant cost estimates, product recommendations, and installation timelines — step by step.
          </p>
        </div>
      </section>

      <div className="container-luxury py-10">
        {results ? (
          <CalculatorResults inputs={results} onBack={() => setResults(null)} />
        ) : (
          <div className="max-w-4xl mx-auto">
            <CalculatorWizard onCalculate={(inputs) => setResults(inputs)} />
          </div>
        )}
      </div>
    </main>
  );
};

export default CalculatorPage;
