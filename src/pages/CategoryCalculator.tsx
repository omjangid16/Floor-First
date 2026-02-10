import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Crown, Ruler, Settings,
  CheckCircle2, Layers, Shield, Truck, Award, Calendar, Phone
} from "lucide-react";
import { categories } from "@/data/categories";
import { packageTiers } from "@/data/packageTiers";
import { getCalculatorConfig } from "@/data/calculatorOptions";
import { getCategoryShades, type CategoryShade } from "@/data/categoryShades";

const areaPresets = [100, 250, 500, 1000, 2000];

const stepsMeta = [
  { id: 1, label: "Shades" },
  { id: 2, label: "Grade" },
  { id: 3, label: "Area" },
  { id: 4, label: "Options" },
  { id: 5, label: "Schedule" },
  { id: 6, label: "Confirm" },
];

const CategoryCalculator = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === categoryId);
  const config = categoryId ? getCalculatorConfig(categoryId) : null;
  const shades = categoryId ? getCategoryShades(categoryId) : [];

  // State
  const [step, setStep] = useState(1);
  const [selectedShade, setSelectedShade] = useState("");
  const [packageTier, setPackageTier] = useState("standard");
  const [area, setArea] = useState(500);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scheduleData, setScheduleData] = useState({
    date: "", time: "", name: "", email: "", address: "", unit: "",
  });

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
  const shade = shades.find((s) => s.id === selectedShade);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    switch (step) {
      case 1: return !!selectedShade;
      case 2: return !!packageTier;
      case 3: return area > 0;
      case 4: return true;
      case 5: return scheduleData.name && scheduleData.email && scheduleData.date;
      default: return false;
    }
  };

  const handleNext = () => { if (step < 6 && canNext()) setStep((s) => s + 1); };
  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
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

  // ─── STEP BAR ─────────────────────────────────────────────────────
  const StepBar = () => (
    <div className="flex items-center justify-center gap-0 py-4">
      {stepsMeta.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                done ? "bg-[hsl(var(--foreground))] text-background" : active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {done ? <Check className="w-4 h-4" /> : s.id}
              </div>
              <span className={`text-[10px] mt-1.5 font-semibold ${
                active ? "text-accent" : done ? "text-foreground" : "text-muted-foreground"
              }`}>{s.label}</span>
            </div>
            {i < stepsMeta.length - 1 && (
              <div className={`w-8 md:w-14 h-[2px] mx-1 md:mx-2 -mt-4 ${done ? "bg-[hsl(var(--foreground))]" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ─── ESTIMATE PANEL (desktop sidebar) ─────────────────────────────
  const EstimatePanel = () => (
    <div className="bg-[hsl(var(--foreground))] text-background rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-base italic">Price Estimate</h3>
        <span className="text-[10px] border border-background/30 rounded-full px-2.5 py-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Transparent Pricing
        </span>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-background/60">Material Cost</span>
          <span className="font-semibold">AED {Math.round(materialCost).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-background/60">Installation</span>
          <span className="font-semibold">AED {Math.round(installCost + optionsCost).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-background/60">VAT (5%)</span>
          <span className="font-semibold">AED {vat.toLocaleString()}</span>
        </div>
        <div className="border-t border-background/20 pt-3">
          <div className="flex justify-between items-center bg-background/10 rounded-xl px-4 py-3">
            <span className="font-bold text-sm">Total Estimate</span>
            <span className="font-bold text-accent text-xl">AED {totalEstimate.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-6 pt-5 border-t border-background/20 flex justify-around">
        {[
          { icon: <Shield className="w-5 h-5" />, label: "10 Year Warranty" },
          { icon: <Award className="w-5 h-5" />, label: "Quality Assured" },
          { icon: <Truck className="w-5 h-5" />, label: "Free Delivery" },
        ].map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-1.5 text-[10px] text-background/60">
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
        {/* STEP 1: Shades / Variants */}
        {step === 1 && (
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-1">
              Choose Your {config.shadeLabel}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Choose from our {config.categoryName} collection
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {shades.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShade(s.id)}
                  className={`group rounded-2xl overflow-hidden border-2 transition-all text-left ${
                    selectedShade === s.id
                      ? "border-accent shadow-lg ring-2 ring-accent/20"
                      : "border-border hover:border-accent/40"
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className="w-full h-full"
                      style={{ background: s.gradient }}
                    />
                    {/* Radio indicator */}
                    <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedShade === s.id
                        ? "bg-accent border-accent"
                        : "bg-background/80 border-background/60"
                    }`}>
                      {selectedShade === s.id && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                    </div>
                  </div>
                  <div className="px-3 py-3 bg-card">
                    <p className={`text-sm font-bold ${selectedShade === s.id ? "text-accent" : "text-foreground"}`}>
                      {s.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Material Grade */}
        {step === 2 && (
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-1">
              Select Material Grade
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Choose a quality tier that fits your budget
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packageTiers.map((tier) => (
                <button key={tier.id} onClick={() => setPackageTier(tier.id)}
                  className={`flex items-start gap-4 text-left rounded-2xl p-5 border-2 transition-all ${
                    packageTier === tier.id ? "border-accent bg-accent/5 shadow-lg" : "border-border bg-card hover:border-accent/40"
                  }`}>
                  <span className="text-3xl mt-0.5">{tier.icon}</span>
                  <div className="flex-1">
                    <p className={`font-bold text-base ${packageTier === tier.id ? "text-accent" : "text-foreground"}`}>{tier.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tier.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
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

        {/* STEP 3: Area */}
        {step === 3 && (
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-1">
              Enter Your Area
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Specify the total area to be covered
            </p>

            {/* Unit toggle */}
            <div className="flex justify-center gap-1 mb-8">
              {(["sqft", "sqm"] as const).map((u) => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    unit === u ? "bg-[hsl(var(--foreground))] text-background" : "bg-muted text-muted-foreground"
                  }`}>{u === "sqft" ? "Sq Ft" : "Sq Meter"}</button>
              ))}
            </div>

            {/* Area display card */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-6 max-w-lg mx-auto">
              <div className="flex items-baseline justify-center gap-3 mb-6">
                <input type="number" min={10} max={10000} value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-32 text-center text-5xl font-bold text-foreground bg-transparent border-none outline-none" />
                <span className="text-lg text-muted-foreground font-medium">{unit === "sqft" ? "sq ft" : "sq m"}</span>
              </div>

              {/* Slider */}
              <input type="range" min="50" max="5000" value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[hsl(var(--accent))] h-2 rounded-full mb-2" />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>50 {unit === "sqft" ? "sq ft" : "sq m"}</span>
                <span>5000 {unit === "sqft" ? "sq ft" : "sq m"}</span>
              </div>
            </div>

            {/* Quick chips */}
            <div className="flex justify-center gap-2 flex-wrap">
              {areaPresets.map((p) => (
                <button key={p} onClick={() => setArea(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    area === p ? "bg-accent text-accent-foreground" : "bg-card border border-border text-foreground hover:border-accent/40"
                  }`}>{p.toLocaleString()} {unit === "sqft" ? "sq ft" : "sq m"}</button>
              ))}
            </div>

            {/* Mobile live price */}
            <div className="lg:hidden mt-8 bg-[hsl(var(--foreground))] text-background rounded-2xl p-5 text-center">
              <p className="text-[10px] text-background/60 uppercase tracking-wider mb-1">Estimated Total</p>
              <p className="text-3xl font-bold text-accent">AED {totalEstimate.toLocaleString()}</p>
              <p className="text-[11px] text-background/60 mt-1">{pkg?.name} grade · {areaInSqft} sqft</p>
            </div>
          </div>
        )}

        {/* STEP 4: Additional Options */}
        {step === 4 && (
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-1">
              Additional Options
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Enhance your flooring project with these services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.additionalOptions.map((opt) => {
                const sel = selectedOptions.includes(opt.id);
                return (
                  <button key={opt.id} onClick={() => toggleOption(opt.id)}
                    className={`flex items-start gap-3 text-left rounded-2xl p-5 border-2 transition-all ${
                      sel ? "border-accent bg-accent/5 shadow-md" : "border-border bg-card hover:border-accent/40"
                    }`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      sel ? "bg-accent border-accent" : "border-muted-foreground/40"
                    }`}>
                      {sel && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-bold text-sm ${sel ? "text-foreground" : "text-foreground"}`}>{opt.label}</p>
                        <p className="text-sm font-bold text-accent">+AED {opt.pricePerSqft}/sq ft</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile estimate */}
            <div className="lg:hidden mt-8 bg-[hsl(var(--foreground))] text-background rounded-2xl p-5 text-center">
              <p className="text-[10px] text-background/60 uppercase tracking-wider mb-1">Updated Estimate</p>
              <p className="text-3xl font-bold text-accent">AED {totalEstimate.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* STEP 5: Schedule */}
        {step === 5 && (
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-1">
              Schedule a Visit
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Book a time for our floor advisor to visit you
            </p>
            <div className="max-w-lg mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">Date</label>
                  <input type="date" value={scheduleData.date}
                    onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">Time</label>
                  <input type="time" value={scheduleData.time}
                    onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Full Name</label>
                <input type="text" placeholder="Your name" value={scheduleData.name}
                  onChange={(e) => setScheduleData({ ...scheduleData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Email</label>
                <input type="email" placeholder="your@email.com" value={scheduleData.email}
                  onChange={(e) => setScheduleData({ ...scheduleData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Address</label>
                <input type="text" placeholder="Your address in Dubai" value={scheduleData.address}
                  onChange={(e) => setScheduleData({ ...scheduleData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Unit / Villa / Apartment</label>
                <input type="text" placeholder="e.g. Villa 12, Apt 304" value={scheduleData.unit}
                  onChange={(e) => setScheduleData({ ...scheduleData, unit: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation */}
        {step === 6 && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-1">
                What to expect next?
              </h3>
              <p className="text-sm text-muted-foreground">Here's what happens after you confirm.</p>
            </div>
            <div className="space-y-3 mb-8 max-w-lg mx-auto">
              {[
                "Floor Advisor will arrange your samples",
                "He will visit you and advise",
                "Share actual quote",
                "Confirmation",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="bg-card border border-border rounded-2xl p-5 mb-6 max-w-lg mx-auto">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Your Summary</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Category:</span> <span className="font-bold text-foreground">{config.categoryName}</span></div>
                {shade && <div><span className="text-muted-foreground">Shade:</span> <span className="font-bold text-foreground">{shade.name}</span></div>}
                <div><span className="text-muted-foreground">Grade:</span> <span className="font-bold text-foreground">{pkg?.name}</span></div>
                <div><span className="text-muted-foreground">Area:</span> <span className="font-bold text-foreground">{areaInSqft} sqft</span></div>
                <div className="col-span-2"><span className="text-muted-foreground">Estimate:</span> <span className="font-bold text-accent text-base">AED {totalEstimate.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <button onClick={() => navigate("/")}
                className="flex-1 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Get Final Quote
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

          {/* Desktop CTA for step 5 */}
          {step === 5 && (
            <div className="hidden lg:flex justify-end mt-4">
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
          <button onClick={handleNext} disabled={!canNext()}
            className={`flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              canNext() ? "bg-accent text-accent-foreground hover:opacity-90 shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}>
            {step === 5 ? "Continue" : "Continue"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Get Final Quote on step 6 */}
      {step === 6 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between z-50">
          <button onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-accent text-accent-foreground hover:opacity-90 shadow-lg">
            <Phone className="w-4 h-4" /> Get Final Quote
          </button>
        </div>
      )}
    </main>
  );
};

export default CategoryCalculator;
