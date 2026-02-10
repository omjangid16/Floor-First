import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Home, Crown, Ruler, Settings,
  CheckCircle2, Check, Layers, Shield, Truck, Award
} from "lucide-react";
import { categories } from "@/data/categories";
import { packageTiers } from "@/data/packageTiers";
import { getCalculatorConfig } from "@/data/calculatorOptions";

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
  { id: "living", label: "Living Room", icon: "🛋️" },
  { id: "bedroom", label: "Bedroom", icon: "🛏️" },
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "bathroom", label: "Bathroom", icon: "🚿" },
  { id: "stairs", label: "Stairs", icon: "🪜" },
  { id: "outdoor", label: "Outdoor", icon: "🌳" },
  { id: "commercial", label: "Commercial", icon: "🏢" },
];

const areaPresets = [100, 250, 500, 1000, 2000];

const stepsMeta = [
  { id: 1, label: "Space", icon: <Home className="w-4 h-4" /> },
  { id: 2, label: "Flooring", icon: <Layers className="w-4 h-4" /> },
  { id: 3, label: "Grade", icon: <Crown className="w-4 h-4" /> },
  { id: 4, label: "Area", icon: <Ruler className="w-4 h-4" /> },
  { id: 5, label: "Options", icon: <Settings className="w-4 h-4" /> },
  { id: 6, label: "Confirm", icon: <CheckCircle2 className="w-4 h-4" /> },
];

