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
const typeImages = {
  tile: typeTile,
  stone: typeStone,
  wood: typeWood,
  vinyl: typeVinyl,
  resin: typeResin,
  carpet: typeCarpet,
  outdoor: typeOutdoor,
  rubber: typeRubber
};
const bestSellers = products.filter(p => p.badge === "Bestseller" || p.badge === "Best Value" || p.badge === "Trending").slice(0, 8);
const BestSellers = () => {
  const {
    addToCart
  } = useCart();
  return <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent font-body text-sm font-semibold mb-1 uppercase tracking-wider">Trending Now</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Best Sellers</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-2 text-accent font-body font-semibold text-sm hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, i) => <motion.div key={product.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: i * 0.05
        }} className="bg-card rounded-xl border border-border overflow-hidden shadow-luxury hover-lift group">
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <img src={typeImages[product.type] || typeTile} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && <span className="absolute top-2 left-2 gradient-accent text-accent-foreground text-[10px] font-body font-bold px-2.5 py-1 rounded-full">
                      {product.badge}
                    </span>}
                </div>
              </Link>
              <div className="p-3 md:p-4">
                <Link to={`/products/${product.id}`}>
                  <h4 className="font-display font-bold text-foreground text-sm leading-tight group-hover:text-accent transition-colors line-clamp-2">
                    {product.name}
                  </h4>
                </Link>
                <p className="text-[11px] text-muted-foreground font-body mt-1">{product.material}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />)}
                  <span className="text-[10px] text-muted-foreground font-body ml-1">(4.0)</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display font-bold text-foreground text-sm md:text-base">
                    AED {product.pricePerSqft}<span className="text-xs text-muted-foreground font-body font-normal">/sqft</span>
                  </span>
                  <button onClick={() => addToCart(product, 50, false)} className="p-2 rounded-lg gradient-accent text-accent-foreground hover:opacity-90 transition-opacity">
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>)}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/products" className="inline-flex items-center gap-2 gradient-accent text-accent-foreground px-6 py-3 rounded-lg font-body font-semibold text-sm">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>;
};
export default BestSellers;