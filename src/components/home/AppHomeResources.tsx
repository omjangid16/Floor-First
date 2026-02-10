import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Ruler, Shield, HelpCircle } from "lucide-react";

const resources = [
  { title: "Care Tips", icon: Heart, link: "/help-center" },
  { title: "Size Guide", icon: Ruler, link: "/calculator" },
  { title: "Warranty", icon: Shield, link: "/help-center" },
  { title: "FAQ", icon: HelpCircle, link: "/help-center" },
];

const AppHomeResources = () => {
  return (
    <div className="px-4 py-5">
      <h2 className="text-base font-bold text-foreground mb-4">Resources</h2>

      <div className="grid grid-cols-4 gap-3">
        {resources.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={item.link}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <item.icon className="w-5 h-5 text-foreground" />
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
