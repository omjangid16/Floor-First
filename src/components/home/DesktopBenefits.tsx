import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Shield, Clock, Award } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above AED 3,000" },
  { icon: Shield, title: "Up to Lifetime Warranty", desc: "On premium products" },
  { icon: Clock, title: "48hr Installation", desc: "Professional & certified" },
  { icon: Award, title: "Premium Quality", desc: "Sourced from top brands" },
];

const DesktopBenefits = () => {
  return (
    <section className="bg-background py-4">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="grid grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{b.title}</p>
                <p className="text-[11px] text-muted-foreground">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesktopBenefits;
