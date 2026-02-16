import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Minus, Plus,
  CheckCircle2, Layers, Home, Palette, Box,
  Ruler, ClipboardCheck, ChevronDown, ChevronUp,
  HelpCircle, MessageCircle, Phone,
} from "lucide-react";
import {
  spcLvtCatalog,
  type ProductTypeOption,
  type PropertyTypeOption,
  type PatternOption,
  type ShadeCategory,
  type SpcLvtProduct,
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

const WHATSAPP_URL = "https://wa.me/971501234567?text=Hi%2C%20I%20need%20help%20with%20SPC%20LVT%20flooring";

const stepsMeta = [
  { id: 1, label: "Type" },
  { id: 2, label: "Property" },
  { id: 3, label: "Pattern" },
  { id: 4, label: "Shade" },
  { id: 5, label: "Product" },
  { id: 6, label: "Area" },
  { id: 7, label: "Summary" },
];

/* ─── Touch-safe Area Slider (reused from CategoryCalculator) ─── */
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
const SelectCard = ({ selected, onClick, children, className = "" }: {
  selected: boolean; onClick: () => void; children: React.ReactNode; className?: string;
}) => (
  <button onClick={onClick}
    className={`relative text-left rounded-2xl p-5 border-2 transition-all ${
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
  const [productType, setProductType] = useState<string>("");        // "spc" | "lvt"
  const [propertyType, setPropertyType] = useState<string>("");      // "residential" | "commercial"
  const [patternId, setPatternId] = useState<string>("");
  const [shadeId, setShadeId] = useState<string>("");
  const [selectedSku, setSelectedSku] = useState<string>("");
  const [areaSqft, setAreaSqft] = useState(500);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [wastePct, setWastePct] = useState(DEFAULT_WASTE);
  const [areaHelpOpen, setAreaHelpOpen] = useState(false);

  /* Derived data */
  const typeData: ProductTypeOption | undefined = spcLvtCatalog.find((t) => t.id === productType);
  const propData: PropertyTypeOption | undefined = typeData?.propertyTypes.find((p) => p.id === propertyType);
  const patternData: PatternOption | undefined = propData?.patterns.find((p) => p.id === patternId);
  const shadeData: ShadeCategory | undefined = patternData?.shades.find((s) => s.id === shadeId);
  const selectedProduct: SpcLvtProduct | undefined = shadeData?.products.find((p) => p.sku === selectedSku);

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
  const requiredBoxes = selectedProduct?.boxCoverage ? Math.ceil(finalArea / selectedProduct.boxCoverage) : null;
  const totalCost = selectedProduct ? Math.round(finalArea * selectedProduct.pricePerSqm) : 0;

  /* Navigation */
  const canNext = () => {
    switch (step) {
      case 1: return !!productType;
      case 2: return !!propertyType;
      case 3: return !!patternId;
      case 4: return !!shadeId;
      case 5: return !!selectedSku;
      case 6: return areaSqft > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 7 && canNext()) setStep((s) => s + 1);
  };
  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
  };

  /* Reset downstream on change */
  const selectType = (id: string) => {
    setProductType(id);
    setPropertyType(""); setPatternId(""); setShadeId(""); setSelectedSku("");
  };
  const selectProperty = (id: string) => {
    setPropertyType(id);
    setPatternId(""); setShadeId(""); setSelectedSku("");
  };
  const selectPattern = (id: string) => {
    setPatternId(id);
    setShadeId(""); setSelectedSku("");
  };
  const selectShade = (id: string) => {
    setShadeId(id);
    setSelectedSku("");
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
          <p className="text-[10px] text-muted-foreground">Step-by-step product selection</p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 lg:max-w-5xl lg:mx-auto lg:px-8">
        <div className="py-4">
          <p className="text-xs text-muted-foreground mb-2">
            Step {step} of 7 — <span className="font-semibold text-foreground">{stepsMeta[step - 1]?.label}</span>
          </p>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full rounded-full bg-accent" initial={false}
              animate={{ width: `${(step / 7) * 100}%` }} transition={{ duration: 0.4, ease: "easeInOut" }} />
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

              {/* ─── STEP 1: SPC or LVT ─── */}
              {step === 1 && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Product Type</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">Choose between SPC and LVT flooring</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {spcLvtCatalog.map((t) => (
                      <SelectCard key={t.id} selected={productType === t.id} onClick={() => selectType(t.id)}>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                          <Layers className="w-6 h-6 text-accent" />
                        </div>
                        <p className="font-bold text-lg text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t.id === "spc" ? "Rigid core, waterproof, click-lock" : "Flexible, glue-down, realistic look"}
                        </p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 2: Residential or Commercial ─── */}
              {step === 2 && typeData && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Property Type</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">{typeData.name} — Choose your space</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {typeData.propertyTypes.map((p) => (
                      <SelectCard key={p.id} selected={propertyType === p.id} onClick={() => selectProperty(p.id)}>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                          <Home className="w-6 h-6 text-accent" />
                        </div>
                        <p className="font-bold text-lg text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {p.id === "residential" ? "Homes, villas, apartments" : "Offices, retail, hospitality"}
                        </p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 3: Pattern ─── */}
              {step === 3 && propData && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Pattern</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {typeData?.name} → {propData.name}
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                    {propData.patterns.map((p) => (
                      <SelectCard key={p.id} selected={patternId === p.id} onClick={() => selectPattern(p.id)}>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                          <Palette className="w-6 h-6 text-accent" />
                        </div>
                        <p className="font-bold text-base text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{p.shades.length} shade{p.shades.length !== 1 ? "s" : ""} available</p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 4: Shade Category ─── */}
              {step === 4 && patternData && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Shade</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {typeData?.name} → {propData?.name} → {patternData.name}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                    {patternData.shades.map((s) => (
                      <SelectCard key={s.id} selected={shadeId === s.id} onClick={() => selectShade(s.id)} className="p-4">
                        <p className="font-bold text-sm text-foreground pr-6">{s.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">{s.products.length} product{s.products.length !== 1 ? "s" : ""}</p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 5: Exact Product (Name + SKU) ─── */}
              {step === 5 && shadeData && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Select Product</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {shadeData.name} — Choose exact product
                  </p>
                  <div className="space-y-3 max-w-lg mx-auto">
                    {shadeData.products.map((p) => (
                      <SelectCard key={p.sku} selected={selectedSku === p.sku} onClick={() => setSelectedSku(p.sku)} className="p-4">
                        <div className="pr-8">
                          <p className="font-bold text-sm text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">{p.sku}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs font-semibold text-accent">AED {p.pricePerSqm}/sqm</span>
                            {p.boxCoverage && (
                              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Box className="w-3 h-3" /> {p.boxCoverage} sqm/box
                              </span>
                            )}
                          </div>
                        </div>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── STEP 6: Area ─── */}
              {step === 6 && (
                <div>
                  <h3 className="font-bold text-xl text-foreground text-center mb-1">Enter Area Details</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">Specify total area to be covered</p>

                  {/* Unit toggle */}
                  <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-muted rounded-xl p-1">
                      {(["sqft", "sqm"] as const).map((u) => (
                        <button key={u} onClick={() => setUnit(u)}
                          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                            unit === u ? "bg-[hsl(var(--foreground))] text-background shadow-sm" : "text-muted-foreground"
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

              {/* ─── STEP 7: Summary ─── */}
              {step === 7 && selectedProduct && (
                <div>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground text-center">Calculation Summary</h3>
                    <p className="text-sm text-muted-foreground text-center">Your SPC / LVT flooring estimate</p>
                  </div>

                  <div className="max-w-lg mx-auto space-y-4">
                    {/* Selection Details */}
                    <div className="bg-background border border-border rounded-2xl divide-y divide-border">
                      {[
                        { label: "Product Type", value: typeData?.name || "" },
                        { label: "Property", value: propData?.name || "" },
                        { label: "Pattern", value: patternData?.name || "" },
                        { label: "Shade", value: shadeData?.name || "" },
                        { label: "Product Name", value: selectedProduct.name },
                        { label: "SKU Code", value: selectedProduct.sku, mono: true },
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
                        ...(requiredBoxes !== null ? [{ label: `Required Boxes (${selectedProduct.boxCoverage} sqm/box)`, value: `${requiredBoxes} boxes`, accent: true }] : []),
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between px-5 py-3.5">
                          <span className="text-sm text-muted-foreground">{row.label}</span>
                          <span className={`text-sm font-semibold ${row.accent ? "text-accent" : "text-foreground"}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Estimate */}
                    <div className="bg-[hsl(var(--foreground))] text-background rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold">Material Cost Estimate</span>
                        <span className="text-xs border border-background/30 rounded-full px-2 py-0.5">Indicative</span>
                      </div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-background/60">Price per sqm</span>
                          <span className="font-semibold">AED {selectedProduct.pricePerSqm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-background/60">Final Area</span>
                          <span className="font-semibold">{finalArea.toFixed(1)} sqm</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-background/10 rounded-xl px-4 py-3">
                        <span className="font-bold">Estimated Total</span>
                        <span className="font-bold text-accent text-lg">AED {totalCost.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-background/40 text-center mt-3">Installation and add-ons are not included. Final quote may vary.</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)}
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

          {/* ─── Bottom Navigation (hidden on summary) ─── */}
          {step < 7 && (
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-t border-border bg-muted/30">
              <button onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-foreground hover:bg-secondary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="text-xs text-muted-foreground">
                Step {step} of 7
              </div>
              <button onClick={handleNext} disabled={!canNext()}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  canNext() ? "gradient-accent text-accent-foreground hover:opacity-90 shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}>
                {step === 6 ? "Calculate" : "Next"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SpcLvtCalculator;
