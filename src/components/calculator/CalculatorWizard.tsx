import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Calculator as CalcIcon, Home, Layers, Palette, Crown, Ruler, Check } from "lucide-react";
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

import calcSpaceLiving from "@/assets/calc-space-living.jpg";
import calcSpaceBedroom from "@/assets/calc-space-bedroom.jpg";
import calcSpaceKitchen from "@/assets/calc-space-kitchen.jpg";
import calcSpaceBathroom from "@/assets/calc-space-bathroom.jpg";
import calcSpaceOffice from "@/assets/calc-space-office.jpg";
import calcSpaceWarehouse from "@/assets/calc-space-warehouse.jpg";
import calcSpaceHotel from "@/assets/calc-space-hotel.jpg";
import calcSpaceGym from "@/assets/calc-space-gym.jpg";

const typeImages: Record<string, string> = {
  tile: typeTile, stone: typeStone, wood: typeWood, vinyl: typeVinyl,
  resin: typeResin, carpet: typeCarpet, outdoor: typeOutdoor, rubber: typeRubber,
};

const spaceTypes = [
  { id: "living", label: "Living Room", image: calcSpaceLiving },
  { id: "bedroom", label: "Bedroom", image: calcSpaceBedroom },
  { id: "kitchen", label: "Kitchen", image: calcSpaceKitchen },
  { id: "bathroom", label: "Bathroom", image: calcSpaceBathroom },
  { id: "office", label: "Office", image: calcSpaceOffice },
  { id: "warehouse", label: "Warehouse", image: calcSpaceWarehouse },
  { id: "hotel", label: "Hotel Lobby", image: calcSpaceHotel },
  { id: "gym", label: "Gym", image: calcSpaceGym },
];

