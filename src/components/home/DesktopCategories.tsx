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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        {/* Featured Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/category/vinyl"
            className="group block relative rounded-3xl overflow-hidden h-80 mb-8 shadow-luxury-lg"
          >
            <img
              src={catFeatured}
              alt="SPC / LVT Flooring"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="text-sm text-accent-foreground font-bold gradient-accent backdrop-blur-sm px-4 py-1.5 rounded-full shadow-glow-accent">
                Popular
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <h2 className="font-display text-5xl font-bold text-card leading-tight italic">SPC/LVT</h2>
              <p className="text-base text-card/80 mt-2 font-medium">Starting at AED 42/Sqmt</p>
            </div>
            <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-card" />
            </div>
          </Link>
        </motion.div>

        {/* Categories Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-1.5">Browse by</p>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Categories</h2>
          </div>
          <Link
            to="/category/all"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors group"
          >
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-5 gap-5 mb-16">
          {mainCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={cat.link} className="group block text-center">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 shadow-luxury hover-glow transition-all">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600 ease-out"
                  />
                </div>
                <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                  {cat.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-1.5">Expert</p>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Services</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={svc.link} className="group block relative rounded-2xl overflow-hidden aspect-[4/3] shadow-luxury hover-glow transition-all">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-lg font-bold text-card">{svc.title}</p>
                  </div>
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
