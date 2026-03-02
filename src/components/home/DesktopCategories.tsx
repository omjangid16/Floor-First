import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import catFeatured from "@/assets/cat-featured-spc.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import catTiles from "@/assets/cat-tiles.jpg";
import catCarpet from "@/assets/cat-carpet.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import catAllFlooring from "@/assets/cat-all-flooring.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import svcStairs from "@/assets/svc-stairs.jpg";
import svcBathroom from "@/assets/svc-bathroom.jpg";

const mainCategories = [
  { title: "Wooden", image: catWooden, link: "/calculator/wood" },
  { title: "Tiles", image: catTiles, link: "/calculator/tile" },
  { title: "Carpet", image: catCarpet, link: "/calculator/carpet" },
  { title: "Outdoor", image: catOutdoor, link: "/calculator/outdoor" },
  { title: "All Flooring", image: catAllFlooring, link: "/category/all" },
];

const services = [
  { title: "Kitchen", image: svcKitchen, link: "/products?type=tile" },
  { title: "Stairs", image: svcStairs, link: "/products?type=wood" },
  { title: "Bathroom", image: svcBathroom, link: "/products?type=tile" },
];

const DesktopCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        {/* Featured Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/category/vinyl"
            className="group block relative rounded-2xl overflow-hidden h-72 mb-6"
          >
            <img
              src={catFeatured}
              alt="SPC / LVT Flooring"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="text-sm text-card/90 font-medium bg-foreground/30 backdrop-blur-sm px-3 py-1 rounded-full">
                Popular
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl font-bold text-card leading-tight">SPC/LVT</h2>
              <p className="text-base text-card/80 mt-1">Starting at AED 42/Sqmt</p>
            </div>
          </Link>
        </motion.div>

        {/* Categories Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Browse by</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Categories</h2>
          </div>
          <Link
            to="/category/all"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-5 gap-5 mb-12">
          {mainCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={cat.link} className="group block text-center">
                <div className="aspect-square rounded-2xl overflow-hidden mb-2">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {cat.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Services</h2>
          <div className="grid grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={svc.link} className="group block text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-2">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {svc.title}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopCategories;
