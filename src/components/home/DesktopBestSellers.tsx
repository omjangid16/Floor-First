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
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold text-accent uppercase tracking-[0.15em] mb-1.5">Trending Now</p>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Best Sellers</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors group"
          >
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background rounded-2xl border border-border/60 overflow-hidden group hover-glow transition-all"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={typeImages[product.type] || typeTile}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 gradient-walnut text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full shadow-luxury">
                      {product.badge}
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-5">
                <Link to={`/products/${product.id}`}>
                  <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {product.name}
                  </h4>
                </Link>
                <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">{product.material}</p>
                <div className="flex items-center gap-0.5 mt-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? "fill-accent text-accent" : "text-border"}`} />
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-1.5 font-medium">(4.0)</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
                  <span className="text-lg font-extrabold text-foreground">
                    AED {product.pricePerSqft}
                    <span className="text-[11px] text-muted-foreground font-medium ml-0.5">/sqft</span>
                  </span>
                  <button
                    onClick={() => addToCart(product, 50, false)}
                    className="w-9 h-9 rounded-xl gradient-walnut text-primary-foreground flex items-center justify-center hover:shadow-luxury-lg hover:scale-105 transition-all duration-200"
                  >
                    <ShoppingCart className="w-4 h-4" />
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
