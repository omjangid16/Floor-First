import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import typeCarpet from "@/assets/type-carpet.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";

const bestSellers = [
  { title: "SPC Flooring", image: typeVinyl, link: "/products?type=vinyl" },
  { title: "Wooden", image: typeWood, link: "/products?type=wood" },
  { title: "Carpet", image: typeCarpet, link: "/products?type=carpet" },
];

const AppHomeBestSellers = () => {
  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-foreground">Best Seller</h2>
        <Link
          to="/products"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {bestSellers.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="shrink-0 w-32"
          >
            <Link to={item.link} className="block">
              <div className="rounded-2xl overflow-hidden h-32 mb-2 bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-foreground text-center">{item.title}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Products Button */}
      <Link
        to="/products"
        className="block w-full mt-5 py-3.5 rounded-2xl border-2 border-border text-center text-sm font-semibold text-foreground hover:bg-muted transition-colors"
      >
        View All Products
      </Link>
    </div>
  );
};

export default AppHomeBestSellers;
