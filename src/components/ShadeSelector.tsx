import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { shadeGroups, type Shade } from "@/data/shades";

interface ShadeSelectorProps {
  selectedShade: string | null;
  onSelect: (shade: Shade) => void;
  compact?: boolean;
}

const ShadeSelector = ({ selectedShade, onSelect, compact = false }: ShadeSelectorProps) => {
  const [activeGroup, setActiveGroup] = useState(shadeGroups[0].id);

  const currentGroup = shadeGroups.find((g) => g.id === activeGroup);

  return (
    <div className="space-y-3">
      {/* Group Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {shadeGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
              activeGroup === group.id
                ? "gradient-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Shade Swatches */}
      {currentGroup && (
        <motion.div
          key={currentGroup.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`grid gap-2.5 ${
            compact ? "grid-cols-4 sm:grid-cols-6" : "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8"
          }`}
        >
          {currentGroup.shades.map((shade) => {
            const isSelected = selectedShade === shade.id;
            return (
              <button
                key={shade.id}
                onClick={() => onSelect(shade)}
                className={`group relative flex flex-col items-center gap-1.5 p-1.5 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-accent bg-accent/5 scale-[1.03]"
                    : "hover:bg-secondary hover:scale-[1.02]"
                }`}
              >
                <div
                  className={`relative w-full aspect-square rounded-lg shadow-sm transition-shadow duration-200 ${
                    isSelected ? "shadow-luxury" : "group-hover:shadow-md"
                  }`}
                  style={{ background: shade.gradient }}
                >
                  {/* Wood grain texture overlay */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        ${70 + Math.random() * 30}deg,
                        transparent,
                        transparent 3px,
                        rgba(0,0,0,0.06) 3px,
                        rgba(0,0,0,0.06) 4px
                      )`,
                    }}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent-foreground" />
                      </div>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-body leading-tight text-center truncate w-full ${
                  isSelected ? "text-accent font-semibold" : "text-muted-foreground"
                }`}>
                  {shade.name}
                </span>
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Selected summary */}
      {selectedShade && (
        <div className="flex items-center gap-2 pt-1">
          {(() => {
            const s = currentGroup?.shades.find((sh) => sh.id === selectedShade) ||
              shadeGroups.flatMap((g) => g.shades).find((sh) => sh.id === selectedShade);
            if (!s) return null;
            return (
              <>
                <div className="w-4 h-4 rounded-sm" style={{ background: s.gradient }} />
                <span className="text-xs font-body text-foreground">
                  Selected: <strong>{s.name}</strong>
                </span>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ShadeSelector;
