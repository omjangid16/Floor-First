import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, ArrowRight, TrendingUp, Clock, Wrench, DollarSign } from "lucide-react";
import { flooringTypes } from "@/data/products";

const spaceTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Warehouse", "Hotel Lobby", "Gym"];
const trafficLevels = ["Low", "Medium", "High", "Very High"];

const CalculatorPage = () => {
  const [spaceType, setSpaceType] = useState("Living Room");
  const [area, setArea] = useState(50);
  const [floorType, setFloorType] = useState("wood");
  const [traffic, setTraffic] = useState("Medium");
  const [budget, setBudget] = useState(150);
  const [showResults, setShowResults] = useState(false);

  const priceMultiplier: Record<string, number> = {
    tile: 0.8, stone: 1.5, wood: 1.2, vinyl: 0.6, resin: 0.5, carpet: 0.7, outdoor: 0.9, rubber: 0.4,
  };

  const materialCost = area * budget * (priceMultiplier[floorType] || 1);
  const installCost = area * 25;
  const totalCost = materialCost + installCost;

  const selectedType = flooringTypes.find((t) => t.id === floorType);

  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-12 lg:py-16">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Smart Tool</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
            Flooring Calculator
          </h1>
          <p className="text-primary-foreground/60 font-body mt-3 max-w-xl">
            Get instant cost estimates, product recommendations, and installation timelines for your flooring project.
          </p>
        </div>
      </section>

      <div className="container-luxury py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-6">
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

            <button
              onClick={() => setShowResults(true)}
              className="w-full gradient-accent text-accent-foreground py-4 rounded-lg font-body font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <CalcIcon className="w-5 h-5" /> Calculate Estimate
            </button>
          </div>

          {/* Results */}
          {showResults && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
                <h3 className="font-display font-bold text-foreground text-xl mb-6">Cost Breakdown</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-body text-muted-foreground">Material Cost</span>
                        <span className="font-body font-bold text-foreground">AED {materialCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-body text-muted-foreground">Installation</span>
                        <span className="font-body font-bold text-foreground">AED {installCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-display font-bold text-2xl text-foreground">
                      <span>Total Estimate</span>
                      <span className="text-accent">AED {totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
                  <Clock className="w-6 h-6 text-accent mb-2" />
                  <p className="text-sm font-body text-muted-foreground">Timeline</p>
                  <p className="font-display font-bold text-foreground">{Math.ceil(area / 50)} - {Math.ceil(area / 30)} Days</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
                  <TrendingUp className="w-6 h-6 text-accent mb-2" />
                  <p className="text-sm font-body text-muted-foreground">Maintenance</p>
                  <p className="font-display font-bold text-foreground">{traffic === "High" || traffic === "Very High" ? "Weekly" : "Monthly"}</p>
                </div>
              </div>

              {selectedType && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
                  <h4 className="font-display font-bold text-foreground mb-3">Recommended: {selectedType.name}</h4>
                  <p className="text-sm text-muted-foreground font-body mb-3">Best for: {selectedType.bestFor.join(", ")}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedType.subtypes.map((sub) => (
                      <span key={sub} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-body">{sub}</span>
                    ))}
                  </div>
                  <Link
                    to={`/products?type=${selectedType.id}`}
                    className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-6 py-2.5 rounded-lg font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    View Products <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;
