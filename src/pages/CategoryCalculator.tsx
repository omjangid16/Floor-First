import { useState, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Minus, Plus,
  CheckCircle2, Shield, Truck, Award, Phone,
  MessageCircle, ChevronDown, ChevronUp, HelpCircle,
  Calendar, Clock, User, Mail, MapPin, Home, Smartphone,
  Palette, Layers, Ruler, Settings, ClipboardCheck
} from "lucide-react";
import { categories } from "@/data/categories";
import { packageTiers } from "@/data/packageTiers";
import { getCalculatorConfig } from "@/data/calculatorOptions";
import { getCategoryShades, type CategoryShade } from "@/data/categoryShades";
import { getPatternsByShadeId, type FlooringPattern } from "@/data/segmentData";
import { getPatternShades } from "@/data/patternShades";

const SQFT_PRESETS = [100, 250, 500, 1000, 2000];
const SQFT_MIN = 50;
const SQFT_MAX = 5000;
const SQFT_STEP = 50;
const SQM_MIN = 5;
const SQM_MAX = 465;
const SQM_STEP = 5;
const CONVERSION = 10.764;

const sqftToSqm = (sqft: number) => Math.round(sqft / CONVERSION);
const sqmToSqft = (sqm: number) => Math.round(sqm * CONVERSION);

const TOTAL_STEPS = 8;

