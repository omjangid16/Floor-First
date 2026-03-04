import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";

import catFeatured from "@/assets/cat-featured-spc.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import catTiles from "@/assets/cat-tiles.jpg";
import catCarpet from "@/assets/cat-carpet.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import catAll from "@/assets/cat-all-flooring.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import svcStairs from "@/assets/svc-stairs.jpg";
import svcBathroom from "@/assets/svc-bathroom.jpg";

const mainCategories = [
  { title: "Wooden", image: catWooden, link: "/calculator/wood" },
  { title: "Tiles", image: catTiles, link: "/calculator/tile" },
  { title: "Carpet", image: catCarpet, link: "/calculator/carpet" },
  { title: "Outdoor", image: catOutdoor, link: "/calculator/outdoor" },
  { title: "All", image: catAll, link: "/categories" },
];

const services = [
  { title: "Kitchen", image: svcKitchen, link: "/categories?space=kitchen" },
  { title: "Stairs", image: svcStairs, link: "/categories?space=stairs" },
  { title: "Bathroom", image: svcBathroom, link: "/categories?space=bathroom" },
];

const AppHomeCategories = () => {
  return (
    <div className="px-4 pb-5 space-y-5">
      {/* Featured Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/calculator/vinyl"
          className="block relative rounded-2xl overflow-hidden h-48 md:h-56"
        >
          <img
            src={catFeatured}
            alt="SPC / LVT Flooring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-bold">
              <Flame className="w-3 h-3" />
              Popular
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-2xl font-bold text-card">SPC/LVT</h2>
            <p className="text-xs text-card/80 mt-0.5">Starting at AED 42/Sqmt</p>
          </div>
        </Link>
      </motion.div>

      {/* Shop by Category */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">Shop by Category</h2>
          <Link to="/categories" className="text-xs font-medium text-accent flex items-center gap-0.5">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Circular category icons — Noon style */}
        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
          {mainCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="shrink-0"
            >
              <Link to={cat.link} className="flex flex-col items-center gap-1.5 w-16">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-border shadow-luxury">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] font-medium text-foreground text-center">{cat.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-3">Services</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={svc.link} className="block group">
                <div className="aspect-square rounded-xl overflow-hidden mb-1.5 shadow-luxury">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-medium text-foreground text-center">{svc.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppHomeCategories;
