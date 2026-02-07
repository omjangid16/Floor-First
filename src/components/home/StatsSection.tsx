import { motion } from "framer-motion";
import { Home, DollarSign, AlertTriangle, TrendingUp, Volume2, Zap } from "lucide-react";

const stats = [
  { value: "70K+", label: "Sqft Floors Installed" },
  { value: "30+", label: "Team Members" },
  { value: "10+", label: "Yrs. of Experience" },
  { value: "68", label: "Sites Executed" },
];

const facts = [
  {
    icon: Home,
    value: "80%",
    description: "Of homeowners state that flooring is a top-3 factor defining their home's aesthetic impact.",
  },
  {
    icon: DollarSign,
    value: "+15%",
    description: "Increase in property resale value through premium upgrades like marble or engineered wood.",
  },
  {
    icon: AlertTriangle,
    value: "65%",
    description: "Of all premature flooring replacements are caused by substandard installation or materials.",
  },
  {
    icon: TrendingUp,
    value: "#1",
    description: 'Ranked attribute by owners: "Durability" (67%) outweighs visuals (41%) and maintenance (38%).',
  },
  {
    icon: Volume2,
    value: "-70%",
    description: "Noise reduction achieved in office and home environments by using high-grade acoustic vinyl or carpet.",
  },
  {
    icon: Zap,
    value: "Fast",
    description: "LVT (Luxury Vinyl Tile) is the fastest-growing sector in the UAE, expanding 65% in 2 years.",
  },
];

const StatsSection = () => {
  return (
    <>
      {/* Stats Counter */}
      <section className="gradient-walnut py-16 lg:py-20">
        <div className="container-luxury">
          <div className="text-center mb-8">
            <p className="text-primary-foreground/50 font-body text-sm uppercase tracking-wider mb-2">Confidence</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">Statistics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/60 font-body">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Facts */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container-luxury">
          <div className="mb-12">
            <p className="text-muted-foreground font-body text-sm mb-2">Customers say</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">Real Facts</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 shadow-luxury hover-lift border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <fact.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-3xl md:text-4xl font-display font-bold text-accent mb-3">{fact.value}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{fact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