const steps = [
  { id: 1, label: "Space", icon: <Home className="w-4 h-4" /> },
  { id: 2, label: "Type", icon: <Layers className="w-4 h-4" /> },
  { id: 3, label: "Design", icon: <Palette className="w-4 h-4" /> },
  { id: 4, label: "Package", icon: <Crown className="w-4 h-4" /> },
  { id: 5, label: "Estimate", icon: <Ruler className="w-4 h-4" /> },
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
  const [spaceType, setSpaceType] = useState("");
  const [floorType, setFloorType] = useState("");
  const [selectedDesign, setSelectedDesign] = useState<FlooringDesign | null>(null);
  const [packageTier, setPackageTier] = useState("");
  const [area, setArea] = useState(250);
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

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] lg:max-w-3xl lg:mx-auto lg:w-full">
      {/* Stepper */}
      <div className="px-5 pt-6 pb-4">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Step Content */}
      <div className="flex-1 px-5 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Space */}
            {currentStep === 1 && (
              <div>
                <h2 className="font-display font-bold text-xl text-foreground tracking-tight">Select Your Space</h2>
                <p className="text-sm font-body text-muted-foreground mt-1 mb-6">Where do you need flooring?</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {spaceTypes.map((s) => {
                    const isSelected = spaceType === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSpaceType(s.id)}
                        className={`group relative rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                          isSelected
                            ? "border-accent shadow-lg"
                            : "border-transparent shadow-luxury hover:shadow-luxury-lg"
                        }`}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={s.image}
                            alt={s.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        </div>

                        {/* Selection indicator */}
                        <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-accent border-accent"
                            : "bg-white/80 border-white/60 backdrop-blur-sm"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                        </div>

                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className={`text-sm font-body font-bold ${isSelected ? "text-white" : "text-white/90"}`}>
                            {s.label}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Flooring Type */}
            {currentStep === 2 && (
              <div>
                <h2 className="font-display font-bold text-xl text-foreground tracking-tight">Choose Flooring Type</h2>
                <p className="text-sm font-body text-muted-foreground mt-1 mb-6">Each type has unique designs and textures.</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {flooringTypes.map((t) => {
                    const isSelected = floorType === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setFloorType(t.id);
                          setSelectedDesign(null);
                        }}
                        className={`group relative rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                          isSelected
                            ? "border-accent shadow-lg"
                            : "border-transparent shadow-luxury hover:shadow-luxury-lg"
                        }`}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={typeImages[t.id]}
                            alt={t.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        </div>

                        {/* Selection indicator */}
                        <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-accent border-accent"
                            : "bg-white/80 border-white/60 backdrop-blur-sm"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                        </div>

                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className={`text-sm font-body font-bold text-white`}>
                            {t.name.replace(" Flooring", "").replace(" & ", " / ")}
                          </p>
                          <p className="text-[11px] font-body text-white/70 mt-0.5">
                            {t.id === "wood" ? "Engineered & Solid" : t.id === "vinyl" ? "SPC & LVT" : t.id === "tile" ? "Ceramic & Porcelain" : "Premium Range"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Design */}
            {currentStep === 3 && (
              <div>
                <h2 className="font-display font-bold text-xl text-foreground tracking-tight">Pick a Design</h2>
                <p className="text-sm font-body text-muted-foreground mt-1 mb-6">
                  Filter by shade and select your preferred finish.
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
                <h2 className="font-display font-bold text-xl text-foreground tracking-tight">Select Package</h2>
                <p className="text-sm font-body text-muted-foreground mt-1 mb-6">Choose quality and budget tier.</p>
                <div className="grid grid-cols-1 gap-3">
                  {packageTiers.map((tier) => {
                    const isSelected = packageTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setPackageTier(tier.id)}
                        className={`text-left rounded-2xl p-5 transition-all duration-300 border-2 ${
                          isSelected
                            ? "border-accent bg-accent/5 shadow-lg"
                            : "border-border bg-card hover:border-accent/30 shadow-luxury"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className={`font-display font-bold text-base ${isSelected ? "text-accent" : "text-foreground"}`}>
                              {tier.name}
                            </p>
                            <p className="text-xs font-body text-muted-foreground mt-0.5">{tier.description}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? "bg-accent border-accent" : "border-border"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tier.features.map((f) => (
                            <span key={f} className="text-[11px] font-body text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                              {f}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Area & Budget */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground tracking-tight">Set Area & Budget</h2>
                  <p className="text-sm font-body text-muted-foreground mt-1">Adjust to match your project size.</p>
                </div>

                {/* Area */}
                <div className="bg-card rounded-2xl border border-border p-5 shadow-luxury space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-body font-semibold text-foreground">Area</label>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-display font-bold text-accent">{area}</span>
                      <span className="text-xs font-body text-muted-foreground">sqft</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="5000"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--accent))] h-2 rounded-full appearance-none bg-border cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-body">
                    <span>50 sqft</span><span>5,000 sqft</span>
                  </div>

                  {/* Quick presets */}
                  <div className="flex flex-wrap gap-2">
                    {areaPresets.map((val) => (
                      <button
                        key={val}
                        onClick={() => setArea(val)}
                        className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                          area === val
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                        }`}
                      >
                        {val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="bg-card rounded-2xl border border-border p-5 shadow-luxury space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-body font-semibold text-foreground">Budget per sqft</label>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-body text-muted-foreground">AED</span>
                      <span className="text-2xl font-display font-bold text-accent">{budget}</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="800"
                    step="10"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--accent))] h-2 rounded-full appearance-none bg-border cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-body">
                    <span>AED 50</span><span>AED 800</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-t border-border px-5 py-4 shadow-[0_-4px_20px_-4px_hsl(220_15%_15%_/_0.08)]">
        <div className="lg:max-w-3xl lg:mx-auto lg:w-full flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all ${
              currentStep === 1
                ? "text-muted-foreground/40 cursor-not-allowed"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canNext()}
              className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-body font-bold text-sm transition-all ${
                canNext()
                  ? "gradient-accent text-accent-foreground shadow-lg hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCalculate}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-body font-bold text-sm gradient-accent text-accent-foreground shadow-lg hover:opacity-90 transition-all"
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
