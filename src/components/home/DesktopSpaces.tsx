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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="mb-10">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-1.5">Browse by</p>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Spaces</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {spaces.map((space, i) => (
            <motion.div
              key={space.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={space.link}
                className="group relative block rounded-3xl overflow-hidden h-80 shadow-luxury hover:shadow-luxury-xl transition-all duration-300"
              >
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="inline-block gradient-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-full mb-3 shadow-glow-accent">
                    {space.count}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-card italic mb-0.5">{space.title}</h3>
                  <p className="text-xs text-card/60 mb-4 font-medium">{space.subtitle}</p>
                  <span className="inline-flex items-center gap-1.5 text-card text-xs font-semibold group-hover:gap-2.5 transition-all duration-300">
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
