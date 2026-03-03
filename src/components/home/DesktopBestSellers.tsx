import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

import typeTile from "@/assets/type-tile.jpg";
import typeStone from "@/assets/type-stone.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";
import typeRubber from "@/assets/type-rubber.jpg";

const typeImages: Record<string, string> = {
  tile: typeTile, stone: typeStone, wood: typeWood, vinyl: typeVinyl,
  resin: typeResin, carpet: typeCarpet, outdoor: typeOutdoor, rubber: typeRubber,
};

const bestSellers = products
  .filter((p) => p.badge === "Bestseller" || p.badge === "Best Value" || p.badge === "Trending")
  .slice(0, 8);

const DesktopBestSellers = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-10 bg-card">
      <div className="max-w-[1280px] mx-auto px-6 xl:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Best Sellers</h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-background rounded-xl border border-border overflow-hidden group hover:shadow-luxury transition-shadow"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={typeImages[product.type] || typeTile}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {product.name}
                  </h4>
                </Link>
                <p className="text-[11px] text-muted-foreground mt-1">{product.material}</p>
                <div className="flex items-center gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-accent text-accent" : "text-border"}`} />
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-1">(4.0)</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-base font-bold text-foreground">
                    AED {product.pricePerSqft}
                    <span className="text-[11px] text-muted-foreground font-normal">/sqft</span>
                  </span>
                  <button
                    onClick={() => addToCart(product, 50, false)}
                    className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesktopBestSellers;
