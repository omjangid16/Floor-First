import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { flooringTypes } from "@/data/products";
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
const CategoryShowcase = () => {
  return <section className="py-16 lg:py-24 bg-background">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent font-body text-sm font-semibold mb-1 uppercase tracking-wider">Browse by</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Flooring Types</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {flooringTypes.map((type, i) => <motion.div key={type.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: i * 0.05
        }}>
              <Link to={`/products?type=${type.id}`} className="group block bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border">
                <div className="relative h-36 md:h-44 overflow-hidden">
                  <img src={typeImages[type.id]} alt={type.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-body font-bold text-primary-foreground/80 tracking-wider uppercase">
                    {type.badge}
                  </span>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-display font-bold text-foreground text-sm md:text-base group-hover:text-accent transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-body mt-0.5">{type.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {type.subtypes.slice(0, 3).map(sub => <span key={sub} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-body">
                        {sub}
                      </span>)}
                  </div>
                </div>
              </Link>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default CategoryShowcase;