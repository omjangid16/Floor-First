import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Minus, Plus,
  CheckCircle2, Layers, Palette, Box,
  Ruler, Crown, Wrench, CalendarDays, ClipboardCheck,
  ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone,
} from "lucide-react";
import {
  flooringCatalog,
  gradeOptions,
  accessoryOptions,
  type FlooringTypeOption,
  type PatternOption,
  type ShadeCategory,
  type DesignSample,
  type GradeOption,
  type AccessoryOption,
} from "@/data/spcLvtProducts";

/* ─── Constants ─── */
const SQFT_MIN = 50;
const SQFT_MAX = 5000;
const SQFT_STEP = 50;
const SQM_MIN = 5;
const SQM_MAX = 465;
const SQM_STEP = 5;
const CONVERSION = 10.764;
const SQFT_PRESETS = [100, 250, 500, 1000, 2000];
const DEFAULT_WASTE = 5;

const sqftToSqm = (sqft: number) => Math.round(sqft / CONVERSION);
const sqmToSqft = (sqm: number) => Math.round(sqm * CONVERSION);
const clampSqft = (val: number) => Math.max(SQFT_MIN, Math.min(SQFT_MAX, Math.round(val)));

const WHATSAPP_URL = "https://wa.me/971501234567?text=Hi%2C%20I%20need%20help%20with%20flooring";

const stepsMeta = [
  { id: 1, label: "Flooring Type", icon: <Layers className="w-4 h-4" /> },
  { id: 2, label: "Pattern", icon: <Palette className="w-4 h-4" /> },
  { id: 3, label: "Shade / Design", icon: <Box className="w-4 h-4" /> },
  { id: 4, label: "Grade", icon: <Crown className="w-4 h-4" /> },
  { id: 5, label: "Area", icon: <Ruler className="w-4 h-4" /> },
  { id: 6, label: "Accessories", icon: <Wrench className="w-4 h-4" /> },
  { id: 7, label: "Schedule", icon: <CalendarDays className="w-4 h-4" /> },
  { id: 8, label: "Confirmation", icon: <ClipboardCheck className="w-4 h-4" /> },
];

const TOTAL_STEPS = 8;

/* ─── Touch-safe Area Slider ─── */
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

