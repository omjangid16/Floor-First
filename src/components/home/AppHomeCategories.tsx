import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import catFeatured from "@/assets/cat-featured-spc.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import catTiles from "@/assets/cat-tiles.jpg";
import catCarpet from "@/assets/cat-carpet.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import svcStairs from "@/assets/svc-stairs.jpg";
import svcBathroom from "@/assets/svc-bathroom.jpg";

const mainCategories = [
  { title: "Wooden", image: catWooden, link: "/calculator/wood" },
  { title: "Tiles", image: catTiles, link: "/calculator/tile" },
  { title: "Carpet", image: catCarpet, link: "/calculator/carpet" },
  { title: "Outdoor", image: catOutdoor, link: "/calculator/outdoor" },
];

const services = [
  { title: "Kitchen", image: svcKitchen, link: "/products?type=tile", desc: "Tiles & Stone" },
  { title: "Stairs", image: svcStairs, link: "/products?type=wood", desc: "Wood & Vinyl" },
  { title: "Bathroom", image: svcBathroom, link: "/products?type=tile", desc: "Waterproof" },
];

const AppHomeCategories = () => {
  return (
    <div className="px-4 pb-6">
      {/* Featured Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/calculator/vinyl"
          className="block relative rounded-3xl overflow-hidden h-52 mb-3"
        >
          <img
            src={catFeatured}
            alt="SPC / LVT Flooring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="text-xs text-card/90 font-medium bg-card/10 backdrop-blur-sm px-3 py-1 rounded-full">Popular</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-2xl font-bold text-card leading-tight">SPC / LVT</h2>
            <p className="text-sm text-card/80 mt-0.5">Starting at AED 42/sqm</p>
          </div>
        </Link>
      </motion.div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">Categories</h3>
        <Link to="/category/all" className="text-xs font-medium text-accent flex items-center gap-0.5">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Category Grid */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {mainCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={cat.link} className="block text-center group">
              <div className="aspect-square rounded-2xl overflow-hidden mb-1.5 border border-border">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-medium text-foreground">{cat.title}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Services Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-foreground">Services</h3>
          <Link to="/services" className="text-xs font-medium text-accent flex items-center gap-0.5">
            All Services <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={svc.link} className="block text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-1.5 border border-border">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-semibold text-foreground">{svc.title}</p>
                <p className="text-[10px] text-muted-foreground">{svc.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppHomeCategories;
