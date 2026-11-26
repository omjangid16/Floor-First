import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { flooringTypes, spaces, budgetRanges } from "@/data/products";
import spaceResidential from "@/assets/space-residential.jpg";
import spaceCommercial from "@/assets/space-commercial.jpg";
import spaceIndustrial from "@/assets/space-industrial.jpg";
import typeTile from "@/assets/type-tile.jpg";
import typeStone from "@/assets/type-stone.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";
import typeRubber from "@/assets/type-rubber.jpg";
const typeImages = {
  tile: typeTile,
  stone: typeStone,
  wood: typeWood,
  vinyl: typeVinyl,
  resin: typeResin,
  carpet: typeCarpet,
  outdoor: typeOutdoor,
  rubber: typeRubber
};
const spaceImages = {
  residential: spaceResidential,
  commercial: spaceCommercial,
  industrial: spaceIndustrial,
  hospitality: spaceCommercial,
  retail: spaceCommercial,
  sports: spaceIndustrial
};
const tabs = [{
  id: "spaces",
  label: "Spaces"
}, {
  id: "type",
  label: "Type"
}, {
  id: "budget",
  label: "Budget"
}, {
  id: "material",
  label: "Material"
}];
const BrowseSection = () => {
  const [activeTab, setActiveTab] = useState("spaces");
  return <section className="py-20 lg:py-28 bg-background">
      <div className="container-luxury">
        <div className="mb-10">
          <p className="text-muted-foreground font-body text-sm mb-2">How would you like to</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
            Browse your flooring options
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all ${activeTab === tab.id ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-sand-dark"}`}>
              {tab.label}
            </button>)}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
          {activeTab === "spaces" && <div>
              <h3 className="text-sm font-body text-muted-foreground mb-1">Floors by</h3>
              <h4 className="text-2xl md:text-3xl font-display font-bold mb-8">Spaces</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space, index) => <Link key={space.id} to={`/products?space=${space.id}`} className="group relative rounded-xl overflow-hidden hover-lift h-64">
                    <img src={spaceImages[space.id]} alt={space.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h5 className="text-xl font-display font-bold text-primary-foreground mb-2">{space.name}</h5>
                      <p className="text-sm text-primary-foreground/70 font-body line-clamp-2">{space.description}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-accent text-sm font-body font-medium group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>)}
              </div>
            </div>}

          {activeTab === "type" && <div>
              <h3 className="text-sm font-body text-muted-foreground mb-1">Floors by</h3>
              <h4 className="text-2xl md:text-3xl font-display font-bold mb-8">Type</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {flooringTypes.map(type => <Link key={type.id} to={`/products?type=${type.id}`} className="group bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border">
                    <div className="h-48 overflow-hidden">
                      <img src={typeImages[type.id]} alt={type.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-body font-bold text-accent tracking-wider uppercase">
                        {type.badge}
                      </span>
                      <h5 className="text-lg font-display font-bold mt-1 mb-1">{type.name}</h5>
                      <p className="text-sm text-muted-foreground font-body mb-3">{type.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {type.subtypes.slice(0, 3).map(sub => <span key={sub} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-body">
                            {sub}
                          </span>)}
                      </div>
                      <span className="inline-flex items-center gap-1 gradient-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-body font-semibold w-full justify-center hover:opacity-90 transition-opacity">
                        Explore Range <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>)}
              </div>
            </div>}

          {activeTab === "budget" && <div>
              <h3 className="text-sm font-body text-muted-foreground mb-1">Floors by</h3>
              <h4 className="text-2xl md:text-3xl font-display font-bold mb-8">Budget</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {budgetRanges.map(budget => <Link key={budget.id} to={`/products?budget=${budget.id}`} className="group bg-primary rounded-xl p-8 text-center hover-lift">
                    <p className="text-xs text-primary-foreground/50 font-body mb-2 uppercase tracking-wider">AED</p>
                    <p className="text-3xl font-display font-bold text-primary-foreground mb-4">{budget.range}</p>
                    <span className="inline-flex items-center gap-1 border border-primary-foreground/30 text-primary-foreground px-4 py-2 rounded-lg text-sm font-body font-medium hover:bg-primary-foreground/10 transition-colors">
                      Detailed Pricing
                    </span>
                  </Link>)}
              </div>
            </div>}

          {activeTab === "material" && <div>
              <h3 className="text-sm font-body text-muted-foreground mb-1">Floors by</h3>
              <h4 className="text-2xl md:text-3xl font-display font-bold mb-8">Material</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {flooringTypes.slice(0, 6).map(type => <Link key={type.id} to={`/products?type=${type.id}`} className="group bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border">
                    <div className="h-44 overflow-hidden">
                      <img src={typeImages[type.id]} alt={type.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h5 className="text-lg font-display font-bold mb-2">{type.name}</h5>
                      <p className="text-sm text-muted-foreground font-body mb-3">Base: {type.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {type.subtypes.map(sub => <span key={sub} className="text-xs text-accent font-body font-medium">• {sub}</span>)}
                      </div>
                    </div>
                  </Link>)}
              </div>
            </div>}
        </motion.div>
      </div>
    </section>;
};
export default BrowseSection;