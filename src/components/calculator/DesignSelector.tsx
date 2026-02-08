import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { getDesignsByTypeAndShade, shadeCategories, type FlooringDesign } from "@/data/flooringDesigns";

interface DesignSelectorProps {
  flooringType: string;
  selectedDesign: FlooringDesign | null;
  onSelect: (design: FlooringDesign) => void;
}

const DesignSelector = ({ flooringType, selectedDesign, onSelect }: DesignSelectorProps) => {
  const [activeShade, setActiveShade] = useState("all");

  const designs = getDesignsByTypeAndShade(flooringType, activeShade);

  return (
    <div className="space-y-4">
      {/* Shade Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {shadeCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveShade(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
              activeShade === cat.id
                ? "gradient-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Design Grid */}
      <motion.div
        key={`${flooringType}-${activeShade}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {designs.map((design) => {
          const isSelected = selectedDesign?.id === design.id;
          return (
            <button
              key={design.id}
              onClick={() => onSelect(design)}
              className={`group relative flex flex-col rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                isSelected
                  ? "border-accent shadow-luxury scale-[1.02]"
                  : "border-transparent hover:border-border hover:shadow-md"
              }`}
            >
              {/* Swatch Visual */}
              <div
                className="relative w-full aspect-[4/3] rounded-t-lg"
                style={{ background: design.gradient }}
              >
                {/* Texture overlay */}
                <div
                  className="absolute inset-0 opacity-15 mix-blend-overlay"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      ${60 + Math.random() * 40}deg,
                      transparent,
                      transparent 4px,
                      rgba(0,0,0,0.08) 4px,
                      rgba(0,0,0,0.08) 5px
                    )`,
                  }}
                />
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-accent-foreground" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className={`px-2.5 py-2 bg-card ${isSelected ? "bg-accent/5" : ""}`}>
                <p className={`text-xs font-body font-semibold truncate ${isSelected ? "text-accent" : "text-foreground"}`}>
                  {design.name}
                </p>
                <p className="text-[10px] font-body text-muted-foreground truncate">
                  {design.pattern} · {design.texture}
                </p>
              </div>
            </button>
          );
        })}
      </motion.div>

      {designs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground font-body text-sm">
          No designs available for this shade filter. Try another shade.
        </div>
      )}

      {/* Selected Summary */}
      {selectedDesign && (
        <div className="flex items-center gap-3 bg-accent/5 border border-accent/20 rounded-lg p-3">
          <div
            className="w-10 h-10 rounded-lg shrink-0"
            style={{ background: selectedDesign.gradient }}
          />
          <div>
            <p className="text-sm font-body font-semibold text-foreground">{selectedDesign.name}</p>
            <p className="text-xs font-body text-muted-foreground">
              {selectedDesign.pattern} · {selectedDesign.texture}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignSelector;
