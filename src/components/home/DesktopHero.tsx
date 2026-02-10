import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Shield, Award, Truck } from "lucide-react";
import heroImage from "@/assets/hero-flooring.jpg";
import logo from "@/assets/floor-first-logo.png";

const DesktopHero = () => {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="grid grid-cols-2 gap-12 items-center min-h-[560px] py-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Floor First" className="h-10 w-auto object-contain" />
              <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                <span className="text-accent text-xs font-semibold">10% Off First Order</span>
              </div>
            </div>

            <h1 className="text-5xl xl:text-6xl font-extrabold text-foreground leading-[1.1] mb-5 tracking-tight">
              Premium Flooring
              <br />
              <span className="text-muted-foreground">for Modern Spaces</span>
            </h1>

            <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
              Dubai's trusted flooring partner. Browse 70K+ sqft of installed excellence across residential, commercial, and industrial spaces.
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 border-2 border-border text-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Calculator className="w-4 h-4" /> Get Estimate
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border">
              {[
                { icon: <Shield className="w-5 h-5 text-accent" />, value: "10 Year", label: "Warranty" },
                { icon: <Award className="w-5 h-5 text-accent" />, value: "68+", label: "Projects Done" },
                { icon: <Truck className="w-5 h-5 text-accent" />, value: "Free", label: "Delivery" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  {stat.icon}
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-luxury-lg">
              <img
                src={heroImage}
                alt="Premium flooring showroom"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <Link to="/get-quote" className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-luxury-lg border border-border px-5 py-3 hover:shadow-lg transition-shadow">
              <p className="text-xs text-muted-foreground">Free Consultation</p>
              <p className="text-sm font-bold text-accent">Book Today →</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesktopHero;
