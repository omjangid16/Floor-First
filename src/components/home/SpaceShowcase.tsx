import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import spaceResidential from "@/assets/space-residential.jpg";
import spaceCommercial from "@/assets/space-commercial.jpg";
import spaceIndustrial from "@/assets/space-industrial.jpg";

const spaces = [
  {
    title: "Residential",
    subtitle: "Homes & Villas",
    image: spaceResidential,
    link: "/products?space=residential",
    count: "45+ Products",
  },
  {
    title: "Commercial",
    subtitle: "Offices & Retail",
    image: spaceCommercial,
    link: "/products?space=commercial",
    count: "38+ Products",
  },
  {
    title: "Industrial",
    subtitle: "Warehouses & Factories",
    image: spaceIndustrial,
    link: "/products?space=industrial",
    count: "24+ Products",
  },
];

const SpaceShowcase = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-luxury">
        <div className="mb-10">
          <p className="text-accent font-body text-sm font-semibold mb-1 uppercase tracking-wider">Browse by</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Spaces</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                className="group relative block rounded-xl overflow-hidden h-72 md:h-80 hover-lift"
              >
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-accent font-body font-semibold mb-1">{space.count}</p>
                  <h3 className="text-2xl font-display font-bold text-primary-foreground mb-0.5">{space.title}</h3>
                  <p className="text-sm text-primary-foreground/60 font-body mb-3">{space.subtitle}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-body font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
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

export default SpaceShowcase;
