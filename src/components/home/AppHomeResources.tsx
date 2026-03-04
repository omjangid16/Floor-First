import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Ruler, Shield, HelpCircle } from "lucide-react";

const resources = [
  { title: "Care Tips", icon: Heart, link: "/help-center", color: "bg-accent/10 text-accent" },
  { title: "Size Guide", icon: Ruler, link: "/calculator", color: "bg-accent/10 text-accent" },
  { title: "Warranty", icon: Shield, link: "/help-center", color: "bg-accent/10 text-accent" },
  { title: "FAQ", icon: HelpCircle, link: "/help-center", color: "bg-accent/10 text-accent" },
];

const AppHomeResources = () => {
  return (
    <div className="px-4 py-4">
      <h2 className="text-base font-bold text-foreground mb-3">Resources</h2>

      <div className="grid grid-cols-4 gap-2.5">
        {resources.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={item.link}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border shadow-luxury hover:shadow-luxury-lg transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-medium text-foreground text-center">{item.title}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppHomeResources;
