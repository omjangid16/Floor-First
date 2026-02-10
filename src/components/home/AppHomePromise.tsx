import { motion } from "framer-motion";
import { Truck, Wrench, Star, ShieldCheck } from "lucide-react";

const promises = [
  { title: "On Time Delivery", icon: Truck },
  { title: "Expert Installation", icon: Wrench },
  { title: "High Quality Products", icon: Star },
  { title: "Warranty You Can Trust", icon: ShieldCheck },
];

const AppHomePromise = () => {
  return (
    <div className="px-4 py-5 mb-4">
      <h2 className="text-base font-bold text-foreground mb-4">Floor First Promise</h2>

      <div className="grid grid-cols-2 gap-3">
        {promises.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border"
          >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-foreground" />
            </div>
            <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppHomePromise;
