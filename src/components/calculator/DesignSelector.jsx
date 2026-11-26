import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { getDesignsByTypeAndShade, shadeCategories } from "@/data/flooringDesigns";
const DesignSelector = ({
  flooringType,
  selectedDesign,
  onSelect
}) => {
  const [activeShade, setActiveShade] = useState("all");
  const designs = getDesignsByTypeAndShade(flooringType, activeShade);
  return <div className="space-y-5">
      {/* Shade Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {shadeCategories.map(cat => <button key={cat.id} onClick={() => setActiveShade(cat.id)} className={`px-4 py-2 rounded-full text-xs font-body font-semibold transition-all duration-200 ${activeShade === cat.id ? "gradient-accent text-accent-foreground shadow-md" : "bg-card border border-border text-foreground hover:border-accent/40"}`}>
            {cat.name}
          </button>)}
      </div>

      {/* Design Grid */}
      <motion.div key={`${flooringType}-${activeShade}`} initial={{
      opacity: 0,
      y: 8
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.2
    }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {designs.map(design => {
        const isSelected = selectedDesign?.id === design.id;
        return <button key={design.id} onClick={() => onSelect(design)} className={`group relative rounded-xl overflow-hidden transition-all duration-200 border-2 text-left ${isSelected ? "border-accent shadow-luxury ring-2 ring-accent/20" : "border-border hover:border-accent/40 hover:shadow-md"}`}>
              {/* Swatch Visual */}
              <div className="relative w-full h-24 sm:h-28" style={{
            background: design.gradient
          }}>
                {/* Texture overlay for realism */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23000' fill-opacity='.03'/%3E%3C/svg%3E")`
            }} />
                {isSelected && <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-accent-foreground" />
                  </div>}
              </div>

              {/* Label */}
              <div className={`px-3 py-2.5 ${isSelected ? "bg-accent/5" : "bg-card"}`}>
                <p className={`text-xs font-body font-bold truncate ${isSelected ? "text-accent" : "text-foreground"}`}>
                  {design.name}
                </p>
                <p className="text-[10px] font-body text-muted-foreground truncate mt-0.5">
                  {design.pattern} · {design.texture}
                </p>
              </div>
            </button>;
      })}
      </motion.div>

      {designs.length === 0 && <div className="text-center py-10 text-muted-foreground font-body text-sm bg-card rounded-xl border border-border">
          No designs available for this shade filter. Try another.
        </div>}

      {/* Selected Summary */}
      {selectedDesign && <motion.div initial={{
      opacity: 0,
      y: 4
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex items-center gap-3 bg-accent/5 border border-accent/20 rounded-xl p-3.5">
          <div className="w-12 h-12 rounded-lg shrink-0 shadow-md" style={{
        background: selectedDesign.gradient
      }} />
          <div>
            <p className="text-sm font-body font-bold text-foreground">{selectedDesign.name}</p>
            <p className="text-xs font-body text-muted-foreground">
              {selectedDesign.pattern} · {selectedDesign.texture}
            </p>
          </div>
          <div className="ml-auto">
            <span className="text-[10px] font-body font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">Selected</span>
          </div>
        </motion.div>}
    </div>;
};
export default DesignSelector;