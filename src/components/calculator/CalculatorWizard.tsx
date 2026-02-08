import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Calculator as CalcIcon } from "lucide-react";
import { flooringTypes } from "@/data/products";
import { packageTiers } from "@/data/packageTiers";
import { type FlooringDesign } from "@/data/flooringDesigns";
import DesignSelector from "./DesignSelector";
import StepIndicator from "./StepIndicator";

import typeTile from "@/assets/type-tile.jpg";
import typeStone from "@/assets/type-stone.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";
import typeRubber from "@/assets/type-rubber.jpg";

const typeImages: Record<string, string> = {
  tile: typeTile, stone: typeStone, wood: typeWood, vinyl: typeVinyl,
  resin: typeResin, carpet: typeCarpet, outdoor: typeOutdoor, rubber: typeRubber,
};

const spaceTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Warehouse", "Hotel Lobby", "Gym"];

const steps = [
  { id: 1, label: "Space" },
  { id: 2, label: "Flooring" },
  { id: 3, label: "Design" },
  { id: 4, label: "Package" },
  { id: 5, label: "Area" },
];

export interface WizardInputs {
  spaceType: string;
  floorType: string;
  floorTypeName: string;
  design: FlooringDesign | null;
  packageTier: string;
  packageName: string;
  area: number;
  budget: number;
}

interface CalculatorWizardProps {
  onCalculate: (inputs: WizardInputs) => void;
}

const CalculatorWizard = ({ onCalculate }: CalculatorWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [spaceType, setSpaceType] = useState("Living Room");
  const [floorType, setFloorType] = useState("wood");
  const [selectedDesign, setSelectedDesign] = useState<FlooringDesign | null>(null);
  const [packageTier, setPackageTier] = useState("standard");
  const [area, setArea] = useState(50);
  const [budget, setBudget] = useState(150);

  const canNext = () => {
    switch (currentStep) {
      case 1: return !!spaceType;
      case 2: return !!floorType;
      case 3: return !!selectedDesign;
      case 4: return !!packageTier;
      case 5: return area > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      // Reset design when changing flooring type
      if (currentStep === 2) {
        setSelectedDesign(null);
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleCalculate = () => {
    const selectedFloorType = flooringTypes.find((t) => t.id === floorType);
    const selectedPkg = packageTiers.find((p) => p.id === packageTier);
    onCalculate({
      spaceType,
      floorType,
      floorTypeName: selectedFloorType?.name || floorType,
      design: selectedDesign,
      packageTier,
      packageName: selectedPkg?.name || packageTier,
      area,
      budget,
    });
  };

  const selectedFloorType = flooringTypes.find((t) => t.id === floorType);

  // Summary panel items
  const summaryItems = [
    { label: "Space", value: spaceType, active: currentStep >= 1 },
    { label: "Flooring", value: selectedFloorType?.name?.replace(" Flooring", "") || "—", active: currentStep >= 2 },
    { label: "Design", value: selectedDesign?.name || "—", active: currentStep >= 3, gradient: selectedDesign?.gradient },
    { label: "Package", value: packageTiers.find((p) => p.id === packageTier)?.name || "—", active: currentStep >= 4 },
    { label: "Area", value: `${area} sqft`, active: currentStep >= 5 },
  ];

  return (
    <div className="space-y-6">
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Summary Bar */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-luxury">
        <div className="flex flex-wrap gap-3">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body transition-all ${
                item.active ? "bg-secondary text-foreground" : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {item.gradient && (
                <div className="w-4 h-4 rounded-sm shrink-0" style={{ background: item.gradient }} />
              )}
              <span className="font-medium">{item.label}:</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="min-h-[300px]"
        >
          {/* Step 1: Space Type */}
          {currentStep === 1 && (
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Where do you need flooring?</h3>
              <p className="text-sm font-body text-muted-foreground mb-5">Select the space type for your flooring project.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {spaceTypes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpaceType(s)}
                    className={`px-4 py-4 rounded-xl text-sm font-body font-semibold transition-all border-2 ${
                      spaceType === s
                        ? "gradient-accent text-accent-foreground border-accent shadow-luxury"
                        : "bg-card text-foreground border-border hover:border-accent/50 hover:shadow-md"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Flooring Type */}
          {currentStep === 2 && (
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Choose your flooring type</h3>
              <p className="text-sm font-body text-muted-foreground mb-5">Each type has unique designs and patterns.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {flooringTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setFloorType(t.id);
                      setSelectedDesign(null);
                    }}
                    className={`group rounded-xl overflow-hidden transition-all border-2 ${
                      floorType === t.id
                        ? "border-accent shadow-luxury scale-[1.02]"
                        : "border-border hover:border-accent/50 hover:shadow-md"
                    }`}
                  >
                    <div className="h-20 overflow-hidden">
                      <img
                        src={typeImages[t.id]}
                        alt={t.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className={`px-3 py-2.5 text-left ${floorType === t.id ? "bg-accent/10" : "bg-card"}`}>
                      <p className={`text-xs font-body font-bold ${floorType === t.id ? "text-accent" : "text-foreground"}`}>
                        {t.name.replace(" Flooring", "").replace(" & ", " ")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Design/Pattern */}
          {currentStep === 3 && (
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Pick a design for {selectedFloorType?.name || "your floor"}
              </h3>
              <p className="text-sm font-body text-muted-foreground mb-5">
                Filter by shade category and select your preferred design.
              </p>
              <DesignSelector
                flooringType={floorType}
                selectedDesign={selectedDesign}
                onSelect={setSelectedDesign}
              />
            </div>
          )}

          {/* Step 4: Package Tier */}
          {currentStep === 4 && (
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Select your package</h3>
              <p className="text-sm font-body text-muted-foreground mb-5">
                Choose a tier that matches your quality and budget expectations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packageTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPackageTier(tier.id)}
                    className={`text-left rounded-xl p-5 transition-all border-2 ${
                      packageTier === tier.id
                        ? "border-accent shadow-luxury bg-accent/5"
                        : "border-border bg-card hover:border-accent/50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <div>
                        <p className={`font-display font-bold text-base ${packageTier === tier.id ? "text-accent" : "text-foreground"}`}>
                          {tier.name}
                        </p>
                        <p className="text-xs font-body text-muted-foreground">{tier.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {tier.features.map((f) => (
                        <li key={f} className="text-xs font-body text-muted-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Area & Budget */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Set area & budget</h3>
              <p className="text-sm font-body text-muted-foreground mb-5">
                Adjust the sliders to match your project specifications.
              </p>

              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">
                  Area: <span className="text-accent">{area} sqft</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-burnt-orange"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
                  <span>10 sqft</span><span>1000 sqft</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">
                  Budget per sqft: <span className="text-accent">AED {budget}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-burnt-orange"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
                  <span>AED 50</span><span>AED 800</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-body font-semibold text-sm transition-all ${
            currentStep === 1
              ? "text-muted-foreground opacity-50 cursor-not-allowed"
              : "text-foreground hover:bg-secondary"
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {currentStep < 5 ? (
          <button
            onClick={handleNext}
            disabled={!canNext()}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-bold text-sm transition-all ${
              canNext()
                ? "gradient-accent text-accent-foreground hover:opacity-90 shadow-lg"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleCalculate}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-bold text-sm gradient-accent text-accent-foreground hover:opacity-90 shadow-lg transition-all"
          >
            <CalcIcon className="w-4 h-4" /> Calculate Estimate
          </button>
        )}
      </div>
    </div>
  );
};

export default CalculatorWizard;
