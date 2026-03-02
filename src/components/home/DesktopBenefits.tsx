import { motion } from "framer-motion";
import { Truck, Shield, Clock, Award } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above AED 3,000", color: "bg-accent/10 text-accent" },
  { icon: Shield, title: "Lifetime Warranty", desc: "On premium products", color: "bg-emerald-500/10 text-emerald-600" },
  { icon: Clock, title: "48hr Installation", desc: "Professional & certified", color: "bg-blue-500/10 text-blue-600" },
  { icon: Award, title: "Premium Quality", desc: "Sourced from top brands", color: "bg-amber-500/10 text-amber-600" },
];

const DesktopBenefits = () => {
  return (
    <section className="bg-background py-5">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="grid grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover-lift cursor-default"
            >
              <div className={`w-11 h-11 rounded-xl ${b.color} flex items-center justify-center shrink-0`}>
                <b.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{b.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesktopBenefits;
