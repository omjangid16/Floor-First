import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Calculator as CalcIcon, Home, Layers, Palette, Crown, Ruler, Minus, Plus } from "lucide-react";
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

const spaceTypes = [
  { id: "living", label: "Living Room", icon: Home },
  { id: "bedroom", label: "Bedroom", icon: Home },
  { id: "kitchen", label: "Kitchen", icon: Home },
  { id: "bathroom", label: "Bathroom", icon: Home },
  { id: "office", label: "Office", icon: Home },
  { id: "warehouse", label: "Warehouse", icon: Home },
  { id: "hotel", label: "Hotel Lobby", icon: Home },
  { id: "gym", label: "Gym", icon: Home },
];

const steps = [
  { id: 1, label: "Space", icon: <Home className="w-4 h-4" /> },
  { id: 2, label: "Flooring", icon: <Layers className="w-4 h-4" /> },
  { id: 3, label: "Design", icon: <Palette className="w-4 h-4" /> },
  { id: 4, label: "Package", icon: <Crown className="w-4 h-4" /> },
  { id: 5, label: "Area", icon: <Ruler className="w-4 h-4" /> },
];

const areaPresets = [100, 250, 500, 1000, 2000];

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
  const [spaceType, setSpaceType] = useState("living");
  const [floorType, setFloorType] = useState("wood");
  const [selectedDesign, setSelectedDesign] = useState<FlooringDesign | null>(null);
  const [packageTier, setPackageTier] = useState("standard");
  const [area, setArea] = useState(500);
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
      if (currentStep === 2) setSelectedDesign(null);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleCalculate = () => {
    const selectedFloorType = flooringTypes.find((t) => t.id === floorType);
    const selectedPkg = packageTiers.find((p) => p.id === packageTier);
    const selectedSpace = spaceTypes.find((s) => s.id === spaceType);
    onCalculate({
      spaceType: selectedSpace?.label || spaceType,
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
  const selectedSpace = spaceTypes.find((s) => s.id === spaceType);
  const selectedPkg = packageTiers.find((p) => p.id === packageTier);

  const sliderPct = ((area - 50) / (5000 - 50)) * 100;
  const budgetPct = ((budget - 50) / (800 - 50)) * 100;

  return (
    <div className="space-y-6">
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Live Summary Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-luxury">
        <p className="text-[10px] font-body text-muted-foreground uppercase tracking-widest mb-2.5">Your Selection</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Space", value: selectedSpace?.label || "—", done: currentStep > 1 },
            { label: "Type", value: selectedFloorType?.name?.replace(" Flooring", "").replace(" & ", "/") || "—", done: currentStep > 2 },
            { label: "Design", value: selectedDesign?.name || "—", done: currentStep > 3, swatch: selectedDesign?.gradient },
            { label: "Package", value: selectedPkg?.name || "—", done: currentStep > 4 },
            { label: "Area", value: currentStep >= 5 ? `${area} sqft` : "—", done: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body transition-all ${
                item.done ? "bg-accent/10 text-accent border border-accent/20" : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {item.swatch && (
                <div className="w-3.5 h-3.5 rounded-sm shrink-0 shadow-sm" style={{ background: item.swatch }} />
              )}
              <span className="font-medium">{item.label}:</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-card rounded-2xl border border-border shadow-luxury overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 min-h-[340px]"
          >
            {/* Step 1: Space */}
            {currentStep === 1 && (
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">Where do you need flooring?</h3>
                <p className="text-sm font-body text-muted-foreground mb-6">Select the space for your project.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {spaceTypes.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSpaceType(s.id)}
                        className={`flex flex-col items-center gap-2 px-4 py-5 rounded-xl text-sm font-body font-semibold transition-all border-2 ${
                          spaceType === s.id
                            ? "border-accent bg-accent/5 text-accent shadow-md"
                            : "border-border bg-background text-foreground hover:border-accent/40"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Flooring Type */}
            {currentStep === 2 && (
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">Choose your flooring type</h3>
                <p className="text-sm font-body text-muted-foreground mb-6">Each type comes with unique designs.</p>
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
                          ? "border-accent shadow-luxury"
                          : "border-border hover:border-accent/40"
                      }`}
                    >
                      <div className="h-20 overflow-hidden">
                        <img
                          src={typeImages[t.id]}
                          alt={t.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className={`px-3 py-2.5 ${floorType === t.id ? "bg-accent/5" : "bg-background"}`}>
                        <p className={`text-[11px] font-body font-bold ${floorType === t.id ? "text-accent" : "text-foreground"}`}>
                          {t.name.replace(" Flooring", "").replace(" & ", "/")}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Design */}
            {currentStep === 3 && (
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  Pick a design — {selectedFloorType?.name || ""}
                </h3>
                <p className="text-sm font-body text-muted-foreground mb-6">
                  Filter by shade and select your preferred design.
                </p>
                <DesignSelector
                  flooringType={floorType}
                  selectedDesign={selectedDesign}
                  onSelect={setSelectedDesign}
                />
              </div>
            )}

            {/* Step 4: Package */}
            {currentStep === 4 && (
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">Select your package</h3>
                <p className="text-sm font-body text-muted-foreground mb-6">Choose a tier that fits your quality and budget.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packageTiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setPackageTier(tier.id)}
                      className={`text-left rounded-xl p-5 transition-all border-2 ${
                        packageTier === tier.id
                          ? "border-accent shadow-luxury bg-accent/5"
                          : "border-border bg-background hover:border-accent/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-accent">{tier.name.charAt(0)}</span>
                        <div>
                          <p className={`font-display font-bold text-base ${packageTier === tier.id ? "text-accent" : "text-foreground"}`}>
                            {tier.name}
                          </p>
                          <p className="text-[11px] font-body text-muted-foreground">{tier.description}</p>
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {tier.features.map((f) => (
                          <li key={f} className="text-[11px] font-body text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Area & Budget — Premium UI */}
            {currentStep === 5 && (
              <div className="space-y-10">
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-1">Set area & budget</h3>
                  <p className="text-sm font-body text-muted-foreground mb-6">Adjust to match your project size.</p>
                </div>

                {/* Area */}
                <div>
                  <label className="text-sm font-body font-semibold text-foreground mb-4 block">Area (sqft)</label>
                  <div className="bg-muted/30 border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-5 mb-6">
                      <button onClick={() => setArea(Math.max(50, area - 50))}
                        className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <div className="flex items-start gap-1 min-w-[130px] justify-center">
                        <input
                          type="number"
                          min={50}
                          max={5000}
                          value={area}
                          onChange={(e) => setArea(Math.max(50, Math.min(5000, Number(e.target.value))))}
                          className="w-[110px] text-center text-4xl font-bold text-foreground bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-sm font-medium text-muted-foreground mt-1.5">sq ft</span>
                      </div>
                      <button onClick={() => setArea(Math.min(5000, area + 50))}
                        className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                    <div className="relative" style={{ touchAction: "pan-y" }}>
                      <input
                        type="range"
                        min={50}
                        max={5000}
                        step={10}
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${sliderPct}%, hsl(var(--muted)) ${sliderPct}%, hsl(var(--muted)) 100%)`,
                          touchAction: "none",
                        }}
                      />
                      <div className="flex justify-between mt-1.5 text-[11px] text-muted-foreground font-body">
                        <span>50 sq ft</span><span>5,000 sq ft</span>
                      </div>
                    </div>
                    {/* Presets */}
                    <div className="flex justify-center gap-2 flex-wrap mt-5">
                      {areaPresets.map((p) => (
                        <button key={p} onClick={() => setArea(p)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                            area === p ? "bg-accent text-accent-foreground" : "bg-card border border-border text-foreground hover:border-accent/40"
                          }`}>{p.toLocaleString()}</button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-body font-semibold text-foreground mb-4 block">Budget per sqft (AED)</label>
                  <div className="bg-muted/30 border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-5 mb-6">
                      <button onClick={() => setBudget(Math.max(50, budget - 10))}
                        className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <div className="flex items-start gap-1 min-w-[130px] justify-center">
                        <span className="text-sm font-medium text-muted-foreground mt-1.5">AED</span>
                        <input
                          type="number"
                          min={50}
                          max={800}
                          step={10}
                          value={budget}
                          onChange={(e) => setBudget(Math.max(50, Math.min(800, Number(e.target.value))))}
                          className="w-[90px] text-center text-4xl font-bold text-foreground bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <button onClick={() => setBudget(Math.min(800, budget + 10))}
                        className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                    <div className="relative" style={{ touchAction: "pan-y" }}>
                      <input
                        type="range"
                        min={50}
                        max={800}
                        step={10}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${budgetPct}%, hsl(var(--muted)) ${budgetPct}%, hsl(var(--muted)) 100%)`,
                          touchAction: "none",
                        }}
                      />
                      <div className="flex justify-between mt-1.5 text-[11px] text-muted-foreground font-body">
                        <span>AED 50</span><span>AED 800</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-border bg-muted/30">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-semibold text-sm transition-all ${
              currentStep === 1
                ? "text-muted-foreground opacity-40 cursor-not-allowed"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="text-xs font-body text-muted-foreground">
            Step {currentStep} of 5
          </div>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canNext()}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-body font-bold text-sm transition-all ${
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-body font-bold text-sm gradient-accent text-accent-foreground hover:opacity-90 shadow-lg transition-all"
            >
              <CalcIcon className="w-4 h-4" /> Get Estimate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorWizard;
