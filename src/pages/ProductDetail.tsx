import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ShoppingCart, FileText, Calendar, Wrench, Check, Shield, Star,
  ChevronRight, Minus, Plus, Heart, Share2, Ruler, Palette, Layers
} from "lucide-react";
import { products, flooringTypes } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getAttributesForType } from "@/data/productAttributes";
import { getDesignsByType, shadeCategories, type FlooringDesign } from "@/data/flooringDesigns";

import productDetailVinyl from "@/assets/product-detail-vinyl.jpg";
import productDetailTile from "@/assets/product-detail-tile.jpg";
import productDetailWood from "@/assets/product-detail-wood.jpg";
import productDetailStone from "@/assets/product-detail-stone.jpg";
import productDetailCarpet from "@/assets/product-detail-carpet.jpg";
import productDetailOutdoor from "@/assets/product-detail-outdoor.jpg";
import productDetailResin from "@/assets/product-detail-resin.jpg";
import productDetailRubber from "@/assets/product-detail-rubber.jpg";

const detailImages: Record<string, string> = {
  tile: productDetailTile,
  stone: productDetailStone,
  wood: productDetailWood,
  vinyl: productDetailVinyl,
  resin: productDetailResin,
  carpet: productDetailCarpet,
  outdoor: productDetailOutdoor,
  rubber: productDetailRubber,
};

/* ── Score Bar ──────────────────────────────────────────────── */
const ScoreBar = ({ label, score, max = 10 }: { label: string; score: number; max?: number }) => (
  <div className="flex items-center gap-4">
    <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(score / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, hsl(var(--accent)), hsl(var(--burnt-orange-light)))` }}
      />
    </div>
    <span className="text-xs font-semibold text-foreground w-8 text-right">{score}/{max}</span>
  </div>
);

/* ── Design Swatch Card ────────────────────────────────────── */
const DesignSwatch = ({
  design,
  isSelected,
  onSelect,
}: {
  design: FlooringDesign;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <motion.button
    onClick={onSelect}
    whileTap={{ scale: 0.95 }}
    className={`group relative flex flex-col items-center gap-2 p-2 rounded-2xl transition-all duration-300 ${
      isSelected
        ? "ring-2 ring-accent bg-accent/5 shadow-luxury"
        : "hover:bg-secondary/60 hover:shadow-sm"
    }`}
  >
    <div
      className={`relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
        isSelected ? "shadow-luxury-lg ring-1 ring-accent/20" : "group-hover:shadow-md"
      }`}
      style={{ background: design.gradient }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 rounded-xl opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(${75 + Math.random() * 20}deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 3px)`,
        }}
      />
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-md"
        >
          <Check className="w-3 h-3 text-accent-foreground" />
        </motion.div>
      )}
    </div>
    <div className="text-center w-full">
      <p className={`text-[10px] leading-tight font-medium truncate ${
        isSelected ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
      }`}>
        {design.name}
      </p>
      <p className="text-[8px] text-muted-foreground truncate">{design.pattern}</p>
    </div>
  </motion.button>
);

