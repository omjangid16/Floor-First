import { useState, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Minus, Plus,
  CheckCircle2, Shield, Truck, Award, Phone
} from "lucide-react";
import { categories } from "@/data/categories";
import { packageTiers } from "@/data/packageTiers";
import { getCalculatorConfig } from "@/data/calculatorOptions";
import { getCategoryShades, type CategoryShade } from "@/data/categoryShades";

const SQFT_PRESETS = [100, 250, 500, 1000, 2000];
const SQFT_MIN = 50;
const SQFT_MAX = 5000;
const SQFT_STEP = 50; // matches +/- button delta
const SQM_MIN = 5;
const SQM_MAX = 465;
const SQM_STEP = 5; // matches +/- button delta
const CONVERSION = 10.764;

/* Convert sqft↔sqm helpers */
const sqftToSqm = (sqft: number) => Math.round(sqft / CONVERSION);
const sqmToSqft = (sqm: number) => Math.round(sqm * CONVERSION);

const stepsMeta = [
  { id: 1, label: "Designs" },
  { id: 2, label: "Grade" },
  { id: 3, label: "Area" },
  { id: 4, label: "Options" },
  { id: 5, label: "Schedule" },
  { id: 6, label: "Confirm" },
];

const gradeBarStyles: Record<string, { color: string; width: string }> = {
  economy: { color: "bg-muted-foreground/40", width: "w-3/5" },
  standard: { color: "bg-accent/60", width: "w-4/5" },
  premium: { color: "bg-accent", width: "w-[90%]" },
  luxury: { color: "bg-accent", width: "w-full" },
};

/* ─── Custom touch-optimized Area Slider ─── */
const TOUCH_SLOP = 10;

interface AreaSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
}

const AreaSlider = ({ min, max, step, value, onChange, minLabel, maxLabel }: AreaSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const directionLocked = useRef<"h" | "v" | null>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const clampedValue = Math.max(min, Math.min(max, value));
  const pct = ((clampedValue - min) / (max - min)) * 100;

  const valueFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return clampedValue;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    return Math.round(raw / step) * step;
  }, [min, max, step, clampedValue]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    startPos.current = { x: t.clientX, y: t.clientY };
    directionLocked.current = null;
    dragging.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - startPos.current.x);
    const dy = Math.abs(t.clientY - startPos.current.y);

    if (!directionLocked.current) {
      if (dx < TOUCH_SLOP && dy < TOUCH_SLOP) return;
      directionLocked.current = dx > dy ? "h" : "v";
    }

    if (directionLocked.current === "v") return;

    e.preventDefault();
    dragging.current = true;
    onChange(valueFromX(t.clientX));
  }, [onChange, valueFromX]);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
    directionLocked.current = null;
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onChange(valueFromX(e.clientX));
    dragging.current = true;

    const onMove = (ev: MouseEvent) => {
      if (dragging.current) onChange(valueFromX(ev.clientX));
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [onChange, valueFromX]);

  return (
    <div className="mt-8 px-1" style={{ touchAction: "pan-y" }}>
      <div
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        className="relative w-full h-11 flex items-center cursor-pointer"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampedValue}
      >
        <div className="absolute left-0 right-0 h-2 rounded-full bg-muted" />
        <div
          className="absolute left-0 h-2 rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-accent shadow-md -translate-x-1/2"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[11px] text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

/* ─── Helper: clamp sqft to valid range ─── */
const clampSqft = (val: number) => Math.max(SQFT_MIN, Math.min(SQFT_MAX, Math.round(val)));

