import { useState } from "react";
import CalculatorForm, { type CalcInputs } from "@/components/calculator/CalculatorForm";
import CalculatorResults from "@/components/calculator/CalculatorResults";

const CalculatorPage = () => {
  const [results, setResults] = useState<CalcInputs | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-12 lg:py-16">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Smart Tool</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
            Flooring Calculator
          </h1>
          <p className="text-primary-foreground/60 font-body mt-3 max-w-xl">
            Get instant cost estimates, product recommendations, and installation timelines for your flooring project.
          </p>
        </div>
      </section>

      <div className="container-luxury py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Form (always visible) */}
          <div className={results ? "hidden lg:block" : ""}>
            <CalculatorForm onCalculate={(inputs) => setResults(inputs)} />
          </div>

          {/* Right: Results */}
          {results ? (
            <CalculatorResults inputs={results} onBack={() => setResults(null)} />
          ) : (
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-3xl">📐</span>
                </div>
                <p className="font-display font-bold text-foreground text-lg mb-1">Ready to calculate</p>
                <p className="font-body text-sm">Fill in your preferences and click Calculate Estimate to see your personalized cost breakdown.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;