/* ── Visual Attribute Selector ─────────────────────────────── */
const AttributeSelector = ({
  label,
  icon: Icon,
  options,
  selected,
  onSelect,
}: {
  label: string;
  icon: React.ElementType;
  options: { id: string; label: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-accent" />
      <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">
        {label}
      </h3>
      {selected && (
        <span className="ml-auto text-[10px] text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
          {options.find((o) => o.id === selected)?.label}
        </span>
      )}
    </div>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            whileTap={{ scale: 0.96 }}
            className={`relative px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
              isSelected
                ? "bg-foreground text-background shadow-md"
                : "bg-card text-foreground border border-border hover:border-accent/40 hover:shadow-sm"
            }`}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  </div>
);

/* ── Spec Item ─────────────────────────────────────────────── */
const SpecItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-xs font-semibold text-foreground">{value}</span>
  </div>
);

/* ── Main Component ────────────────────────────────────────── */
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);
  const [area, setArea] = useState(20);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [includeUnderlay, setIncludeUnderlay] = useState(false);
  const [includeSkirting, setIncludeSkirting] = useState(false);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [activeShadeFilter, setActiveShadeFilter] = useState("all");
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-accent font-medium hover:underline">← Back to Products</Link>
        </div>
      </main>
    );
  }

  const underlayPrice = includeUnderlay ? area * 8 : 0;
  const skirtingPrice = includeSkirting ? Math.ceil(Math.sqrt(area) * 4) * 15 : 0;
  const totalCost = product.pricePerSqft * area + (includeInstallation ? area * 25 : 0) + underlayPrice + skirtingPrice;

  const handleAddToCart = () => {
    addToCart(product, area, includeInstallation);
    toast({ title: "Added to Cart", description: `${product.name} (${area} sqft) added to your cart.` });
  };

  const handleBuyNow = () => {
    addToCart(product, area, includeInstallation);
    window.location.href = "/cart";
  };

  const handleSelectAttribute = (key: string, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const attributes = getAttributesForType(product.type);
  const floorType = flooringTypes.find((t) => t.id === product.type);
  const related = products.filter((p) => p.type === product.type && p.id !== product.id).slice(0, 4);

  // Designs for visual pattern/shade gallery
  const allDesigns = getDesignsByType(product.type);
  const filteredDesigns = activeShadeFilter === "all"
    ? allDesigns
    : allDesigns.filter((d) => d.shadeCategory === activeShadeFilter);

  // Map attribute keys to icons
  const attrIcons: Record<string, React.ElementType> = {
    size: Ruler, "slab-size": Ruler, "plank-width": Ruler, "plank-size": Ruler,
    "board-size": Ruler, "tile-size": Ruler, format: Ruler,
    finish: Palette, surface: Palette,
    thickness: Layers, "wear-layer": Layers,
    tone: Palette, material: Layers, "pile-type": Layers, system: Layers,
  };

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Breadcrumb */}
      <div className="container-luxury pt-4 pb-2">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          {floorType && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link to={`/products?type=${floorType.id}`} className="hover:text-foreground transition-colors">{floorType.name}</Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium truncate max-w-[120px]">{product.name}</span>
        </div>
      </div>

      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* ────────────────── LEFT: Image + Design Gallery ────────────────── */}
          <div className="lg:col-span-7 space-y-5">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden bg-card shadow-luxury-lg group"
            >
              <img
                src={detailImages[product.type] || productDetailTile}
                alt={product.name}
                className="w-full h-[320px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Floating actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-card transition-colors"
                >
                  <Heart className={`w-4.5 h-4.5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                </button>
                <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-card transition-colors">
                  <Share2 className="w-4.5 h-4.5 text-foreground" />
                </button>
              </div>
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="gradient-accent text-accent-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
              {/* Bottom gradient overlay with quick info */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-28 flex items-end">
                <div className="p-5 flex items-center gap-3">
                  {[
                    { icon: Shield, label: "Genuine" },
                    { icon: Star, label: "Premium" },
                    { icon: Wrench, label: "Expert Install" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md rounded-full px-3 py-1.5">
                      <Icon className="w-3 h-3 text-white" />
                      <span className="text-[10px] text-white font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Design & Pattern Gallery ──────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-luxury"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Design & Shade Options</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Select a design to preview pattern and tone</p>
                </div>
                {selectedDesign && (
                  <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full">
                    {allDesigns.find((d) => d.id === selectedDesign)?.name}
                  </span>
                )}
              </div>

              {/* Shade Filter Tabs */}
              <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide pb-1">
                {shadeCategories.map((cat) => {
                  const count = cat.id === "all"
                    ? allDesigns.length
                    : allDesigns.filter((d) => d.shadeCategory === cat.id).length;
                  if (count === 0 && cat.id !== "all") return null;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveShadeFilter(cat.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                        activeShadeFilter === cat.id
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.name} <span className="opacity-60">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Design Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShadeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2"
                >
                  {filteredDesigns.map((design) => (
                    <DesignSwatch
                      key={design.id}
                      design={design}
                      isSelected={selectedDesign === design.id}
                      onSelect={() => setSelectedDesign(design.id)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ── Specifications ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-luxury"
            >
              <h3 className="text-sm font-bold text-foreground mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <div>
                  <SpecItem label="Material" value={product.material} />
                  <SpecItem label="Finish" value={product.finish} />
                  <SpecItem label="Pattern" value={product.pattern} />
                  <SpecItem label="Warranty" value={product.warranty} />
                </div>
                <div>
                  <SpecItem label="Traffic" value={product.trafficSuitability || "Medium"} />
                  <SpecItem label="Installation" value={product.installationOption} />
                  <div className="pt-3 space-y-2.5">
                    <ScoreBar label="Durability" score={product.durabilityScore} />
                    <ScoreBar label="Maintenance" score={product.maintenanceScore} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ────────────────── RIGHT: Info + Calculator ────────────────── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:sticky lg:top-6 space-y-5 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-1 scrollbar-hide"
            >
              {/* Product Title Card */}
              <div className="bg-card rounded-2xl border border-border p-5 shadow-luxury">
                <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-2">{product.category}</p>
                <h1 className="text-xl md:text-2xl font-bold text-foreground leading-snug">{product.name}</h1>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{product.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-4 pt-4 border-t border-border/50">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">From</span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">{product.currency} {product.pricePerSqft}</span>
                  <span className="text-sm text-muted-foreground">/sqft</span>
                </div>

                {/* Use Cases */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {product.useCases.map((uc) => (
                    <span key={uc} className="text-[10px] bg-secondary text-muted-foreground px-2.5 py-1 rounded-full font-medium">
                      {uc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Attributes */}
              <div className="bg-card rounded-2xl border border-border p-5 shadow-luxury space-y-5">
                <h3 className="text-sm font-bold text-foreground">Select Options</h3>
                {attributes.map((attr) => (
                  <AttributeSelector
                    key={attr.key}
                    label={attr.label}
                    icon={attrIcons[attr.key] || Layers}
                    options={attr.options}
                    selected={selections[attr.key] || null}
                    onSelect={(val) => handleSelectAttribute(attr.key, val)}
                  />
                ))}
              </div>

              {/* ── Cost Calculator ─────────────────────────── */}
              <div className="bg-card rounded-2xl border border-border shadow-luxury overflow-hidden">
                <div className="p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Cost Calculator</h3>
                    <span className="text-[10px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {product.currency} {product.pricePerSqft}/sqft
                    </span>
                  </div>

                  {/* Area Input */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted-foreground">Coverage Area</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setArea(Math.max(5, area - 5))}
                          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-foreground" />
                        </button>
                        <span className="text-sm font-bold text-foreground min-w-[56px] text-center">{area} sqft</span>
                        <button
                          onClick={() => setArea(Math.min(500, area + 5))}
                          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-foreground" />
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="500"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-[hsl(var(--accent))]"
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                      <span>5 sqft</span><span>500 sqft</span>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground mb-2">Add-ons</p>
                    {[
                      { label: "Installation", detail: "+AED 25/sqft", checked: includeInstallation, onChange: setIncludeInstallation },
                      { label: "Underlay", detail: "+AED 8/sqft", checked: includeUnderlay, onChange: setIncludeUnderlay },
                      { label: "Skirting", detail: "+AED 15/lft", checked: includeSkirting, onChange: setIncludeSkirting },
                    ].map((addon) => (
                      <label key={addon.label} className="flex items-center justify-between py-2 px-3 rounded-xl bg-secondary/50 cursor-pointer group hover:bg-secondary transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all ${
                            addon.checked ? "bg-accent border-accent" : "border-border/80 group-hover:border-accent/40"
                          }`}>
                            {addon.checked && <Check className="w-2.5 h-2.5 text-accent-foreground" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={addon.checked}
                            onChange={(e) => addon.onChange(e.target.checked)}
                            className="sr-only"
                          />
                          <span className="text-xs text-foreground">{addon.label}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium">{addon.detail}</span>
                      </label>
                    ))}
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Flooring ({area} sqft)</span>
                      <span>AED {(product.pricePerSqft * area).toLocaleString()}</span>
                    </div>
                    {includeInstallation && (
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Installation</span>
                        <span>AED {(area * 25).toLocaleString()}</span>
                      </div>
                    )}
                    {includeUnderlay && (
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Underlay</span>
                        <span>AED {underlayPrice.toLocaleString()}</span>
                      </div>
                    )}
                    {includeSkirting && (
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Skirting</span>
                        <span>AED {skirtingPrice.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total + Actions */}
                <div className="bg-foreground p-5 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-background/70">Estimated Total</span>
                    <span className="text-2xl font-bold text-background">AED {totalCost.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={handleAddToCart}
                      className="gradient-accent text-accent-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="bg-background text-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-background/90 transition-colors text-xs"
                    >
                      Buy Now
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      to="/get-quote"
                      className="text-center border border-background/20 text-background/80 py-2 rounded-xl font-medium text-[11px] flex items-center justify-center gap-1.5 hover:bg-background/5 transition-colors"
                    >
                      <FileText className="w-3 h-3" /> Get Quote
                    </Link>
                    <Link
                      to="/get-quote"
                      className="text-center border border-background/20 text-background/80 py-2 rounded-xl font-medium text-[11px] flex items-center justify-center gap-1.5 hover:bg-background/5 transition-colors"
                    >
                      <Calendar className="w-3 h-3" /> Book Consult
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Related Products ────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">You May Also Like</h2>
              <Link to={`/products?type=${product.type}`} className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-luxury hover-lift border border-border"
                >
                  <div className="h-32 lg:h-40 overflow-hidden">
                    <img
                      src={detailImages[p.type] || productDetailTile}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[9px] text-accent font-bold uppercase tracking-wider mb-0.5">{p.category}</p>
                    <h3 className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">{p.name}</h3>
                    <p className="text-xs font-bold text-foreground mt-2">AED {p.pricePerSqft}<span className="text-muted-foreground font-normal">/sqft</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
