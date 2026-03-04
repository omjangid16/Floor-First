import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";

import typeCarpet from "@/assets/type-carpet.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeTile from "@/assets/type-tile.jpg";

const bestSellers = [
  { title: "SPC Flooring", price: "AED 42/sqm", image: typeVinyl, link: "/products?type=vinyl" },
  { title: "Wooden", price: "AED 85/sqm", image: typeWood, link: "/products?type=wood" },
  { title: "Carpet", price: "AED 35/sqm", image: typeCarpet, link: "/products?type=carpet" },
  { title: "Tiles", price: "AED 28/sqm", image: typeTile, link: "/products?type=tile" },
];

const AppHomeBestSellers = () => {
  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Best Sellers</h2>
        <Link
          to="/products"
          className="flex items-center gap-1 text-xs font-medium text-accent"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 2-column grid on mobile, 3-4 on tablet */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bestSellers.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Link to={item.link} className="block group">
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-accent font-bold mt-0.5">{item.price}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <ShoppingCart className="w-3 h-3" />
                    Add to Cart
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <Link
        to="/products"
        className="block w-full mt-4 py-3 rounded-xl border border-border text-center text-sm font-semibold text-foreground hover:bg-muted transition-colors"
      >
        View All Products
      </Link>
    </div>
  );
};

export default AppHomeBestSellers;