const stepsMeta = [
  { id: 1, label: "Type", icon: <Palette className="w-4 h-4" /> },
  { id: 2, label: "Pattern", icon: <Layers className="w-4 h-4" /> },
  { id: 3, label: "Shade", icon: <Palette className="w-4 h-4" /> },
  { id: 4, label: "Grade", icon: <Layers className="w-4 h-4" /> },
  { id: 5, label: "Area", icon: <Ruler className="w-4 h-4" /> },
  { id: 6, label: "Options", icon: <Settings className="w-4 h-4" /> },
  { id: 7, label: "Schedule", icon: <Calendar className="w-4 h-4" /> },
  { id: 8, label: "Confirm", icon: <ClipboardCheck className="w-4 h-4" /> },
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
  min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; minLabel: string; maxLabel: string;
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
    const onMove = (ev: MouseEvent) => { if (dragging.current) onChange(valueFromX(ev.clientX)); };
    const onUp = () => { dragging.current = false; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [onChange, valueFromX]);

  return (
    <div className="mt-8 px-1" style={{ touchAction: "pan-y" }}>
      <div ref={trackRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onMouseDown={onMouseDown}
        className="relative w-full h-11 flex items-center cursor-pointer" role="slider" aria-valuemin={min} aria-valuemax={max} aria-valuenow={clampedValue}>
        <div className="absolute left-0 right-0 h-2 rounded-full bg-muted" />
        <div className="absolute left-0 h-2 rounded-full bg-accent transition-[width] duration-75" style={{ width: `${pct}%` }} />
        <div className="absolute w-6 h-6 rounded-full bg-accent shadow-lg border-2 border-accent-foreground -translate-x-1/2 transition-[left] duration-75" style={{ left: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-1 text-[11px] text-muted-foreground">
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );
};

const clampSqft = (val: number) => Math.max(SQFT_MIN, Math.min(SQFT_MAX, Math.round(val)));

const WHATSAPP_URL = "https://wa.me/971501234567?text=Hi%2C%20I%20need%20help%20with%20flooring";

const CategoryCalculator = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === categoryId);
  const config = categoryId ? getCalculatorConfig(categoryId) : null;
  const shades = categoryId ? getCategoryShades(categoryId) : [];

  const [step, setStep] = useState(1);
  const [selectedShade, setSelectedShade] = useState("");
  const [selectedPattern, setSelectedPattern] = useState<FlooringPattern | null>(null);
  const [selectedShadeOption, setSelectedShadeOption] = useState("");
  const [packageTier, setPackageTier] = useState(categoryId === "vinyl" ? "premium" : "standard");
  const [areaSqft, setAreaSqft] = useState(500);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scheduleData, setScheduleData] = useState({
    date: "", time: "", name: "", email: "", phone: "", address: "", unit: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [areaHelpOpen, setAreaHelpOpen] = useState(false);
  const [scheduleType, setScheduleType] = useState<"samples" | "visit">("samples");

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

  const displayArea = unit === "sqm" ? sqftToSqm(areaSqft) : areaSqft;
  const shade = shades.find((s) => s.id === selectedShade);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]);
  };

  const availablePatterns = selectedShade ? getPatternsByShadeId(selectedShade) : [];
  const availableShadeOptions = selectedPattern ? getPatternShades(selectedPattern.id) : [];

  const canNext = () => {
    switch (step) {
      case 1: return !!selectedShade;
      case 2: return !!selectedPattern;
      case 3: return !!selectedShadeOption;
      case 4: return !!packageTier;
      case 5: return areaSqft > 0;
      case 6: return true;
      case 7: return scheduleData.name.trim() !== "" && scheduleData.email.trim() !== "" && scheduleData.date !== "" && scheduleData.phone.trim().length >= 7;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS && canNext()) {
      if (step === 1) { setSelectedPattern(null); setSelectedShadeOption(""); }
      if (step === 2) { setSelectedShadeOption(""); }
      setStep((s) => s + 1);
    }
  };
  const handleBack = () => { if (step === 1) navigate(-1); else setStep((s) => s - 1); };

  const setAreaFromDisplay = (displayVal: number) => {
    const sqft = unit === "sqm" ? sqmToSqft(displayVal) : displayVal;
    setAreaSqft(clampSqft(sqft));
  };

  const adjustArea = (delta: number) => {
    const newDisplay = displayArea + delta;
    const sqft = unit === "sqm" ? sqmToSqft(newDisplay) : newDisplay;
    setAreaSqft(clampSqft(sqft));
  };

  const handleUnitSwitch = (newUnit: "sqft" | "sqm") => { setUnit(newUnit); };

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

  // Price calculation — sqm-based pricing
  const areaSqm = areaSqft / CONVERSION;
  const basePrices: Record<string, number> = { tile: 140, stone: 320, wood: 280, vinyl: 95, carpet: 110, outdoor: 130 };
  const basePrice = basePrices[categoryId!] || 150;
  const pkg = packageTiers.find((p) => p.id === packageTier);
  const materialCost = areaSqft * basePrice * (pkg?.priceMultiplier || 1);

  // Calculate options cost with proper units
  const optionsCost = selectedOptions.reduce((sum, id) => {
    const opt = config.additionalOptions.find((o) => o.id === id);
    if (!opt) return sum;
    if (opt.priceUnit === "per_door") return sum + opt.pricePerSqft * 4; // assume 4 doors
    if (opt.priceUnit === "linear_meter") return sum + opt.pricePerSqft * Math.sqrt(areaSqm) * 4; // perimeter estimate
    return sum + opt.pricePerSqft * areaSqm; // sqm based
  }, 0);

  const subtotal = materialCost + optionsCost;
  const discount = Math.round(subtotal * 0.1); // 10% first order
  const discountedSubtotal = subtotal - discount;
  const vat = Math.round(discountedSubtotal * 0.05);
  const totalEstimate = Math.round(discountedSubtotal + vat);

  // Price unit label helper
  const getPriceUnitLabel = (priceUnit?: string) => {
    if (priceUnit === "linear_meter") return "/linear m";
    if (priceUnit === "per_door") return "/door";
    return "/sqm";
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12">
        <button onClick={handleBack} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-foreground">{config.categoryName}</h1>
          <p className="text-[10px] text-muted-foreground">{config.categoryName} Calculator</p>
        </div>
      </div>

      {/* ═══ LINEAR PROGRESS BAR ═══ */}
      <div className="px-4 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12">
        <div className="py-4">
          <p className="text-xs text-muted-foreground mb-2">
            Step {step} of {TOTAL_STEPS} — <span className="font-semibold text-foreground">{stepsMeta[step - 1]?.label}</span>
          </p>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12 lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:items-start">
        <div className="px-4 lg:px-0 pb-28 lg:pb-8 mt-4">
          <div className="lg:bg-card lg:rounded-2xl lg:border lg:border-border lg:p-8 lg:shadow-luxury">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>

                {/* STEP 1: Shades / Designs */}
                {step === 1 && (
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
                      Select {config.categoryName} {config.shadeLabel}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">Choose from our curated collection</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {shades.map((s) => (
                        <button key={s.id} onClick={() => { setSelectedShade(s.id); setSelectedPattern(null); setSelectedShadeOption(""); }}
                          className={`group rounded-2xl overflow-hidden border-2 transition-all text-left ${
                            selectedShade === s.id ? "border-accent shadow-lg ring-2 ring-accent/20" : "border-border hover:border-accent/40"
                          }`}>
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedShade === s.id ? "bg-accent border-accent" : "bg-background/80 border-background/60"
                            }`}>
                              {selectedShade === s.id && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                            </div>
                          </div>
                          <div className="px-3 py-3 bg-card">
                            <p className={`text-sm font-bold leading-tight ${selectedShade === s.id ? "text-accent" : "text-foreground"}`}>{s.name}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{s.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Pattern Selection */}
                {step === 2 && (
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
                      Select Pattern
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">
                      Choose a pattern for {shades.find(s => s.id === selectedShade)?.name || config.categoryName}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {availablePatterns.map((p) => (
                        <button key={p.id} onClick={() => { setSelectedPattern(p); setSelectedShadeOption(""); }}
                          className={`group rounded-2xl overflow-hidden border-2 transition-all text-left ${
                            selectedPattern?.id === p.id ? "border-accent shadow-lg ring-2 ring-accent/20" : "border-border hover:border-accent/40"
                          }`}>
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedPattern?.id === p.id ? "bg-accent border-accent" : "bg-background/80 border-background/60"
                            }`}>
                              {selectedPattern?.id === p.id && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                            </div>
                          </div>
                          <div className="px-3 py-3 bg-card">
                            <p className={`text-sm font-bold leading-tight ${selectedPattern?.id === p.id ? "text-accent" : "text-foreground"}`}>{p.name}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{p.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Shade Selection */}
                {step === 3 && (
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">
                      Select Shade
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">
                      Choose a shade for {selectedPattern?.name || "your selection"}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {availableShadeOptions.map((shadeName) => (
                        <button key={shadeName} onClick={() => setSelectedShadeOption(shadeName)}
                          className={`group rounded-2xl overflow-hidden border-2 transition-all text-left ${
                            selectedShadeOption === shadeName ? "border-accent shadow-lg ring-2 ring-accent/20" : "border-border hover:border-accent/40"
                          }`}>
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img src={selectedPattern?.image || ""} alt={shadeName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedShadeOption === shadeName ? "bg-accent border-accent" : "bg-background/80 border-background/60"
                            }`}>
                              {selectedShadeOption === shadeName && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                            </div>
                            <p className={`absolute bottom-3 left-3 right-3 text-sm font-bold leading-tight ${selectedShadeOption === shadeName ? "text-accent" : "text-white"}`}>{shadeName}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Material Grade */}
                {step === 4 && (
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">Select Material Grade</h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">Choose the quality level that fits your needs</p>
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
                            </div>
                            <p className={`font-bold text-lg mb-1 ${selected ? "text-accent" : "text-foreground"}`}>{tier.name}</p>
                            <p className="text-xs text-muted-foreground mb-3">{tier.description}</p>
                            <span className="inline-block text-[11px] font-semibold bg-muted px-3 py-1 rounded-full text-muted-foreground">{tier.badge}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: Area */}
                {step === 5 && (
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">Enter Your Area</h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">Specify the total area to be covered</p>

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
                        <button onClick={() => adjustArea(unit === "sqm" ? -SQM_STEP : -SQFT_STEP)}
                          className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                          <Minus className="w-5 h-5 text-foreground" />
                        </button>
                        <div className="flex items-start justify-center gap-1 min-w-[140px]">
                          <input type="number" min={unit === "sqm" ? SQM_MIN : SQFT_MIN} max={unit === "sqm" ? SQM_MAX : SQFT_MAX}
                            value={displayArea}
                            onChange={(e) => { const raw = Number(e.target.value); if (!isNaN(raw)) setAreaFromDisplay(raw); }}
                            onBlur={() => setAreaFromDisplay(displayArea)}
                            className="w-[120px] text-center text-5xl font-bold text-foreground bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                          <span className="text-base font-medium text-muted-foreground mt-2 shrink-0">{unit === "sqft" ? "sq ft" : "sq m"}</span>
                        </div>
                        <button onClick={() => adjustArea(unit === "sqm" ? SQM_STEP : SQFT_STEP)}
                          className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                          <Plus className="w-5 h-5 text-foreground" />
                        </button>
                      </div>
                      <AreaSlider
                        min={unit === "sqm" ? SQM_MIN : SQFT_MIN} max={unit === "sqm" ? SQM_MAX : SQFT_MAX}
                        step={unit === "sqm" ? SQM_STEP : SQFT_STEP} value={displayArea}
                        onChange={setAreaFromDisplay}
                        minLabel={unit === "sqm" ? `${SQM_MIN} sq m` : `${SQFT_MIN} sq ft`}
                        maxLabel={unit === "sqm" ? `${SQM_MAX} sq m` : `${SQFT_MAX.toLocaleString()} sq ft`} />
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

                    {/* Area Help Section */}
                    <div className="mt-8">
                      <button onClick={() => setAreaHelpOpen(!areaHelpOpen)}
                        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-card border border-border text-left hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-accent" />
                          <span className="text-sm font-semibold text-foreground">How do I calculate area?</span>
                        </div>
                        {areaHelpOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </button>
                      <AnimatePresence>
                        {areaHelpOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="px-5 py-4 mt-2 rounded-2xl bg-card border border-border space-y-3">
                              <p className="text-sm text-foreground font-medium">Simple Formula</p>
                              <p className="text-xs text-muted-foreground">Measure the length and width of your room in feet, then multiply them together.</p>
                              <div className="bg-muted rounded-xl p-4 text-center">
                                <p className="text-sm font-bold text-foreground">Length (ft) x Width (ft) = Area (sq ft)</p>
                                <p className="text-xs text-muted-foreground mt-1">Example: 15 ft x 20 ft = 300 sq ft</p>
                              </div>
                              <p className="text-xs text-muted-foreground">For irregular rooms, divide the space into rectangles, calculate each, and add them together.</p>
                              <div className="bg-muted rounded-xl p-4 flex items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                  <Ruler className="w-5 h-5 text-accent" />
                                </div>
                                <p className="text-xs text-muted-foreground">Video tutorial coming soon</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* STEP 6: Additional Options */}
                {step === 6 && (
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">Additional Options</h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">Enhance your flooring project with these services</p>
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
                                <p className="text-sm font-bold text-accent whitespace-nowrap">+AED {opt.pricePerSqft}{getPriceUnitLabel(opt.priceUnit)}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Mobile Estimate Bar */}
                    <div className="lg:hidden bg-[hsl(var(--foreground))] text-background rounded-2xl mx-0 mt-8 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-sm">Price Estimate</span>
                        <span className="text-[10px] border border-background/30 rounded-full px-2 py-0.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" /> Transparent Pricing
                        </span>
                      </div>
                      <div className="space-y-2.5 text-sm mb-4">
                        <div className="flex justify-between"><span className="text-background/60">Material Cost</span><span className="font-semibold">AED {Math.round(materialCost).toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-background/60">Add-ons</span><span className="font-semibold">AED {Math.round(optionsCost).toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-background/60">Subtotal</span><span className="font-semibold">AED {Math.round(subtotal).toLocaleString()}</span></div>
                        <div className="flex justify-between text-accent"><span>First Order Discount (10%)</span><span className="font-semibold">- AED {discount.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-background/60">VAT (5%)</span><span className="font-semibold">AED {vat.toLocaleString()}</span></div>
                      </div>
                      <div className="flex justify-between items-center bg-background/10 rounded-xl px-4 py-3 mb-4">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-accent text-lg">AED {totalEstimate.toLocaleString()}</span>
                      </div>
                      {/* Warranty badges */}
                      <div className="flex justify-around pt-3 border-t border-background/20">
                        {[
                          { icon: <Shield className="w-4 h-4" />, label: "10 Year Warranty" },
                          { icon: <Award className="w-4 h-4" />, label: "Premium Quality" },
                          { icon: <Truck className="w-4 h-4" />, label: "Expert Install" },
                        ].map((b) => (
                          <div key={b.label} className="flex flex-col items-center gap-1 text-[9px] text-background/60">
                            <span className="text-accent">{b.icon}</span>{b.label}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-background/40 text-center mt-3">Note: Final quote based on selection & site condition.</p>
                    </div>
                  </div>
                )}

                {/* STEP 7: Schedule */}
                {step === 7 && (
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground text-center mb-1">Schedule a Visit</h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">Book a time for our floor advisor to visit you</p>

                    {/* Radio selection cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-lg mx-auto">
                      {[
                        { id: "samples" as const, label: "Order Samples with Site Visit", desc: "Get physical samples delivered to your location", price: "AED 49" },
                        { id: "visit" as const, label: "Schedule Visit Only", desc: "Expert consultation at your space", price: "AED 19" },
                      ].map((opt) => {
                        const sel = scheduleType === opt.id;
                        return (
                          <button key={opt.id} onClick={() => setScheduleType(opt.id)}
                            className={`flex items-start gap-3 text-left rounded-2xl p-5 border-2 transition-all ${
                              sel ? "border-accent bg-accent/5 shadow-md" : "border-border bg-card hover:border-accent/40"
                            }`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              sel ? "border-accent" : "border-muted-foreground/40"
                            }`}>
                              {sel && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className={`font-bold text-sm ${sel ? "text-accent" : "text-foreground"}`}>{opt.label}</p>
                                <span className="text-xs font-bold text-accent whitespace-nowrap">{opt.price}</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-[10px] text-muted-foreground/70 text-center mb-6 max-w-lg mx-auto">
                      Why Cost? For mutual commitment and respect for time, refundable upon order placement.
                    </p>

                    <div className="max-w-lg mx-auto space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-muted-foreground" /> Date <span className="text-destructive">*</span></label>
                          <input type="date" value={scheduleData.date}
                            onChange={(e) => handleScheduleChange("date", e.target.value)}
                            onBlur={() => setTouchedFields((p) => ({ ...p, date: true }))}
                            className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground text-sm outline-none transition-colors ${fieldBorderClass("date", scheduleData.date)}`} />
                          {isFieldInvalid("date", scheduleData.date) && <p className="text-destructive text-[11px] mt-1">Required</p>}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-muted-foreground" /> Time</label>
                          <input type="time" value={scheduleData.time}
                            onChange={(e) => handleScheduleChange("time", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-muted-foreground" /> Full Name <span className="text-destructive">*</span></label>
                        <input type="text" placeholder="Your name" value={scheduleData.name}
                          onChange={(e) => handleScheduleChange("name", e.target.value)}
                          onBlur={() => setTouchedFields((p) => ({ ...p, name: true }))}
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground text-sm outline-none placeholder:text-muted-foreground transition-colors ${fieldBorderClass("name", scheduleData.name)}`} />
                        {isFieldInvalid("name", scheduleData.name) && <p className="text-destructive text-[11px] mt-1">Required</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" /> Email <span className="text-destructive">*</span></label>
                        <input type="email" placeholder="your@email.com" value={scheduleData.email}
                          onChange={(e) => handleScheduleChange("email", e.target.value)}
                          onBlur={() => setTouchedFields((p) => ({ ...p, email: true }))}
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground text-sm outline-none placeholder:text-muted-foreground transition-colors ${fieldBorderClass("email", scheduleData.email)}`} />
                        {isFieldInvalid("email", scheduleData.email) && <p className="text-destructive text-[11px] mt-1">Required</p>}
                      </div>
                      {/* Mobile Number */}
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-muted-foreground" /> Mobile Number <span className="text-destructive">*</span></label>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 py-3 rounded-xl border-2 border-border bg-muted text-foreground text-sm font-semibold shrink-0">
                            +971
                          </div>
                          <input type="tel" placeholder="Enter your mobile number" value={scheduleData.phone}
                            onChange={(e) => handleScheduleChange("phone", e.target.value)}
                            onBlur={() => setTouchedFields((p) => ({ ...p, phone: true }))}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 bg-card text-foreground text-sm outline-none placeholder:text-muted-foreground transition-colors ${fieldBorderClass("phone", scheduleData.phone)}`} />
                        </div>
                        {isFieldInvalid("phone", scheduleData.phone) && <p className="text-destructive text-[11px] mt-1">Mobile number is required</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Address</label>
                        <input type="text" placeholder="Your address in Dubai" value={scheduleData.address}
                          onChange={(e) => handleScheduleChange("address", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground transition-colors" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-muted-foreground" /> Unit / Villa / Apartment</label>
                        <input type="text" placeholder="e.g. Villa 12, Apt 304" value={scheduleData.unit}
                          onChange={(e) => handleScheduleChange("unit", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-accent outline-none placeholder:text-muted-foreground transition-colors" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 8: Confirmation */}
                {step === 8 && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 shadow-md">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-bold text-xl md:text-2xl text-foreground mb-1">Confirmation</h3>
                      <p className="text-sm text-muted-foreground">Here's what to expect after you confirm.</p>
                    </div>
                    <div className="space-y-3 mb-8 max-w-lg mx-auto">
                      {["Our flooring expert will contact you", "Samples will be arranged if required", "Final on-site quote will be shared"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <p className="text-sm font-medium text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-card border border-border rounded-2xl p-5 mb-4 max-w-lg mx-auto">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Your Summary</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-muted-foreground">Category:</span> <span className="font-bold text-foreground">{config.categoryName}</span></div>
                        {shade && <div><span className="text-muted-foreground">Type:</span> <span className="font-bold text-foreground">{shade.name}</span></div>}
                        {selectedPattern && <div><span className="text-muted-foreground">Pattern:</span> <span className="font-bold text-foreground">{selectedPattern.name}</span></div>}
                        {selectedShadeOption && <div><span className="text-muted-foreground">Shade:</span> <span className="font-bold text-foreground">{selectedShadeOption}</span></div>}
                        <div><span className="text-muted-foreground">Grade:</span> <span className="font-bold text-foreground">{pkg?.name}</span></div>
                        <div><span className="text-muted-foreground">Area:</span> <span className="font-bold text-foreground">{areaSqft} sqft</span></div>
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="bg-card border border-border rounded-2xl p-5 mb-4 max-w-lg mx-auto">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold text-foreground">AED {Math.round(subtotal).toLocaleString()}</span></div>
                        <div className="flex justify-between text-accent"><span>First Order Discount (10%)</span><span className="font-semibold">- AED {discount.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">VAT (5%)</span><span className="font-semibold text-foreground">AED {vat.toLocaleString()}</span></div>
                        <div className="border-t border-border pt-2 flex justify-between items-center">
                          <span className="font-bold text-foreground">Total Estimate</span>
                          <span className="font-bold text-accent text-lg">AED {totalEstimate.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Feature badges */}
                    <div className="flex justify-center gap-6 mb-4 max-w-lg mx-auto">
                      {[
                        { icon: <Shield className="w-5 h-5" />, label: "10 Year Warranty" },
                        { icon: <Award className="w-5 h-5" />, label: "Premium Quality" },
                        { icon: <Truck className="w-5 h-5" />, label: "Expert Installation" },
                      ].map((b) => (
                        <div key={b.label} className="flex flex-col items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                          <span className="text-accent">{b.icon}</span>{b.label}
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-muted-foreground text-center mb-6 max-w-lg mx-auto">Note: Final quote based on selection & site condition.</p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                      <button onClick={() => navigate("/get-quote")}
                        className="flex-1 py-4 rounded-xl border-2 border-accent text-accent font-bold text-sm hover:bg-accent/5 transition-colors flex items-center justify-center gap-2">
                        Request Sample
                      </button>
                      <button onClick={() => navigate("/")}
                        className="flex-1 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" /> Confirm Request
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ═══ CONSULT FLOORING ADVISER ═══ */}
            <div className="mt-8">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">New to Flooring?</p>
                  <p className="text-sm font-bold text-foreground">Consult a Flooring Adviser</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          {step < TOTAL_STEPS && (
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
          <div className="bg-[hsl(var(--foreground))] text-background rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base">Price Estimate</h3>
              <span className="text-[10px] border border-background/30 rounded-full px-2.5 py-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" /> Transparent Pricing
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-background/60">Material Cost</span><span className="font-semibold">AED {Math.round(materialCost).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-background/60">Add-ons</span><span className="font-semibold">AED {Math.round(optionsCost).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-background/60">Subtotal</span><span className="font-semibold">AED {Math.round(subtotal).toLocaleString()}</span></div>
              <div className="flex justify-between text-accent"><span>First Order (10% Off)</span><span className="font-semibold">- AED {discount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-background/60">VAT (5%)</span><span className="font-semibold">AED {vat.toLocaleString()}</span></div>
              <div className="border-t border-background/20 pt-3">
                <div className="flex justify-between items-center bg-background/10 rounded-xl px-4 py-3">
                  <span className="font-bold text-sm">Total Estimate</span>
                  <span className="font-bold text-accent text-xl">AED {totalEstimate.toLocaleString()}</span>
                </div>
              </div>
            </div>
            {/* Badges */}
            <div className="mt-6 pt-5 border-t border-background/20 flex justify-around">
              {[
                { icon: <Shield className="w-5 h-5" />, label: "10 Year Warranty" },
                { icon: <Award className="w-5 h-5" />, label: "Premium Quality" },
                { icon: <Truck className="w-5 h-5" />, label: "Expert Install" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1.5 text-[10px] text-background/60">
                  <span className="text-accent">{badge.icon}</span>{badge.label}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-background/40 text-center mt-4">Note: Final quote based on selection & site condition.</p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {step < TOTAL_STEPS && (
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

      {step === TOTAL_STEPS && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between z-50">
          <button onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-accent text-accent-foreground hover:opacity-90 shadow-lg">
            <Phone className="w-4 h-4" /> Confirm Request
          </button>
        </div>
      )}
    </main>
  );
};

export default CategoryCalculator;
