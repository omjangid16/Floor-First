import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import catWooden from "@/assets/cat-wooden.jpg";
import catTiles from "@/assets/cat-tiles.jpg";
import catCarpet from "@/assets/cat-carpet.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import catAllFlooring from "@/assets/cat-all-flooring.jpg";
import catFeatured from "@/assets/cat-featured-spc.jpg";

const categories = [
  { title: "SPC & LVT", subtitle: "Premium vinyl collection", image: catFeatured, link: "/category/vinyl" },
  { title: "Wooden Flooring", subtitle: "Engineered, laminate & solid", image: catWooden, link: "/category/wood" },
  { title: "Tile Flooring", subtitle: "Ceramic, porcelain & more", image: catTiles, link: "/category/tile" },
  { title: "Carpet Flooring", subtitle: "Rugs, tiles & wall-to-wall", image: catCarpet, link: "/category/carpet" },
  { title: "Outdoor & Deck", subtitle: "Timber, WPC & pavers", image: catOutdoor, link: "/category/outdoor" },
  { title: "All Flooring", subtitle: "Explore every category", image: catAllFlooring, link: "/category/all" },
];

const DesktopCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Browse by</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Flooring Categories</h2>
          </div>
          <Link
            to="/category/all"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={cat.link}
                className="group block relative rounded-xl overflow-hidden h-52"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-card group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-card/70 mt-0.5">{cat.subtitle}</p>
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