const CategoryCalculator = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === categoryId);
  const config = categoryId ? getCalculatorConfig(categoryId) : null;
  const shades = categoryId ? getCategoryShades(categoryId) : [];

  const [step, setStep] = useState(1);
  const [selectedShade, setSelectedShade] = useState("");
  const [packageTier, setPackageTier] = useState("standard");
  // SINGLE SOURCE OF TRUTH: always stored in sqft
  const [areaSqft, setAreaSqft] = useState(500);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scheduleData, setScheduleData] = useState({
    date: "", time: "", name: "", email: "", address: "", unit: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

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

  // Derived display value — never stored, always computed
  const displayArea = unit === "sqm" ? sqftToSqm(areaSqft) : areaSqft;
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
      case 3: return areaSqft > 0;
      case 4: return true;
      case 5: return scheduleData.name.trim() !== "" && scheduleData.email.trim() !== "" && scheduleData.date !== "";
      default: return false;
    }
  };

  const handleNext = () => { if (step < 6 && canNext()) setStep((s) => s + 1); };
  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
  };

  /* ── Area helpers: all write to areaSqft ── */
  const setAreaFromDisplay = (displayVal: number) => {
    const sqft = unit === "sqm" ? sqmToSqft(displayVal) : displayVal;
    setAreaSqft(clampSqft(sqft));
  };

  const adjustArea = (delta: number) => {
    // delta is in display units
    const newDisplay = displayArea + delta;
    const sqft = unit === "sqm" ? sqmToSqft(newDisplay) : newDisplay;
    setAreaSqft(clampSqft(sqft));
  };

  // Unit switch: no conversion needed — areaSqft stays the same!
  const handleUnitSwitch = (newUnit: "sqft" | "sqm") => {
    setUnit(newUnit);
  };

  /* ── Schedule field helpers ── */
  const handleScheduleChange = (field: string, value: string) => {
    setScheduleData((prev) => ({ ...prev, [field]: value }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const isFieldInvalid = (field: string, value: string) => {
    if (!touchedFields[field]) return false;
    return value.trim() === "";
  };

  const fieldBorderClass = (field: string, value: string) => {
    if (isFieldInvalid(field, value)) return "border-destructive focus:border-destructive";
    if (touchedFields[field] && value.trim() !== "") return "border-accent/40 focus:border-accent";
    return "border-border focus:border-accent";
  };

  // Price calculation
  const basePrices: Record<string, number> = {
    tile: 140, stone: 320, wood: 280, vinyl: 95, carpet: 110, outdoor: 130,
  };
  const basePrice = basePrices[categoryId!] || 150;
  const pkg = packageTiers.find((p) => p.id === packageTier);
  const materialCost = areaSqft * basePrice * (pkg?.priceMultiplier || 1);
  const installCost = selectedOptions.includes("standard-install") ? areaSqft * 15 : 0;
  const optionsCost = selectedOptions.reduce((sum, id) => {
    if (id === "standard-install") return sum;
    const opt = config.additionalOptions.find((o) => o.id === id);
    return sum + (opt ? opt.pricePerSqft * areaSqft : 0);
  }, 0);
  const subtotal = materialCost + installCost + optionsCost;
  const vat = Math.round(subtotal * 0.05);
  const totalEstimate = Math.round(subtotal + vat);

  // ─── STEP BAR ─────────────────────────────────────────────
  const StepBar = () => (
    <div className="flex items-center justify-center gap-0 py-4">
      {stepsMeta.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                done ? "bg-[hsl(var(--foreground))] text-background" : active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {done ? <Check className="w-4 h-4" /> : s.id}
              </div>
              <span className={`text-[9px] sm:text-[10px] mt-1 font-semibold ${
                active ? "text-accent" : done ? "text-foreground" : "text-muted-foreground"
              }`}>{s.label}</span>
            </div>
            {i < stepsMeta.length - 1 && (
              <div className={`w-4 sm:w-8 md:w-14 h-[2px] mx-0.5 sm:mx-1 md:mx-2 -mt-4 ${done ? "bg-[hsl(var(--foreground))]" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ─── ESTIMATE PANEL ───────────────────────────────────────
  const EstimatePanel = () => (
    <div className="bg-[hsl(var(--foreground))] text-background rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-base">Price Estimate</h3>
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

  // ─── MOBILE ESTIMATE BAR ──────────────────────────────────
  const MobileEstimateBar = () => (
    <div className="lg:hidden bg-[hsl(var(--foreground))] text-background rounded-2xl mx-0 mt-8 p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-sm">Price Estimate</span>
        <span className="text-[10px] border border-background/30 rounded-full px-2 py-0.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Transparent Pricing
        </span>
      </div>
      <div className="space-y-2.5 text-sm mb-4">
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
      </div>
      <div className="flex justify-between items-center bg-background/10 rounded-xl px-4 py-3">
        <span className="font-bold">Total</span>
        <span className="font-bold text-accent text-lg">AED {totalEstimate.toLocaleString()}</span>
      </div>
    </div>
  );

  // ─── STEP CONTENT ─────────────────────────────────────────
  const StepContent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {/* STEP 1: Shades / Designs with Images */}
        {step === 1 && (
          <div>
            <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
              Select {config.categoryName} {config.shadeLabel}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Choose from our curated collection
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
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
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedShade === s.id
                        ? "bg-accent border-accent"
                        : "bg-background/80 border-background/60"
                    }`}>
                      {selectedShade === s.id && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                    </div>
                  </div>
                  <div className="px-3 py-3 bg-card">
                    <p className={`text-sm font-bold leading-tight ${selectedShade === s.id ? "text-accent" : "text-foreground"}`}>
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
            <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
              Select Material Grade
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Choose the quality level that fits your needs
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
              {packageTiers.map((tier) => {
                const selected = packageTier === tier.id;
                const barStyle = gradeBarStyles[tier.id];
                return (
                  <button key={tier.id} onClick={() => setPackageTier(tier.id)}
                    className={`rounded-2xl p-5 border-2 transition-all text-left relative ${
                      selected ? "border-accent bg-accent/5 shadow-lg" : "border-border bg-card hover:border-accent/40"
                    }`}>
                    <div className="h-2 bg-muted rounded-full mb-4 overflow-hidden relative">
                      <div className={`h-full rounded-full ${barStyle.color} ${barStyle.width} transition-all`} />
                      <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                        selected ? "bg-accent border-accent" : "bg-card border-muted-foreground/30"
                      }`} style={{ right: tier.id === "luxury" ? "0" : tier.id === "premium" ? "10%" : tier.id === "standard" ? "20%" : "40%" }} />
                    </div>
                    <p className={`font-bold text-lg mb-1 ${selected ? "text-accent" : "text-foreground"}`}>{tier.name}</p>
                    <p className="text-xs text-muted-foreground mb-3">{tier.description}</p>
                    <span className="inline-block text-[11px] font-semibold bg-muted px-3 py-1 rounded-full text-muted-foreground">
                      {tier.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Area */}
        {step === 3 && (
          <div>
            <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
              Enter Your Area
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Specify the total area to be covered
            </p>

            {/* Unit toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-muted rounded-xl p-1">
                {(["sqft", "sqm"] as const).map((u) => (
                  <button key={u} onClick={() => handleUnitSwitch(u)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      unit === u ? "bg-[hsl(var(--foreground))] text-background shadow-sm" : "text-muted-foreground"
                    }`}>{u === "sqft" ? "Sq Ft" : "Sq Meter"}</button>
                ))}
              </div>
            </div>

            {/* Value display card */}
            <div className="bg-card border border-border rounded-2xl p-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-5">
                <button onClick={() => adjustArea(unit === "sqm" ? -5 : -50)}
                  className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                  <Minus className="w-5 h-5 text-foreground" />
                </button>
                <div className="flex items-start justify-center gap-1 min-w-[140px]">
                  <input
                    type="number"
                    min={unit === "sqm" ? SQM_MIN : SQFT_MIN}
                    max={unit === "sqm" ? SQM_MAX : SQFT_MAX}
                    value={displayArea}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      if (!isNaN(raw)) setAreaFromDisplay(raw);
                    }}
                    onBlur={() => setAreaFromDisplay(displayArea)}
                    className="w-[120px] text-center text-5xl font-bold text-foreground bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-base font-medium text-muted-foreground mt-2 shrink-0">
                    {unit === "sqft" ? "sq ft" : "sq m"}
                  </span>
                </div>
                <button onClick={() => adjustArea(unit === "sqm" ? 5 : 50)}
                  className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                  <Plus className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Slider */}
              <AreaSlider
                min={unit === "sqm" ? SQM_MIN : SQFT_MIN}
                max={unit === "sqm" ? SQM_MAX : SQFT_MAX}
                step={unit === "sqm" ? SQM_STEP : SQFT_STEP}
                value={displayArea}
                onChange={setAreaFromDisplay}
                minLabel={unit === "sqm" ? `${SQM_MIN} sq m` : `${SQFT_MIN} sq ft`}
                maxLabel={unit === "sqm" ? `${SQM_MAX} sq m` : `${SQFT_MAX.toLocaleString()} sq ft`}
              />
            </div>

            {/* Quick presets */}
            <div className="flex justify-center gap-2 flex-wrap mt-8">
              {SQFT_PRESETS.map((p) => {
                const displayVal = unit === "sqm" ? sqftToSqm(p) : p;
                const isSelected = areaSqft === p;
                return (
                  <button key={p} onClick={() => setAreaSqft(p)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isSelected ? "bg-accent text-accent-foreground" : "bg-card border border-border text-foreground hover:border-accent/40"
                    }`}>{displayVal.toLocaleString()}</button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Additional Options */}
        {step === 4 && (
          <div>
            <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
              Additional Options
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Enhance your flooring project with these services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-sm text-foreground truncate">{opt.label}</p>
                        <p className="text-sm font-bold text-accent whitespace-nowrap">+AED {opt.pricePerSqft}/sqft</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <MobileEstimateBar />
          </div>
        )}

        {/* STEP 5: Schedule */}
        {step === 5 && (
          <div>
            <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
              Schedule a Visit
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Book a time for our floor advisor to visit you
            </p>
            <div className="max-w-lg mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">Date <span className="text-destructive">*</span></label>
                  <input type="date" value={scheduleData.date}
                    onChange={(e) => handleScheduleChange("date", e.target.value)}
                    onBlur={() => setTouchedFields((p) => ({ ...p, date: true }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground text-sm outline-none transition-colors ${fieldBorderClass("date", scheduleData.date)}`} />
                  {isFieldInvalid("date", scheduleData.date) && <p className="text-destructive text-[11px] mt-1">Required</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">Time</label>
                  <input type="time" value={scheduleData.time}
                    onChange={(e) => handleScheduleChange("time", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Full Name <span className="text-destructive">*</span></label>
                <input type="text" placeholder="Your name" value={scheduleData.name}
                  onChange={(e) => handleScheduleChange("name", e.target.value)}
                  onBlur={() => setTouchedFields((p) => ({ ...p, name: true }))}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground text-sm outline-none placeholder:text-muted-foreground transition-colors ${fieldBorderClass("name", scheduleData.name)}`} />
                {isFieldInvalid("name", scheduleData.name) && <p className="text-destructive text-[11px] mt-1">Required</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Email <span className="text-destructive">*</span></label>
                <input type="email" placeholder="your@email.com" value={scheduleData.email}
                  onChange={(e) => handleScheduleChange("email", e.target.value)}
                  onBlur={() => setTouchedFields((p) => ({ ...p, email: true }))}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground text-sm outline-none placeholder:text-muted-foreground transition-colors ${fieldBorderClass("email", scheduleData.email)}`} />
                {isFieldInvalid("email", scheduleData.email) && <p className="text-destructive text-[11px] mt-1">Required</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Address</label>
                <input type="text" placeholder="Your address in Dubai" value={scheduleData.address}
                  onChange={(e) => handleScheduleChange("address", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Unit / Villa / Apartment</label>
                <input type="text" placeholder="e.g. Villa 12, Apt 304" value={scheduleData.unit}
                  onChange={(e) => handleScheduleChange("unit", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground transition-colors" />
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
              <h3 className="font-bold text-xl md:text-2xl text-foreground mb-1">
                What happens next?
              </h3>
              <p className="text-sm text-muted-foreground">Here's what to expect after you confirm.</p>
            </div>
            <div className="space-y-3 mb-8 max-w-lg mx-auto">
              {[
                "Our flooring expert will contact you",
                "Samples will be arranged if required",
                "Final on-site quote will be shared",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 mb-6 max-w-lg mx-auto">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Your Summary</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Category:</span> <span className="font-bold text-foreground">{config.categoryName}</span></div>
                {shade && <div><span className="text-muted-foreground">Design:</span> <span className="font-bold text-foreground">{shade.name}</span></div>}
                <div><span className="text-muted-foreground">Grade:</span> <span className="font-bold text-foreground">{pkg?.name}</span></div>
                <div><span className="text-muted-foreground">Area:</span> <span className="font-bold text-foreground">{areaSqft} sqft</span></div>
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

  // ─── MAIN LAYOUT ──────────────────────────────────────────
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12">
        <button onClick={handleBack} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-base font-bold text-foreground">{config.categoryName}</h1>
          <p className="text-[10px] text-muted-foreground">Step {step} of 6</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="px-2 sm:px-3 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12">
        <StepBar />
      </div>

      {/* Layout */}
      <div className="lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12 lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:items-start">
        <div className="px-4 lg:px-0 pb-28 lg:pb-8 mt-4">
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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between z-50 safe-area-bottom">
          <button onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={handleNext} disabled={!canNext()}
            className={`flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              canNext() ? "bg-accent text-accent-foreground hover:opacity-90 shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}>
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

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