const CategoryCalculator = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === categoryId);
  const config = categoryId ? getCalculatorConfig(categoryId) : null;

  // Intro screen state (subcategory selection, before calculator steps)
  const [subcategory, setSubcategory] = useState("");
  const [introComplete, setIntroComplete] = useState(false);

  // Calculator step state
  const [step, setStep] = useState(1);
  const [spaceType, setSpaceType] = useState("");
  const [packageTier, setPackageTier] = useState("standard");
  const [area, setArea] = useState(100);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!category || !config) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Category not found</p>
          <Link to="/" className="text-accent font-semibold">Go Home</Link>
        </div>
      </main>
    );
  }

  const areaInSqft = unit === "sqm" ? Math.round(area * 10.764) : area;
  const selectedSub = category.subcategories.find((s) => s.slug === subcategory);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    switch (step) {
      case 1: return !!spaceType;
      case 2: return true; // confirmation of already-selected flooring
      case 3: return !!packageTier;
      case 4: return area > 0;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => { if (step < 6) setStep((s) => s + 1); };
  const handleBack = () => {
    if (step === 1) {
      setIntroComplete(false); // go back to intro
    } else {
      setStep((s) => s - 1);
    }
  };

  // Price calculation
  const basePrices: Record<string, number> = {
    tile: 140, stone: 320, wood: 280, vinyl: 95, resin: 80, carpet: 110, outdoor: 130, rubber: 70, concrete: 90,
  };
  const basePrice = basePrices[categoryId!] || 150;
  const pkg = packageTiers.find((p) => p.id === packageTier);
  const materialCost = areaInSqft * basePrice * (pkg?.priceMultiplier || 1);
  const installCost = selectedOptions.includes("standard-install") ? areaInSqft * 15 : 0;
  const optionsCost = selectedOptions.reduce((sum, id) => {
    if (id === "standard-install") return sum;
    const opt = config.additionalOptions.find((o) => o.id === id);
    return sum + (opt ? opt.pricePerSqft * areaInSqft : 0);
  }, 0);
  const subtotal = materialCost + installCost + optionsCost;
  const vat = Math.round(subtotal * 0.05);
  const totalEstimate = Math.round(subtotal + vat);

  // ─── INTRO SCREEN (subcategory selection) ─────────────────────────
  if (!introComplete) {
    return (
      <main className="min-h-screen bg-background">
        <div className="px-4 pt-4 pb-2 flex items-center gap-3 lg:max-w-5xl lg:mx-auto lg:px-8">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-base font-bold text-foreground">Select {category.name}</h1>
            <p className="text-[10px] text-muted-foreground">Choose a type to start your estimate</p>
          </div>
        </div>

        <div className="px-4 lg:max-w-5xl lg:mx-auto lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {category.subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setSubcategory(sub.slug)}
                className={`group rounded-xl overflow-hidden border-2 transition-all text-left ${
                  subcategory === sub.slug ? "border-accent shadow-lg" : "border-border hover:border-accent/40"
                }`}
              >
                <div className="h-28 lg:h-36 overflow-hidden">
                  <img src={typeImages[categoryId!] || typeTile} alt={sub.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className={`px-3 py-3 ${subcategory === sub.slug ? "bg-accent/5" : "bg-card"}`}>
                  <p className={`text-xs font-bold ${subcategory === sub.slug ? "text-accent" : "text-foreground"}`}>{sub.name}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Continue button */}
          <div className="mt-6">
            <button
              onClick={() => { if (subcategory) setIntroComplete(true); }}
              disabled={!subcategory}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                subcategory
                  ? "bg-accent text-accent-foreground hover:opacity-90 shadow-lg"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── STEP BAR ─────────────────────────────────────────────────────
  const StepBar = () => (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-1 py-2">
      {stepsMeta.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
              active ? "bg-accent text-accent-foreground" : done ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
            }`}>
              {done ? <Check className="w-3 h-3" /> : s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < stepsMeta.length - 1 && (
              <div className={`w-3 h-[2px] mx-0.5 rounded ${done ? "bg-accent" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ─── ESTIMATE PANEL (desktop sidebar) ─────────────────────────────
  const EstimatePanel = () => (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-luxury">
      <h3 className="font-bold text-base text-foreground mb-4">Price Estimate</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Material Cost</span>
          <span className="font-semibold text-foreground">AED {Math.round(materialCost).toLocaleString()}</span>
        </div>
        {installCost > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Installation</span>
            <span className="font-semibold text-foreground">AED {installCost.toLocaleString()}</span>
          </div>
        )}
        {optionsCost > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Add-ons</span>
            <span className="font-semibold text-foreground">AED {optionsCost.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">VAT (5%)</span>
          <span className="font-semibold text-foreground">AED {vat.toLocaleString()}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-bold text-foreground">Total Estimate</span>
          <span className="font-bold text-accent text-lg">AED {totalEstimate.toLocaleString()}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-5 space-y-2">
        {[
          { label: "Category", value: config.categoryName },
          selectedSub && { label: "Type", value: selectedSub.name },
          { label: "Grade", value: pkg?.name },
          { label: "Area", value: `${areaInSqft} sqft` },
        ].filter(Boolean).map((item: any) => (
          <div key={item.label} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-semibold text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-6 pt-5 border-t border-border space-y-3">
        {[
          { icon: <Shield className="w-4 h-4" />, label: "5 Year Warranty" },
          { icon: <Award className="w-4 h-4" />, label: "Premium Quality" },
          { icon: <Truck className="w-4 h-4" />, label: "Free Delivery" },
        ].map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-accent">{badge.icon}</span>
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );

  // ─── STEP CONTENT ─────────────────────────────────────────────────
  const StepContent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {/* STEP 1: Space */}
        {step === 1 && (
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">Where is this for?</h3>
            <p className="text-sm text-muted-foreground mb-5">Select the space for your flooring project.</p>
            <div className="grid grid-cols-2 gap-3">
              {spaceTypes.map((s) => (
                <button key={s.id} onClick={() => setSpaceType(s.id)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                    spaceType === s.id ? "border-accent bg-accent/5 shadow-md" : "border-border bg-card hover:border-accent/40"
                  }`}>
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`text-sm font-semibold ${spaceType === s.id ? "text-accent" : "text-foreground"}`}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Flooring (confirmation) */}
        {step === 2 && (
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">Your Flooring Selection</h3>
            <p className="text-sm text-muted-foreground mb-5">Confirm your category and type.</p>
            <div className="rounded-xl overflow-hidden border-2 border-accent shadow-lg">
              <div className="h-40 lg:h-52 overflow-hidden">
                <img src={typeImages[categoryId!] || typeTile} alt={selectedSub?.name || category.name}
                  className="w-full h-full object-cover" />
              </div>
              <div className="bg-accent/5 p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{category.name}</p>
                <p className="text-lg font-bold text-foreground">{selectedSub?.name || "—"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You've selected {selectedSub?.name} under {category.name}. Continue to choose your material grade.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Material Grade */}
        {step === 3 && (
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">Material Grade</h3>
            <p className="text-sm text-muted-foreground mb-5">Choose a quality tier that fits your budget.</p>
            <div className="grid grid-cols-1 gap-3">
              {packageTiers.map((tier) => (
                <button key={tier.id} onClick={() => setPackageTier(tier.id)}
                  className={`flex items-start gap-4 text-left rounded-xl p-4 border-2 transition-all ${
                    packageTier === tier.id ? "border-accent bg-accent/5 shadow-md" : "border-border bg-card hover:border-accent/40"
                  }`}>
                  <span className="text-2xl mt-0.5">{tier.icon}</span>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${packageTier === tier.id ? "text-accent" : "text-foreground"}`}>{tier.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{tier.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tier.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-[9px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{f}</span>
                      ))}
                    </div>
                  </div>
                  {packageTier === tier.id && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Area */}
        {step === 4 && (
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">Enter Your Area</h3>
            <p className="text-sm text-muted-foreground mb-5">Set the area size for accurate pricing.</p>

            {/* Unit toggle */}
            <div className="flex gap-2 mb-5">
              {(["sqft", "sqm"] as const).map((u) => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    unit === u ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}>{u === "sqft" ? "Sq Ft" : "Sq Meter"}</button>
              ))}
            </div>

            {/* Number input */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <input type="number" min={10} max={10000} value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-28 text-center text-2xl font-bold text-foreground bg-card border-2 border-border rounded-xl py-3 focus:border-accent outline-none" />
              <span className="text-sm text-muted-foreground font-medium">{unit === "sqft" ? "sqft" : "sqm"}</span>
            </div>

            {/* Slider */}
            <input type="range" min="10" max="5000" value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-[hsl(var(--accent))] h-2 rounded-full mb-2" />
            <div className="flex justify-between text-[10px] text-muted-foreground mb-5">
              <span>10</span><span>5,000</span>
            </div>

            {/* Quick chips */}
            <div className="flex gap-2">
              {areaPresets.map((p) => (
                <button key={p} onClick={() => setArea(p)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                    area === p ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-accent/10"
                  }`}>{p.toLocaleString()}</button>
              ))}
            </div>

            {/* Mobile live price */}
            <div className="lg:hidden mt-6 bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Estimated Total</p>
              <p className="text-2xl font-bold text-accent">AED {totalEstimate.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{pkg?.name} grade · {areaInSqft} sqft</p>
            </div>
          </div>
        )}

        {/* STEP 5: Additional Options */}
        {step === 5 && (
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">Additional Options</h3>
            <p className="text-sm text-muted-foreground mb-5">Enhance your flooring project with these services.</p>
            <div className="space-y-3">
              {config.additionalOptions.map((opt) => {
                const sel = selectedOptions.includes(opt.id);
                return (
                  <button key={opt.id} onClick={() => toggleOption(opt.id)}
                    className={`w-full flex items-center gap-3 text-left rounded-xl p-4 border-2 transition-all ${
                      sel ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/40"
                    }`}>
                    <span className="text-xl">{opt.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${sel ? "text-accent" : "text-foreground"}`}>{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-foreground">+AED {opt.pricePerSqft}/sqft</p>
                      {sel && (
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-1 ml-auto">
                          <Check className="w-3 h-3 text-accent-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Mobile estimate */}
            <div className="lg:hidden mt-6 bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Updated Estimate</p>
              <p className="text-2xl font-bold text-accent">AED {totalEstimate.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation */}
        {step === 6 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-1">What to expect next?</h3>
              <p className="text-sm text-muted-foreground">Here's what happens after you confirm.</p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                "Floor Advisor will arrange your samples",
                "He will visit you and advise",
                "Share actual quote",
                "Confirmation",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="bg-muted rounded-xl p-4 mb-6">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Your Summary</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Category:</span> <span className="font-bold text-foreground">{config.categoryName}</span></div>
                {selectedSub && <div><span className="text-muted-foreground">Type:</span> <span className="font-bold text-foreground">{selectedSub.name}</span></div>}
                <div><span className="text-muted-foreground">Grade:</span> <span className="font-bold text-foreground">{pkg?.name}</span></div>
                <div><span className="text-muted-foreground">Area:</span> <span className="font-bold text-foreground">{areaInSqft} sqft</span></div>
                <div><span className="text-muted-foreground">Estimate:</span> <span className="font-bold text-accent">AED {totalEstimate.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate("/")}
                className="flex-1 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity">
                Get Final Quote
              </button>
              <button onClick={() => navigate("/")}
                className="flex-1 py-4 rounded-xl border-2 border-accent text-accent font-bold text-sm hover:bg-accent/5 transition-colors">
                Confirm Request
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  // ─── MAIN LAYOUT ──────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12">
        <button onClick={handleBack} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-base font-bold text-foreground">{config.categoryName} Calculator</h1>
          <p className="text-[10px] text-muted-foreground">Step {step} of 6</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="px-3 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12">
        <StepBar />
      </div>

      {/* Layout: Mobile = single column, Desktop = content + sticky estimate */}
      <div className="lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12 lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:items-start">
        {/* Main Content */}
        <div className="px-4 lg:px-0 pb-32 lg:pb-8 mt-4">
          <div className="lg:bg-card lg:rounded-2xl lg:border lg:border-border lg:p-8 lg:shadow-luxury">
            <StepContent />
          </div>

          {/* Desktop Navigation */}
          {step < 6 && (
            <div className="hidden lg:flex items-center justify-between mt-6">
              <button onClick={handleBack}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-all">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={handleNext} disabled={!canNext()}
                className={`flex items-center gap-1.5 px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                  canNext() ? "bg-accent text-accent-foreground hover:opacity-90 shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}>
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Desktop Sticky Estimate Panel */}
        <div className="hidden lg:block sticky top-24 mt-4">
          <EstimatePanel />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {step < 6 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between z-50">
          <button onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-[10px] text-muted-foreground">Step {step}/6</span>
          <button onClick={handleNext} disabled={!canNext()}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              canNext() ? "bg-accent text-accent-foreground hover:opacity-90 shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}>
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </main>
  );
};

export default CategoryCalculator;
