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

const typeImages: Record<string, string> = {
  tile: typeTile, stone: typeStone, wood: typeWood, vinyl: typeVinyl,
  resin: typeResin, carpet: typeCarpet, outdoor: typeOutdoor, rubber: typeRubber,
};

const DesktopCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Browse by</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Flooring Types</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {flooringTypes.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/products?type=${type.id}`}
                className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-all hover:shadow-luxury"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={typeImages[type.id]}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1">{type.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {type.subtypes.slice(0, 3).map((sub) => (
                      <span key={sub} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesktopCategories;
