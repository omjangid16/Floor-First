import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, FileText, BarChart3, Calendar, Star, Shield, Wrench, CheckCircle } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

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

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-accent font-body font-medium hover:underline">
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const totalCost = product.pricePerSqft * area + (includeInstallation ? area * 25 : 0);

  const handleAddToCart = () => {
    addToCart(product, area, includeInstallation);
    toast({ title: "Added to Cart", description: `${product.name} (${area} sqft) added to your cart.` });
  };

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
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-2xl overflow-hidden shadow-luxury-lg">
              <img
                src={typeImages[product.type] || typeTile}
                alt={product.name}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {product.badge && (
              <span className="inline-block gradient-accent text-accent-foreground text-xs font-body font-bold px-4 py-1.5 rounded-full">
                {product.badge}
              </span>
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

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-body mb-1">Material</p>
                <p className="font-body font-semibold text-foreground">{product.material}</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-body mb-1">Finish</p>
                <p className="font-body font-semibold text-foreground">{product.finish}</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-body mb-1">Pattern</p>
                <p className="font-body font-semibold text-foreground">{product.pattern}</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-body mb-1">Warranty</p>
                <p className="font-body font-semibold text-foreground">{product.warranty}</p>
              </div>
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
                  <span key={uc} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-body">
                    {uc}
                  </span>
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

            {/* Area Calculator */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-luxury space-y-4">
              <h3 className="font-display font-bold text-foreground">Calculate Your Cost</h3>

              <div>
                <label className="text-sm font-body text-muted-foreground mb-2 block">
                  Area: <span className="font-bold text-foreground">{area} sqft</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="500"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-burnt-orange"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-body">
                  <span>5 sqft</span>
                  <span>500 sqft</span>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={(e) => setIncludeInstallation(e.target.checked)}
                  className="w-4 h-4 accent-burnt-orange"
                />
                <span className="text-sm font-body text-foreground">Include Installation (+AED 25/sqft)</span>
              </label>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm font-body text-muted-foreground mb-1">
                  <span>Flooring ({area} sqft)</span>
                  <span>AED {(product.pricePerSqft * area).toLocaleString()}</span>
                </div>
                {includeInstallation && (
                  <div className="flex justify-between text-sm font-body text-muted-foreground mb-1">
                    <span>Installation ({area} sqft)</span>
                    <span>AED {(area * 25).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-display font-bold text-lg text-foreground mt-2 pt-2 border-t border-border">
                  <span>Total</span>
                  <span>AED {totalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 gradient-accent text-accent-foreground py-3.5 rounded-lg font-body font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <Link
                  to="/get-quote"
                  className="flex-1 border-2 border-accent text-accent py-3.5 rounded-lg font-body font-bold flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors"
                >
                  <FileText className="w-5 h-5" /> Add to Quote
                </Link>
              </div>

              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="flex-1 text-center text-sm font-body text-muted-foreground hover:text-accent transition-colors py-2"
                >
                  Compare Products
                </Link>
                <Link
                  to="/get-quote"
                  className="flex-1 text-center text-sm font-body text-muted-foreground hover:text-accent transition-colors py-2"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
