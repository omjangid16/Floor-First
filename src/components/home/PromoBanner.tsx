import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Percent, Truck, Shield, Clock } from "lucide-react";

const promos = [
  {
    icon: Percent,
    title: "10% Off First Order",
    description: "New customers get 10% off on all flooring orders over AED 5,000",
    cta: "Shop Now",
    link: "/products",
    gradient: "from-accent to-burnt-orange-dark",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above AED 3,000 across Dubai & Sharjah",
    cta: "Learn More",
    link: "/services",
    gradient: "from-walnut to-walnut-light",
  },
  {
    icon: Shield,
    title: "Warranty Assured",
    description: "Up to lifetime warranty on premium stone and hardwood",
    cta: "View Products",
    link: "/products",
    gradient: "from-accent to-burnt-orange-light",
  },
  {
    icon: Clock,
    title: "Quick Installation",
    description: "Professional installation within 48 hours of order confirmation",
    cta: "Get Quote",
    link: "/get-quote",
    gradient: "from-walnut-light to-walnut",
  },
];

const PromoBanner = () => {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promos.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={promo.link}
                className="group block bg-card rounded-xl p-5 border border-border shadow-luxury hover-lift h-full"
              >
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center mb-3">
                  <promo.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-1.5 group-hover:text-accent transition-colors">
                  {promo.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3">{promo.description}</p>
                <span className="text-xs font-body font-semibold text-accent">{promo.cta} →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
