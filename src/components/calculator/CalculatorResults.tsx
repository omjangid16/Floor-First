import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Wrench, Clock, TrendingUp, ArrowRight, ShoppingCart, FileText, MessageCircle, Calendar } from "lucide-react";
import { products, flooringTypes } from "@/data/products";
import { packageTiers } from "@/data/packageTiers";
import { useCart } from "@/contexts/CartContext";
import type { WizardInputs } from "./CalculatorWizard";

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

const basePricePerSqft: Record<string, number> = {
  tile: 140, stone: 320, wood: 280, vinyl: 95, resin: 80, carpet: 110, outdoor: 130, rubber: 70,
};

interface CalculatorResultsProps {
  inputs: WizardInputs;
  onBack: () => void;
}

const CalculatorResults = ({ inputs, onBack }: CalculatorResultsProps) => {
  const { addToCart } = useCart();
  const { spaceType, floorType, floorTypeName, design, packageTier, packageName, area, budget } = inputs;

  const pkg = packageTiers.find((p) => p.id === packageTier);
  const priceMultiplier = pkg?.priceMultiplier || 1;

  const basePrice = basePricePerSqft[floorType] || 150;
  const materialCost = area * basePrice * priceMultiplier;
  const installCost = area * (packageTier === "luxury" ? 40 : packageTier === "premium" ? 30 : packageTier === "standard" ? 25 : 15);
  const totalLow = Math.round(materialCost * 0.9) + installCost;
  const totalHigh = Math.round(materialCost * 1.1) + installCost;

  const timelineDays = Math.ceil(area / (packageTier === "luxury" ? 25 : packageTier === "premium" ? 35 : 45));

  // Get recommended products
  const recommended = products
    .filter((p) => p.type === floorType)
    .sort((a, b) => Math.abs(a.pricePerSqft - budget) - Math.abs(b.pricePerSqft - budget))
    .slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <button onClick={onBack} className="text-sm font-body text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
        ← Start Over
      </button>

      {/* Selection Summary */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
        <h3 className="font-display font-bold text-foreground text-lg mb-4">Your Selection Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Space", value: spaceType },
            { label: "Type", value: floorTypeName },
            { label: "Package", value: packageName },
            { label: "Area", value: `${area} sqft` },
            { label: "Budget", value: `AED ${budget}/sqft` },
          ].map((item) => (
            <div key={item.label} className="bg-secondary rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-body font-semibold text-foreground flex items-center gap-1">
                {item.value}
              </p>
            </div>
          ))}
          {design && (
            <div className="bg-secondary rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-md shrink-0" style={{ background: design.gradient }} />
              <div>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Design</p>
                <p className="text-sm font-body font-semibold text-foreground">{design.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
        <h3 className="font-display font-bold text-foreground text-xl mb-6">Cost Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 flex justify-between">
              <span className="text-sm font-body text-muted-foreground">Material Cost ({packageName})</span>
              <span className="font-body font-bold text-foreground">
                AED {Math.round(materialCost * 0.9).toLocaleString()} – {Math.round(materialCost * 1.1).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Wrench className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 flex justify-between">
              <span className="text-sm font-body text-muted-foreground">Installation</span>
              <span className="font-body font-bold text-foreground">AED {installCost.toLocaleString()}</span>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between font-display font-bold text-2xl text-foreground">
              <span>Total Estimate</span>
              <span className="text-accent">AED {totalLow.toLocaleString()} – {totalHigh.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Package Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
          <Clock className="w-6 h-6 text-accent mb-2" />
          <p className="text-sm font-body text-muted-foreground">Estimated Timeline</p>
          <p className="font-display font-bold text-foreground">{timelineDays} – {timelineDays + 3} Days</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
          <TrendingUp className="w-6 h-6 text-accent mb-2" />
          <p className="text-sm font-body text-muted-foreground">Package Tier</p>
          <p className="font-display font-bold text-foreground">{packageName}</p>
        </div>
      </div>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-foreground text-xl mb-4">Recommended Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommended.map((product) => (
              <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-luxury hover-lift group">
                <Link to={`/products/${product.id}`}>
                  <div className="h-36 overflow-hidden">
                    <img src={typeImages[product.type] || typeTile} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h4 className="font-display font-bold text-foreground text-sm group-hover:text-accent transition-colors">{product.name}</h4>
                  </Link>
                  <p className="text-xs text-muted-foreground font-body mt-1">{product.material} · {product.finish}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display font-bold text-foreground">AED {product.pricePerSqft}/sqft</span>
                    <button
                      onClick={() => addToCart(product, area, false)}
                      className="p-2 rounded-lg gradient-accent text-accent-foreground hover:opacity-90 transition-opacity"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Link to="/get-quote" className="flex items-center justify-center gap-2 bg-card border border-border rounded-xl p-4 font-body font-semibold text-sm text-foreground hover:border-accent hover:text-accent transition-all">
          <FileText className="w-4 h-4" /> Request Quote
        </Link>
        <Link to="/get-quote" className="flex items-center justify-center gap-2 bg-card border border-border rounded-xl p-4 font-body font-semibold text-sm text-foreground hover:border-accent hover:text-accent transition-all">
          <Calendar className="w-4 h-4" /> Book Consultation
        </Link>
        <Link to="/help-center" className="flex items-center justify-center gap-2 bg-card border border-border rounded-xl p-4 font-body font-semibold text-sm text-foreground hover:border-accent hover:text-accent transition-all">
          <MessageCircle className="w-4 h-4" /> AI Assistant
        </Link>
        <Link to={`/products?type=${floorType}`} className="flex items-center justify-center gap-2 gradient-accent text-accent-foreground rounded-xl p-4 font-body font-semibold text-sm hover:opacity-90 transition-opacity">
          <ArrowRight className="w-4 h-4" /> View All Products
        </Link>
      </div>
    </motion.div>
  );
};

export default CalculatorResults;