/* ─── Selectable Card ─── */
const SelectCard = ({ selected, onClick, children, className = "", disabled = false }: {
  selected: boolean; onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean;
}) => (
  <button onClick={onClick} disabled={disabled}
    className={`relative text-left rounded-2xl p-5 border-2 transition-all ${
      disabled ? "opacity-50 cursor-not-allowed border-border bg-muted" :
      selected ? "border-accent bg-accent/5 shadow-lg ring-2 ring-accent/20" : "border-border bg-card hover:border-accent/40"
    } ${className}`}>
    <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
      selected ? "bg-accent border-accent" : "bg-muted border-border"
    }`}>
      {selected && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
    </div>
    {children}
  </button>
);

/* ═══════════════════════════════════════════════════ */
/*  SPC / LVT CALCULATOR PAGE                         */
/* ═══════════════════════════════════════════════════ */

const SpcLvtCalculator = () => {
  const navigate = useNavigate();

  /* State */
  const [step, setStep] = useState(1);
  const [flooringType, setFlooringType] = useState("");
  const [patternId, setPatternId] = useState("");
  const [shadeId, setShadeId] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [gradeId, setGradeId] = useState("standard");
  const [areaSqft, setAreaSqft] = useState(500);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [wastePct, setWastePct] = useState(DEFAULT_WASTE);
  const [areaHelpOpen, setAreaHelpOpen] = useState(false);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(["installation"]);
  const [skirtingLm, setSkirtingLm] = useState(20);
  const [doorCount, setDoorCount] = useState(2);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("morning");
  const [visitName, setVisitName] = useState("");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitNotes, setVisitNotes] = useState("");

  /* Derived data */
  const typeData: FlooringTypeOption | undefined = flooringCatalog.find((t) => t.id === flooringType);
  const patternData: PatternOption | undefined = typeData?.patterns.find((p) => p.id === patternId);
  const shadeData: ShadeCategory | undefined = patternData?.shades.find((s) => s.id === shadeId);
  const selectedSample: DesignSample | undefined = shadeData?.samples.find((s) => s.code === selectedCode);
  const selectedGrade: GradeOption | undefined = gradeOptions.find((g) => g.id === gradeId);

  /* Area helpers */
  const displayArea = unit === "sqm" ? sqftToSqm(areaSqft) : areaSqft;
  const setAreaFromDisplay = (displayVal: number) => {
    const sqft = unit === "sqm" ? sqmToSqft(displayVal) : displayVal;
    setAreaSqft(clampSqft(sqft));
  };
  const adjustArea = (delta: number) => {
    const newDisplay = displayArea + delta;
    const sqft = unit === "sqm" ? sqmToSqft(newDisplay) : newDisplay;
    setAreaSqft(clampSqft(sqft));
  };

  /* Calculation */
  const areaSqm = areaSqft / CONVERSION;
  const wasteArea = areaSqm * (wastePct / 100);
  const finalArea = areaSqm + wasteArea;
  const requiredBoxes = selectedSample?.boxCoverage ? Math.ceil(finalArea / selectedSample.boxCoverage) : null;
  const gradeMultiplier = selectedGrade?.priceMultiplier || 1;
  const materialCost = selectedSample ? Math.round(finalArea * selectedSample.pricePerSqm * gradeMultiplier) : 0;

  /* Accessory cost calculation */
  const calcAccessoryCost = () => {
    let total = 0;
    selectedAccessories.forEach((accId) => {
      const acc = accessoryOptions.find((a) => a.id === accId);
      if (!acc) return;
      if (acc.unit === "per sqm") total += acc.pricePerUnit * finalArea;
      else if (acc.unit === "per lm") total += acc.pricePerUnit * skirtingLm;
      else if (acc.unit === "per door") total += acc.pricePerUnit * doorCount;
    });
    return Math.round(total);
  };
  const accessoryCost = calcAccessoryCost();
  const totalCost = materialCost + accessoryCost;

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  /* Navigation */
  const canNext = () => {
    switch (step) {
      case 1: return !!flooringType;
      case 2: return !!patternId;
      case 3: return !!selectedCode;
      case 4: return !!gradeId;
      case 5: return areaSqft > 0;
      case 6: return true; // accessories are optional
      case 7: return true; // schedule is optional
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS && canNext()) setStep((s) => s + 1);
  };
  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
  };

  /* Reset downstream on change */
  const selectFlooring = (id: string) => {
    setFlooringType(id);
    setPatternId(""); setShadeId(""); setSelectedCode("");
  };
  const selectPattern = (id: string) => {
    setPatternId(id);
    setShadeId(""); setSelectedCode("");
  };
  const selectShade = (id: string) => {
    setShadeId(id);
    setSelectedCode("");
  };

  return (
    <main className="min-h-screen bg-background pb-32 lg:pb-8">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 lg:max-w-5xl lg:mx-auto lg:px-8">
        <button onClick={handleBack} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-foreground">SPC / LVT Calculator</h1>
          <p className="text-[10px] text-muted-foreground">Step {step} of {TOTAL_STEPS} — {stepsMeta[step - 1]?.label}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 lg:max-w-5xl lg:mx-auto lg:px-8">
        <div className="py-3">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full rounded-full bg-accent" initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.4, ease: "easeInOut" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:max-w-5xl lg:mx-auto lg:px-8 mt-2">
        {/* WhatsApp card */}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4 mb-6 hover:border-accent/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">Consult Flooring Adviser</p>
            <p className="text-[11px] text-muted-foreground">Chat on WhatsApp for expert help</p>
          </div>
          <Phone className="w-4 h-4 text-muted-foreground" />
        </a>

        <div className="bg-card border border-border rounded-2xl shadow-luxury overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
              className="p-5 md:p-8">

              {/* ─── STEP 1: Flooring Type ─── */}
              {step === 1 && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Flooring Type</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">Choose your flooring category</p>
                  <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                    {flooringCatalog.map((t) => (
                      <SelectCard key={t.id} selected={flooringType === t.id} onClick={() => selectFlooring(t.id)}>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                          <Layers className="w-6 h-6 text-accent" />
                        </div>
                        <p className="font-bold text-base text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 2: Pattern ─── */}
              {step === 2 && typeData && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Pattern</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">{typeData.name} — Choose your pattern style</p>
                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                    {typeData.patterns.map((p) => (
                      <SelectCard key={p.id} selected={patternId === p.id} onClick={() => selectPattern(p.id)}>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                          <Palette className="w-6 h-6 text-accent" />
                        </div>
                        <p className="font-bold text-sm text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{p.shades.length} shade{p.shades.length !== 1 ? "s" : ""} available</p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 3: Shade + Design Sample (combined) ─── */}
              {step === 3 && patternData && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Shade & Design</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {typeData?.name} → {patternData.name}
                  </p>

                  {/* Shade filter pills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <button
                      onClick={() => { setShadeId(""); setSelectedCode(""); }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        !shadeId ? "bg-accent text-accent-foreground border-accent" : "bg-background border-border text-foreground hover:border-accent/40"
                      }`}
                    >All Shades</button>
                    {patternData.shades.map((s) => (
                      <button key={s.id} onClick={() => { selectShade(s.id); }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                          shadeId === s.id ? "bg-accent text-accent-foreground border-accent" : "bg-background border-border text-foreground hover:border-accent/40"
                        }`}
                      >{s.name}</button>
                    ))}
                  </div>

                  {/* Design sample cards */}
                  <div className="space-y-3 max-w-lg mx-auto max-h-[400px] overflow-y-auto pr-1">
                    {(shadeId ? [patternData.shades.find((s) => s.id === shadeId)!] : patternData.shades).filter(Boolean).map((shade) => (
                      <div key={shade.id}>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">{shade.name}</p>
                        <div className="space-y-2">
                          {shade.samples.map((s) => (
                            <SelectCard key={s.code} selected={selectedCode === s.code}
                              onClick={() => { setShadeId(shade.id); setSelectedCode(s.code); }} className="p-4">
                              <div className="pr-8">
                                <p className="font-bold text-sm text-foreground">{s.name}</p>
                                <p className="text-xs text-muted-foreground mt-1 font-mono">{s.code}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-xs font-semibold text-accent">AED {s.pricePerSqm}/sqm</span>
                                  {s.boxCoverage && (
                                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                      <Box className="w-3 h-3" /> {s.boxCoverage} sqm/box
                                    </span>
                                  )}
                                </div>
                              </div>
                            </SelectCard>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 4: Grade ─── */}
              {step === 4 && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Grade</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">Choose the quality tier for your flooring</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {gradeOptions.map((g) => (
                      <SelectCard key={g.id} selected={gradeId === g.id} onClick={() => setGradeId(g.id)}>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                          <Crown className="w-6 h-6 text-accent" />
                        </div>
                        <p className="font-bold text-base text-foreground">{g.name}</p>
                        <p className="text-xs text-muted-foreground mt-2">{g.description}</p>
                        {g.priceMultiplier > 1 && (
                          <p className="text-[11px] text-accent font-semibold mt-2">+{Math.round((g.priceMultiplier - 1) * 100)}% material cost</p>
                        )}
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 5: Area ─── */}
              {step === 5 && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Enter Area Details</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">Specify total area to be covered</p>

                  {/* Unit toggle */}
                  <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-muted rounded-xl p-1">
                      {(["sqft", "sqm"] as const).map((u) => (
                        <button key={u} onClick={() => setUnit(u)}
                          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                            unit === u ? "bg-foreground text-background shadow-sm" : "text-muted-foreground"
                          }`}>{u === "sqft" ? "Sq Ft" : "Sq Meter"}</button>
                      ))}
                    </div>
                  </div>

                  {/* Value display */}
                  <div className="bg-background border border-border rounded-2xl p-8 max-w-md mx-auto">
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
                  <div className="flex justify-center gap-2 flex-wrap mt-6">
                    {SQFT_PRESETS.map((p) => {
                      const displayVal = unit === "sqm" ? sqftToSqm(p) : p;
                      const isSelected = areaSqft === p;
                      return (
                        <button key={p} onClick={() => setAreaSqft(p)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isSelected ? "bg-accent text-accent-foreground" : "bg-background border border-border text-foreground hover:border-accent/40"
                          }`}>{displayVal.toLocaleString()}</button>
                      );
                    })}
                  </div>

                  {/* Waste % */}
                  <div className="max-w-md mx-auto mt-8">
                    <label className="text-sm font-semibold text-foreground mb-2 block">Waste Allowance</label>
                    <div className="flex items-center gap-3">
                      <input type="range" min={0} max={15} step={1} value={wastePct}
                        onChange={(e) => setWastePct(Number(e.target.value))}
                        className="flex-1 accent-[hsl(var(--accent))] h-2 rounded-full" />
                      <span className="text-sm font-bold text-accent w-10 text-right">{wastePct}%</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">Recommended 5–10% for cuts & fitting</p>
                  </div>

                  {/* Area Help */}
                  <div className="mt-8 max-w-md mx-auto">
                    <button onClick={() => setAreaHelpOpen(!areaHelpOpen)}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-background border border-border text-left hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-accent" />
                        <span className="text-sm font-semibold text-foreground">How do I calculate area?</span>
                      </div>
                      {areaHelpOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    <AnimatePresence>
                      {areaHelpOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-5 py-4 mt-2 rounded-2xl bg-background border border-border space-y-3">
                            <p className="text-sm text-foreground font-medium">Simple Formula</p>
                            <p className="text-xs text-muted-foreground">Measure length × width in feet, then multiply.</p>
                            <div className="bg-muted rounded-xl p-4 text-center">
                              <p className="text-sm font-bold text-foreground">Length (ft) × Width (ft) = Area (sq ft)</p>
                              <p className="text-xs text-muted-foreground mt-1">Example: 15 ft × 20 ft = 300 sq ft</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* ─── STEP 6: Accessories / Installation ─── */}
              {step === 6 && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Accessories & Installation</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">Select additional services (optional)</p>
                  <div className="space-y-3 max-w-lg mx-auto">
                    {accessoryOptions.map((acc) => {
                      const isSelected = selectedAccessories.includes(acc.id);
                      return (
                        <button key={acc.id} onClick={() => toggleAccessory(acc.id)}
                          className={`w-full text-left rounded-2xl p-4 border-2 transition-all flex items-start gap-4 ${
                            isSelected ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/40"
                          }`}>
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected ? "bg-accent border-accent" : "bg-muted border-border"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-foreground">{acc.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{acc.description}</p>
                            <p className="text-xs font-semibold text-accent mt-1">AED {acc.pricePerUnit} {acc.unit}</p>
                          </div>
                        </button>
                      );
                    })}

                    {/* Skirting length input */}
                    {selectedAccessories.includes("skirting") && (
                      <div className="bg-background border border-border rounded-2xl p-4 ml-10">
                        <label className="text-sm font-semibold text-foreground mb-2 block">Skirting Length</label>
                        <div className="flex items-center gap-3">
                          <input type="number" min={1} max={500} value={skirtingLm}
                            onChange={(e) => setSkirtingLm(Number(e.target.value))}
                            className="w-20 text-right px-2 py-1.5 rounded-lg border border-border bg-background font-bold text-accent text-sm focus:ring-2 focus:ring-accent outline-none" />
                          <span className="text-xs text-muted-foreground">linear meters</span>
                        </div>
                      </div>
                    )}

                    {/* Door count input */}
                    {selectedAccessories.includes("door-trim") && (
                      <div className="bg-background border border-border rounded-2xl p-4 ml-10">
                        <label className="text-sm font-semibold text-foreground mb-2 block">Number of Doors</label>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setDoorCount(Math.max(1, doorCount - 1))}
                            className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                          <span className="text-lg font-bold text-foreground w-8 text-center">{doorCount}</span>
                          <button onClick={() => setDoorCount(Math.min(20, doorCount + 1))}
                            className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── STEP 7: Schedule a Visit ─── */}
              {step === 7 && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Schedule a Visit</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">Our expert will visit your site for precise measurement (optional)</p>
                  <div className="max-w-md mx-auto space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Your Name</label>
                      <input type="text" value={visitName} onChange={(e) => setVisitName(e.target.value)} placeholder="Full name"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Phone Number</label>
                      <input type="tel" value={visitPhone} onChange={(e) => setVisitPhone(e.target.value)} placeholder="+971 5X XXX XXXX"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Preferred Date</label>
                      <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Preferred Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "morning", label: "Morning", sub: "9 AM – 12 PM" },
                          { id: "afternoon", label: "Afternoon", sub: "12 – 4 PM" },
                          { id: "evening", label: "Evening", sub: "4 – 7 PM" },
                        ].map((t) => (
                          <button key={t.id} onClick={() => setVisitTime(t.id)}
                            className={`px-3 py-3 rounded-xl border-2 text-center transition-all ${
                              visitTime === t.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
                            }`}>
                            <p className={`text-sm font-semibold ${visitTime === t.id ? "text-accent" : "text-foreground"}`}>{t.label}</p>
                            <p className="text-[10px] text-muted-foreground">{t.sub}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Notes (optional)</label>
                      <textarea value={visitNotes} onChange={(e) => setVisitNotes(e.target.value)} placeholder="Any specific requirements..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent outline-none resize-none" />
                    </div>
                    <p className="text-[11px] text-muted-foreground text-center">You can skip this step and schedule later.</p>
                  </div>
                </div>
              )}

              {/* ─── STEP 8: Confirmation ─── */}
              {step === 8 && selectedSample && (
                <div>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground text-center">Confirmation</h3>
                    <p className="text-sm text-muted-foreground text-center">Your flooring estimate summary</p>
                  </div>

                  <div className="max-w-lg mx-auto space-y-4">
                    {/* Selection Details */}
                    <div className="bg-background border border-border rounded-2xl divide-y divide-border">
                      {[
                        { label: "Flooring Type", value: typeData?.name || "" },
                        { label: "Pattern", value: patternData?.name || "" },
                        { label: "Shade", value: shadeData?.name || "" },
                        { label: "Design Sample", value: selectedSample.name },
                        { label: "Sample Code", value: selectedSample.code, mono: true },
                        { label: "Grade", value: selectedGrade?.name || "" },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between px-5 py-3.5">
                          <span className="text-sm text-muted-foreground">{row.label}</span>
                          <span className={`text-sm font-semibold text-foreground ${row.mono ? "font-mono" : ""}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Area Breakdown */}
                    <div className="bg-background border border-border rounded-2xl divide-y divide-border">
                      {[
                        { label: "Entered Area", value: `${areaSqm.toFixed(1)} sqm (${areaSqft} sqft)` },
                        { label: "Waste %", value: `${wastePct}%` },
                        { label: "Waste Area", value: `${wasteArea.toFixed(1)} sqm` },
                        { label: "Final Required Area", value: `${finalArea.toFixed(1)} sqm`, accent: true },
                        ...(requiredBoxes !== null ? [{ label: `Required Boxes (${selectedSample.boxCoverage} sqm/box)`, value: `${requiredBoxes} boxes`, accent: true }] : []),
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between px-5 py-3.5">
                          <span className="text-sm text-muted-foreground">{row.label}</span>
                          <span className={`text-sm font-semibold ${row.accent ? "text-accent" : "text-foreground"}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Accessories */}
                    {selectedAccessories.length > 0 && (
                      <div className="bg-background border border-border rounded-2xl divide-y divide-border">
                        <div className="px-5 py-3 bg-muted/30">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Accessories & Installation</p>
                        </div>
                        {selectedAccessories.map((accId) => {
                          const acc = accessoryOptions.find((a) => a.id === accId);
                          if (!acc) return null;
                          let qty = finalArea;
                          if (acc.unit === "per lm") qty = skirtingLm;
                          if (acc.unit === "per door") qty = doorCount;
                          return (
                            <div key={accId} className="flex justify-between px-5 py-3.5">
                              <span className="text-sm text-muted-foreground">{acc.name}</span>
                              <span className="text-sm font-semibold text-foreground">AED {Math.round(acc.pricePerUnit * qty).toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Visit info */}
                    {visitName && visitPhone && (
                      <div className="bg-background border border-border rounded-2xl divide-y divide-border">
                        <div className="px-5 py-3 bg-muted/30">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Scheduled Visit</p>
                        </div>
                        {[
                          { label: "Name", value: visitName },
                          { label: "Phone", value: visitPhone },
                          ...(visitDate ? [{ label: "Date", value: visitDate }] : []),
                          { label: "Time", value: visitTime === "morning" ? "Morning (9 AM – 12 PM)" : visitTime === "afternoon" ? "Afternoon (12 – 4 PM)" : "Evening (4 – 7 PM)" },
                          ...(visitNotes ? [{ label: "Notes", value: visitNotes }] : []),
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between px-5 py-3.5">
                            <span className="text-sm text-muted-foreground">{row.label}</span>
                            <span className="text-sm font-semibold text-foreground">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total Estimate */}
                    <div className="bg-foreground text-background rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold">Cost Estimate</span>
                        <span className="text-xs border border-background/30 rounded-full px-2 py-0.5">Indicative</span>
                      </div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-background/60">Material ({selectedGrade?.name})</span>
                          <span className="font-semibold">AED {materialCost.toLocaleString()}</span>
                        </div>
                        {accessoryCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-background/60">Accessories / Services</span>
                            <span className="font-semibold">AED {accessoryCost.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center bg-background/10 rounded-xl px-4 py-3">
                        <span className="font-bold">Estimated Total</span>
                        <span className="font-bold text-accent text-lg">AED {totalCost.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-background/40 text-center mt-3">Final quote may vary based on site visit assessment.</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button onClick={() => { setStep(1); selectFlooring(""); }}
                        className="flex-1 py-3.5 rounded-xl border-2 border-border text-foreground font-semibold text-sm hover:border-accent/40 transition-colors">
                        Start Over
                      </button>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        className="flex-1 py-3.5 rounded-xl gradient-accent text-accent-foreground font-bold text-sm text-center hover:opacity-90 transition-opacity">
                        Get Final Quote
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ─── Bottom Navigation (hidden on confirmation) ─── */}
          {step < TOTAL_STEPS && (
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-t border-border bg-muted/30">
              <button onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-foreground hover:bg-secondary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="text-xs text-muted-foreground">
                Step {step} of {TOTAL_STEPS}
              </div>
              <button onClick={handleNext} disabled={!canNext()}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  canNext() ? "gradient-accent text-accent-foreground hover:opacity-90 shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}>
                {step === 7 ? "Confirm" : "Continue"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SpcLvtCalculator;
