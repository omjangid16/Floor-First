import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Wrench, Clock, TrendingUp, ArrowRight, ShoppingCart, FileText, MessageCircle, Calendar } from "lucide-react";
import { products, flooringTypes } from "@/data/products";
import { getShadeById } from "@/data/shades";
import { useCart } from "@/contexts/CartContext";
import type { CalcInputs } from "./CalculatorForm";

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

const priceMultiplier: Record<string, number> = {
  tile: 0.8, stone: 1.5, wood: 1.2, vinyl: 0.6, resin: 0.5, carpet: 0.7, outdoor: 0.9, rubber: 0.4,
};

interface CalculatorResultsProps {
  inputs: CalcInputs;
  onBack: () => void;
}

const CalculatorResults = ({ inputs, onBack }: CalculatorResultsProps) => {
  const { addToCart } = useCart();
  const { spaceType, area, floorType, traffic, budget, shade, shadeName } = inputs;

  const materialCost = area * budget * (priceMultiplier[floorType] || 1);
  const installCost = area * 25;
  const totalLow = Math.round(materialCost * 0.85) + installCost;
  const totalHigh = Math.round(materialCost * 1.15) + installCost;

  const selectedType = flooringTypes.find((t) => t.id === floorType);
  const selectedShade = shade ? getShadeById(shade) : null;

  // Get recommended products
  const recommended = products
    .filter((p) => p.type === floorType)
    .sort((a, b) => Math.abs(a.pricePerSqft - budget) - Math.abs(b.pricePerSqft - budget))
    .slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Back button */}
      <button onClick={onBack} className="text-sm font-body text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
        ← Modify inputs
      </button>

      {/* Selection Summary */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
        <h3 className="font-display font-bold text-foreground text-lg mb-4">Your Selection Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Space", value: spaceType },
            { label: "Area", value: `${area} sqft` },
            { label: "Type", value: selectedType?.name || floorType },
            { label: "Traffic", value: traffic },
            { label: "Budget", value: `AED ${budget}/sqft` },
          ].map((item) => (
            <div key={item.label} className="bg-secondary rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-body font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
          {selectedShade && (
            <div className="bg-secondary rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm shrink-0" style={{ background: selectedShade.gradient }} />
              <div>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Shade</p>
                <p className="text-sm font-body font-semibold text-foreground">{shadeName}</p>
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
              <span className="text-sm font-body text-muted-foreground">Material Cost</span>
              <span className="font-body font-bold text-foreground">AED {Math.round(materialCost * 0.85).toLocaleString()} – {Math.round(materialCost * 1.15).toLocaleString()}</span>
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

      {/* Timeline & Maintenance */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
          <Clock className="w-6 h-6 text-accent mb-2" />
          <p className="text-sm font-body text-muted-foreground">Timeline</p>
          <p className="font-display font-bold text-foreground">{Math.ceil(area / 50)} – {Math.ceil(area / 30)} Days</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
          <TrendingUp className="w-6 h-6 text-accent mb-2" />
          <p className="text-sm font-body text-muted-foreground">Maintenance</p>
          <p className="font-display font-bold text-foreground">{traffic === "High" || traffic === "Very High" ? "Weekly" : "Monthly"}</p>
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
