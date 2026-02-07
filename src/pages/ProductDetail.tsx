import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, FileText, Calendar, Wrench, Check } from "lucide-react";
import { products, flooringTypes } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { shadeGroups, getShadeById, type Shade } from "@/data/shades";

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

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);
  const [area, setArea] = useState(20);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [includeUnderlay, setIncludeUnderlay] = useState(false);
  const [includeSkirting, setIncludeSkirting] = useState(false);
  const [selectedShade, setSelectedShade] = useState<string | null>(product?.shade || null);

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-accent font-body font-medium hover:underline">← Back to Products</Link>
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

  // Get shades relevant to this product type
  const relevantShades = shadeGroups.flatMap((g) => g.shades).slice(0, 12);
  const currentShade = selectedShade ? getShadeById(selectedShade) : null;

  const floorType = flooringTypes.find((t) => t.id === product.type);

  // Related products
  const related = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  const ScoreBar = ({ label, score, max = 10 }: { label: string; score: number; max?: number }) => (
    <div>
      <div className="flex justify-between text-sm font-body mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{score}/{max}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full gradient-accent rounded-full transition-all duration-500" style={{ width: `${(score / max) * 100}%` }} />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="container-luxury py-6">
        <Link to={`/products${floorType ? `?type=${floorType.id}` : ""}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to {floorType?.name || "Products"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-2xl overflow-hidden shadow-luxury-lg relative">
              <img src={typeImages[product.type] || typeTile} alt={product.name} className="w-full h-[400px] lg:h-[500px] object-cover" />
              {currentShade && (
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-luxury">
                  <div className="w-6 h-6 rounded-sm" style={{ background: currentShade.gradient }} />
                  <span className="text-xs font-body font-semibold text-foreground">Shade: {currentShade.name}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {product.badge && (
              <span className="inline-block gradient-accent text-accent-foreground text-xs font-body font-bold px-4 py-1.5 rounded-full">{product.badge}</span>
            )}

            <div>
              <p className="text-sm text-accent font-body font-bold uppercase tracking-wider mb-1">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{product.name}</h1>
            </div>

            <p className="text-muted-foreground font-body leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground font-body">from</span>
              <span className="text-4xl font-display font-bold text-foreground">{product.currency} {product.pricePerSqft}</span>
              <span className="text-muted-foreground font-body">/sqft</span>
            </div>

            {/* Shade Selector */}
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-2">Select Shade</label>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {relevantShades.map((shade) => {
                  const isSelected = selectedShade === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setSelectedShade(shade.id)}
                      className={`relative flex flex-col items-center gap-1 p-1 rounded-lg transition-all ${
                        isSelected ? "ring-2 ring-accent bg-accent/5" : "hover:bg-secondary"
                      }`}
                    >
                      <div
                        className="w-full aspect-square rounded-md shadow-sm"
                        style={{ background: shade.gradient }}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-accent-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] font-body text-muted-foreground truncate w-full text-center">{shade.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Material", value: product.material },
                { label: "Finish", value: product.finish },
                { label: "Pattern", value: product.pattern },
                { label: "Warranty", value: product.warranty },
              ].map((spec) => (
                <div key={spec.label} className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-body mb-0.5">{spec.label}</p>
                  <p className="font-body font-semibold text-foreground text-sm">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Scores */}
            <div className="space-y-3">
              <ScoreBar label="Durability" score={product.durabilityScore} />
              <ScoreBar label="Maintenance" score={product.maintenanceScore} />
            </div>

            {/* Use Cases */}
            <div>
              <p className="text-sm font-body font-semibold text-foreground mb-2">Ideal For</p>
              <div className="flex flex-wrap gap-2">
                {product.useCases.map((uc) => (
                  <span key={uc} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-body">{uc}</span>
                ))}
              </div>
            </div>

            {/* Installation */}
            <div className="bg-secondary rounded-lg p-4 flex items-center gap-3">
              <Wrench className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-sm font-body font-semibold text-foreground">Installation: {product.installationOption}</p>
                <p className="text-xs text-muted-foreground font-body">Professional team available across UAE</p>
              </div>
            </div>

            {/* Area Calculator + Add-ons */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-luxury space-y-4">
              <h3 className="font-display font-bold text-foreground">Calculate Your Cost</h3>

              <div>
                <label className="text-sm font-body text-muted-foreground mb-2 block">
                  Area: <span className="font-bold text-foreground">{area} sqft</span>
                </label>
                <input type="range" min="5" max="500" value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full accent-burnt-orange" />
                <div className="flex justify-between text-xs text-muted-foreground font-body">
                  <span>5 sqft</span><span>500 sqft</span>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2">
                <p className="text-sm font-body font-semibold text-foreground">Add-ons</p>
                {[
                  { label: "Installation (+AED 25/sqft)", checked: includeInstallation, onChange: setIncludeInstallation },
                  { label: "Underlay (+AED 8/sqft)", checked: includeUnderlay, onChange: setIncludeUnderlay },
                  { label: "Skirting (+AED 15/linear ft)", checked: includeSkirting, onChange: setIncludeSkirting },
                ].map((addon) => (
                  <label key={addon.label} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addon.checked}
                      onChange={(e) => addon.onChange(e.target.checked)}
                      className="w-4 h-4 accent-burnt-orange"
                    />
                    <span className="text-sm font-body text-foreground">{addon.label}</span>
                  </label>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-border pt-4 space-y-1">
                <div className="flex justify-between text-sm font-body text-muted-foreground">
                  <span>Flooring ({area} sqft)</span>
                  <span>AED {(product.pricePerSqft * area).toLocaleString()}</span>
                </div>
                {includeInstallation && (
                  <div className="flex justify-between text-sm font-body text-muted-foreground">
                    <span>Installation</span>
                    <span>AED {(area * 25).toLocaleString()}</span>
                  </div>
                )}
                {includeUnderlay && (
                  <div className="flex justify-between text-sm font-body text-muted-foreground">
                    <span>Underlay</span>
                    <span>AED {underlayPrice.toLocaleString()}</span>
                  </div>
                )}
                {includeSkirting && (
                  <div className="flex justify-between text-sm font-body text-muted-foreground">
                    <span>Skirting</span>
                    <span>AED {skirtingPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-display font-bold text-lg text-foreground mt-2 pt-2 border-t border-border">
                  <span>Total</span>
                  <span>AED {totalCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="gradient-accent text-accent-foreground py-3.5 rounded-lg font-body font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-foreground text-background py-3.5 rounded-lg font-body font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/get-quote"
                  className="text-center border-2 border-accent text-accent py-2.5 rounded-lg font-body font-semibold text-sm flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Add to Quote
                </Link>
                <Link
                  to="/get-quote"
                  className="text-center border-2 border-border text-foreground py-2.5 rounded-lg font-body font-semibold text-sm flex items-center justify-center gap-2 hover:border-accent hover:text-accent transition-colors"
                >
                  <Calendar className="w-4 h-4" /> Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="group bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border">
                  <div className="h-40 overflow-hidden">
                    <img src={typeImages[p.type] || typeTile} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-accent font-body font-bold uppercase mb-1">{p.category}</p>
                    <h3 className="text-sm font-display font-bold text-foreground group-hover:text-accent transition-colors">{p.name}</h3>
                    <p className="text-sm font-display font-bold text-foreground mt-2">AED {p.pricePerSqft}/sqft</p>
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
