import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import spaceResidential from "@/assets/space-residential.jpg";
import spaceCommercial from "@/assets/space-commercial.jpg";
import spaceIndustrial from "@/assets/space-industrial.jpg";

const spaces = [
  { title: "Residential", subtitle: "Homes & Villas", image: spaceResidential, link: "/products?space=residential", count: "45+ Products" },
  { title: "Commercial", subtitle: "Offices & Retail", image: spaceCommercial, link: "/products?space=commercial", count: "38+ Products" },
  { title: "Industrial", subtitle: "Warehouses & Factories", image: spaceIndustrial, link: "/products?space=industrial", count: "24+ Products" },
];

const DesktopSpaces = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="mb-8">
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Browse by</p>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Spaces</h2>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {spaces.map((space, i) => (
            <motion.div
              key={space.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={space.link}
                className="group relative block rounded-2xl overflow-hidden h-72 hover:shadow-luxury-lg transition-shadow"
              >
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[11px] text-accent font-semibold mb-1">{space.count}</p>
                  <h3 className="text-xl font-bold text-card mb-0.5">{space.title}</h3>
                  <p className="text-xs text-card/60 mb-3">{space.subtitle}</p>
                  <span className="inline-flex items-center gap-1 text-card text-xs font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesktopSpaces;
