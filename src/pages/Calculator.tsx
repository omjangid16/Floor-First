import { useState } from "react";
import { Calculator as CalcIcon, Sparkles } from "lucide-react";
import CalculatorWizard, { type WizardInputs } from "@/components/calculator/CalculatorWizard";
import CalculatorResults from "@/components/calculator/CalculatorResults";

const CalculatorPage = () => {
  const [results, setResults] = useState<WizardInputs | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-walnut py-12 lg:py-16">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <CalcIcon className="w-5 h-5 text-accent" />
            </div>
            <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-body font-semibold text-accent uppercase tracking-wider">Smart Tool</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
            Flooring Calculator
          </h1>
          <p className="text-primary-foreground/60 font-body mt-2 max-w-xl text-sm md:text-base">
            Get instant cost estimates, product recommendations, and installation timelines — step by step.
          </p>
        </div>
      </section>

      <div className="container-luxury py-8 md:py-12">
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
