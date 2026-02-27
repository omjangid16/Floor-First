import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, FileText, Calendar, Wrench, Check, Shield, Star } from "lucide-react";
import { products, flooringTypes } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getAttributesForType } from "@/data/productAttributes";

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
  <div>
    <div className="flex justify-between text-sm mb-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{score}/{max}</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(score / max) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full gradient-accent rounded-full"
      />
    </div>
  </div>
);

/* ── Spec Card ──────────────────────────────────────────────── */
const SpecCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-secondary/50 border border-border rounded-xl p-4">
    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
    <p className="font-semibold text-foreground text-sm">{value}</p>
  </div>
);

/* ── Attribute Selector ────────────────────────────────────── */
const AttributeSelector = ({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { id: string; label: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-heading font-bold tracking-wide text-foreground uppercase">
        {label}
      </h3>
      {selected && (
        <span className="text-xs font-body text-muted-foreground">
          {options.find((o) => o.id === selected)?.label}
        </span>
      )}
    </div>
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            whileTap={{ scale: 0.96 }}
            className={`relative px-4 py-2.5 rounded-xl text-xs font-body font-medium transition-all duration-250 ${
              isSelected
                ? "bg-accent text-accent-foreground shadow-md ring-1 ring-accent/30"
                : "bg-secondary/60 text-foreground border border-border/50 hover:bg-secondary hover:border-accent/30 hover:shadow-sm"
            }`}
          >
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background flex items-center justify-center"
              >
                <Check className="w-2.5 h-2.5 text-accent-foreground" />
              </motion.span>
            )}
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);
  const [area, setArea] = useState(20);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [includeUnderlay, setIncludeUnderlay] = useState(false);
  const [includeSkirting, setIncludeSkirting] = useState(false);

  // Attribute selections (keyed by attribute key)
  const [selections, setSelections] = useState<Record<string, string>>({});

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

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="container-luxury py-6">
        {/* Back Link */}
        <Link
          to={`/products${floorType ? `?type=${floorType.id}` : ""}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {floorType?.name || "Products"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* ── Product Image ───────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="rounded-2xl overflow-hidden relative bg-card shadow-luxury-lg">
              <img
                src={detailImages[product.type] || productDetailTile}
                alt={product.name}
                className="w-full h-[350px] sm:h-[420px] lg:h-[520px] object-cover"
              />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Shield, label: "Genuine Product" },
                { icon: Star, label: "Premium Quality" },
                { icon: Wrench, label: "Expert Install" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-3 bg-card border border-border rounded-xl">
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-[10px] text-muted-foreground font-medium text-center">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Product Info ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title + Badge */}
            <div>
              <p className="text-sm text-accent font-bold uppercase tracking-widest mb-1">{product.category}</p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">{product.name}</h1>
              {product.badge && (
                <span className="inline-block mt-2 gradient-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">from</span>
              <span className="text-3xl lg:text-4xl font-bold text-foreground">{product.currency} {product.pricePerSqft}</span>
              <span className="text-muted-foreground">/sqft</span>
            </div>

            {/* ── Product Attributes (replaces shade swatches) ── */}
            <div className="space-y-4">
              {attributes.map((attr) => (
                <AttributeSelector
                  key={attr.key}
                  label={attr.label}
                  options={attr.options}
                  selected={selections[attr.key] || null}
                  onSelect={(val) => handleSelectAttribute(attr.key, val)}
                />
              ))}
            </div>

            {/* ── Specs Grid ─────────────────────────────── */}
            <div className="grid grid-cols-2 gap-3">
              <SpecCard label="Material" value={product.material} />
              <SpecCard label="Finish" value={product.finish} />
              <SpecCard label="Pattern" value={product.pattern} />
              <SpecCard label="Warranty" value={product.warranty} />
            </div>

            {/* ── Score Bars ─────────────────────────────── */}
            <div className="space-y-3">
              <ScoreBar label="Durability" score={product.durabilityScore} />
              <ScoreBar label="Maintenance" score={product.maintenanceScore} />
            </div>

            {/* ── Use Cases ──────────────────────────────── */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Ideal For</h3>
              <div className="flex flex-wrap gap-2">
                {product.useCases.map((uc) => (
                  <span key={uc} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full border border-border">
                    {uc}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Installation Info ──────────────────────── */}
            <div className="bg-secondary/50 border border-border rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{product.installationOption}</p>
                <p className="text-xs text-muted-foreground">Professional team available across UAE</p>
              </div>
            </div>

            {/* ── Cost Calculator ─────────────────────────── */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-luxury space-y-5">
              <h3 className="text-lg font-bold text-foreground">Calculate Your Cost</h3>

              {/* Area Slider */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Area</span>
                  <span className="font-bold text-foreground">{area} sqft</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-[hsl(var(--accent))]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>5 sqft</span><span>500 sqft</span>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2.5">
                <p className="text-sm font-semibold text-foreground">Add-ons</p>
                {[
                  { label: "Installation", detail: "+AED 25/sqft", checked: includeInstallation, onChange: setIncludeInstallation },
                  { label: "Underlay", detail: "+AED 8/sqft", checked: includeUnderlay, onChange: setIncludeUnderlay },
                  { label: "Skirting", detail: "+AED 15/linear ft", checked: includeSkirting, onChange: setIncludeSkirting },
                ].map((addon) => (
                  <label key={addon.label} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        addon.checked ? "bg-accent border-accent" : "border-border group-hover:border-accent/50"
                      }`}>
                        {addon.checked && <Check className="w-3 h-3 text-accent-foreground" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={addon.checked}
                        onChange={(e) => addon.onChange(e.target.checked)}
                        className="sr-only"
                      />
                      <span className="text-sm text-foreground">{addon.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{addon.detail}</span>
                  </label>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Flooring ({area} sqft)</span>
                  <span>AED {(product.pricePerSqft * area).toLocaleString()}</span>
                </div>
                {includeInstallation && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Installation</span>
                    <span>AED {(area * 25).toLocaleString()}</span>
                  </div>
                )}
                {includeUnderlay && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Underlay</span>
                    <span>AED {underlayPrice.toLocaleString()}</span>
                  </div>
                )}
                {includeSkirting && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Skirting</span>
                    <span>AED {skirtingPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-foreground mt-3 pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-accent">AED {totalCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="gradient-accent text-accent-foreground py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-foreground text-background py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm"
                >
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/get-quote"
                  className="text-center border-2 border-accent text-accent py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-accent/5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> Add to Quote
                </Link>
                <Link
                  to="/get-quote"
                  className="text-center border-2 border-border text-foreground py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:border-accent hover:text-accent transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" /> Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Related Products ────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border"
                >
                  <div className="h-36 lg:h-44 overflow-hidden">
                    <img
                      src={detailImages[p.type] || productDetailTile}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 lg:p-4">
                    <p className="text-[10px] text-accent font-bold uppercase tracking-wider mb-1">{p.category}</p>
                    <h3 className="text-xs lg:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">{p.name}</h3>
                    <p className="text-sm font-bold text-foreground mt-2">AED {p.pricePerSqft}/sqft</p>
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
