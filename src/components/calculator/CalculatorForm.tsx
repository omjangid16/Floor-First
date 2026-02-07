import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator as CalcIcon } from "lucide-react";
import { flooringTypes } from "@/data/products";
import type { Shade } from "@/data/shades";
import ShadeSelector from "@/components/ShadeSelector";

const spaceTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Warehouse", "Hotel Lobby", "Gym"];
const trafficLevels = ["Low", "Medium", "High", "Very High"];

interface CalcInputs {
  spaceType: string;
  area: number;
  floorType: string;
  traffic: string;
  budget: number;
  shade: string | null;
  shadeName: string | null;
}

interface CalculatorFormProps {
  onCalculate: (inputs: CalcInputs) => void;
}

const CalculatorForm = ({ onCalculate }: CalculatorFormProps) => {
  const [spaceType, setSpaceType] = useState("Living Room");
  const [area, setArea] = useState(50);
  const [floorType, setFloorType] = useState("wood");
  const [traffic, setTraffic] = useState("Medium");
  const [budget, setBudget] = useState(150);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const [shadeName, setShadeName] = useState<string | null>(null);

  const handleShadeSelect = (shade: Shade) => {
    setSelectedShade(shade.id);
    setShadeName(shade.name);
  };

  const handleCalculate = () => {
    onCalculate({ spaceType, area, floorType, traffic, budget, shade: selectedShade, shadeName });
  };

  return (
    <div className="space-y-6">
      {/* Space Type */}
      <div>
        <label className="block text-sm font-body font-semibold text-foreground mb-2">Space Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {spaceTypes.map((s) => (
            <button
              key={s}
              onClick={() => setSpaceType(s)}
              className={`px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-all ${
                spaceType === s ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-body font-semibold text-foreground mb-2">
          Area: <span className="text-accent">{area} sqft</span>
        </label>
        <input type="range" min="10" max="1000" value={area} onChange={(e) => setArea(Number(e.target.value))}
          className="w-full accent-burnt-orange" />
        <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
          <span>10 sqft</span><span>1000 sqft</span>
        </div>
      </div>

      {/* Flooring Type */}
      <div>
        <label className="block text-sm font-body font-semibold text-foreground mb-2">Flooring Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {flooringTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setFloorType(t.id)}
              className={`px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-all ${
                floorType === t.id ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
              }`}
            >
              {t.name.replace(" Flooring", "").replace(" & ", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Traffic Level */}
      <div>
        <label className="block text-sm font-body font-semibold text-foreground mb-2">Traffic Level</label>
        <div className="flex gap-2">
          {trafficLevels.map((t) => (
            <button
              key={t}
              onClick={() => setTraffic(t)}
              className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-all ${
                traffic === t ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-body font-semibold text-foreground mb-2">
          Budget per sqft: <span className="text-accent">AED {budget}</span>
        </label>
        <input type="range" min="50" max="800" step="10" value={budget} onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-burnt-orange" />
        <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
          <span>AED 50</span><span>AED 800</span>
        </div>
      </div>

      {/* Shade Selector */}
      <div>
        <label className="block text-sm font-body font-semibold text-foreground mb-2">Shade</label>
        <ShadeSelector selectedShade={selectedShade} onSelect={handleShadeSelect} />
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full gradient-accent text-accent-foreground py-4 rounded-lg font-body font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <CalcIcon className="w-5 h-5" /> Calculate Estimate
      </button>
    </div>
  );
};

export default CalculatorForm;
export type { CalcInputs };
