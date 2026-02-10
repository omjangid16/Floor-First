import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";

const AppHomeAllCategories = () => {
  return (
    <div className="px-4 py-5 space-y-6">
      <h2 className="text-base font-bold text-foreground">Browse Categories</h2>

      {categories.map((cat, ci) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: ci * 0.03 }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-2.5">{cat.name}</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {cat.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                to={`/products?type=${cat.id}&sub=${sub.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-muted shrink-0" />
                <span className="text-xs font-medium text-foreground leading-tight">{sub.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AppHomeAllCategories;
