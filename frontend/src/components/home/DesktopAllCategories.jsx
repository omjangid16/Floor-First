import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
const DesktopAllCategories = () => {
  return <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="mb-10">
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Explore</p>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">All Categories</h2>
        </div>

        <div className="space-y-10">
          {categories.map((cat, ci) => <motion.div key={cat.id} initial={{
          opacity: 0,
          y: 16
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: ci * 0.03
        }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">{cat.name}</h3>
                <Link to={`/products?type=${cat.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
                {cat.subcategories.map(sub => <Link key={sub.slug} to={`/products?type=${cat.id}&sub=${sub.slug}`} className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-luxury transition-all">
                    <div className="w-12 h-12 rounded-lg bg-muted shrink-0 group-hover:bg-accent/10 transition-colors" />
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {sub.name}
                      </p>
                    </div>
                  </Link>)}
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default DesktopAllCategories;