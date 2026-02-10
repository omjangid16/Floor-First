import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import catWooden from "@/assets/cat-wooden.jpg";
import catTiles from "@/assets/cat-tiles.jpg";
import catCarpet from "@/assets/cat-carpet.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import catAllFlooring from "@/assets/cat-all-flooring.jpg";
import catFeatured from "@/assets/cat-featured-spc.jpg";

const mainCategories = [
  { title: "Wooden", image: catWooden, link: "/category/wood" },
  { title: "Tiles", image: catTiles, link: "/category/tile" },
  { title: "Carpet", image: catCarpet, link: "/category/carpet" },
  { title: "Outdoor", image: catOutdoor, link: "/category/outdoor" },
  { title: "All Flooring", image: catAllFlooring, link: "/category/all" },
];

const AppHomeCategories = () => {
  return (
    <div className="px-4 py-4">
      {/* Featured Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link
          to="/category/vinyl"
          className="block relative rounded-2xl overflow-hidden h-44 mb-4"
        >
          <img
            src={catFeatured}
            alt="SPC & LVT Flooring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-xl font-bold text-card">SPC & LVT Flooring</h2>
            <p className="text-xs text-card/70">Premium vinyl collection</p>
          </div>
        </Link>
      </motion.div>

      {/* Main Category Grid */}
      <h3 className="text-sm font-semibold text-foreground mb-3">Browse Categories</h3>
      <div className="grid grid-cols-2 gap-3">
        {mainCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={cat.link} className="block relative rounded-2xl overflow-hidden h-28">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <p className="absolute bottom-2.5 left-3 text-sm font-semibold text-card">
                {cat.title}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppHomeCategories;
