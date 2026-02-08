import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, MessageCircle, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-flooring.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Premium flooring showroom" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/20" />
      </div>

      {/* Content */}
      <div className="relative container-luxury py-16 lg:py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent text-xs font-body font-semibold">Free Consultation + 10% Off First Order</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-5"
          >
            Transform Every
            <br />
            <span className="text-gradient-gold">Corner With Style</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-primary-foreground/70 font-body max-w-lg mb-8 leading-relaxed"
          >
            Choose the ideal flooring for your home or office. Browse 70K+ sqft of installed excellence across residential, commercial, and industrial spaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-7 py-3.5 rounded-lg font-body font-semibold text-base hover:opacity-90 transition-opacity shadow-lg"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20 px-7 py-3.5 rounded-lg font-body font-semibold text-base hover:bg-primary-foreground/20 transition-colors"
            >
              <Calculator className="w-5 h-5" /> Get Estimate
            </Link>
            <Link
              to="/help-center"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20 px-7 py-3.5 rounded-lg font-body font-semibold text-base hover:bg-primary-foreground/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> Consult Expert
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
