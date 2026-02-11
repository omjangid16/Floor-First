import { useState, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Flame, ShoppingCart, Eye, Star, ChevronLeft } from "lucide-react";
import { segments, spaceFlooringTypes, type Segment, type FlooringType, type FlooringShade } from "@/data/segmentData";
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

type ViewState =
  | { level: "segments" }
  | { level: "types"; segment: Segment }
  | { level: "types-space"; spaceId: string; spaceName: string; types: FlooringType[] }
  | { level: "shades"; flooringType: FlooringType; parentLabel: string }
  | { level: "products"; shade: FlooringShade; flooringType: FlooringType; parentLabel: string };

const CategoryModule = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const spaceParam = searchParams.get("space");

  // Initialize view based on URL params
  const getInitialView = (): ViewState => {
    if (spaceParam) {
      const space = spaceFlooringTypes.find((s) => s.id === spaceParam);
      if (space) return { level: "types-space", spaceId: space.id, spaceName: space.name, types: space.flooringTypes };
    }
    return { level: "segments" };
  };

  const [view, setView] = useState<ViewState>(getInitialView);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(
    spaceParam ? "" : "residential"
  );

  // Auto-show types for selected segment
  const activeSegment = segments.find((s) => s.id === selectedSegmentId);

  const handleSegmentSelect = (seg: Segment) => {
    setSelectedSegmentId(seg.id);
    // Instantly show types (requirement C)
  };

  const handleTypeSelect = (ft: FlooringType, parentLabel: string) => {
    setView({ level: "shades", flooringType: ft, parentLabel });
  };

  const handleShadeSelect = (shade: FlooringShade, ft: FlooringType, parentLabel: string) => {
    setView({ level: "products", shade, flooringType: ft, parentLabel });
  };

  const handleBack = () => {
    if (view.level === "products") {
      setView({ level: "shades", flooringType: view.flooringType, parentLabel: view.parentLabel });
    } else if (view.level === "shades") {
      if (spaceParam) {
        const space = spaceFlooringTypes.find((s) => s.id === spaceParam);
        if (space) setView({ level: "types-space", spaceId: space.id, spaceName: space.name, types: space.flooringTypes });
        else setView({ level: "segments" });
      } else {
        setView({ level: "segments" });
      }
    } else if (view.level === "types-space") {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  // Filter products based on selected shade + flooring type
  const filteredProducts = useMemo(() => {
    if (view.level !== "products") return [];
    const ft = view.flooringType;
    const calcId = ft.calculatorId || "";
    // Get products matching the type
    let matched = products.filter((p) => p.type === calcId);
    // If few matches, show all of that type
    if (matched.length === 0) matched = products.filter((p) => p.type === calcId).slice(0, 8);
    if (matched.length === 0) matched = products.slice(0, 8);
    return matched;
  }, [view]);

  const pageTitle = view.level === "segments"
    ? "Browse Categories"
    : view.level === "types-space"
    ? (view as any).spaceName + " Flooring"
    : view.level === "shades"
    ? (view as any).flooringType.name
    : view.level === "products"
    ? (view as any).shade.name + " Products"
    : "Categories";

  return (
    <main className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 lg:max-w-7xl lg:mx-auto lg:px-8">
        <button onClick={handleBack} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
      </div>

      <div className="px-4 lg:max-w-7xl lg:mx-auto lg:px-8">
        {/* ═══ SEGMENTS VIEW ═══ */}
        {view.level === "segments" && (
          <div>
            {/* Segment Selector — 3 boxes */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {segments.map((seg) => {
                const active = selectedSegmentId === seg.id;
                return (
                  <button
                    key={seg.id}
                    onClick={() => handleSegmentSelect(seg)}
                    className={`relative rounded-2xl overflow-hidden h-24 lg:h-32 transition-all ${
                      active ? "ring-2 ring-accent shadow-lg" : "border border-border"
                    }`}
                  >
                    <img src={seg.image} alt={seg.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors ${active ? "bg-accent/30" : "bg-foreground/40"}`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm lg:text-base font-bold ${active ? "text-accent-foreground" : "text-card"}`}>
                        {seg.name}
                      </span>
                    </div>
                    {active && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-accent" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Flooring Types Grid — shown instantly on segment select */}
            {activeSegment && (
              <motion.div
                key={activeSegment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-6"
              >
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  {activeSegment.name} Flooring Types
                </p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                  {activeSegment.flooringTypes.map((ft) => (
                    <FlooringTypeCard
                      key={ft.id}
                      ft={ft}
                      onClick={() => handleTypeSelect(ft, activeSegment.name)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ═══ SPACE TYPES VIEW (Stairs/Kitchen/Bathroom) ═══ */}
        {view.level === "types-space" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {view.types.map((ft) => (
                <FlooringTypeCard
                  key={ft.id}
                  ft={ft}
                  onClick={() => handleTypeSelect(ft, view.spaceName)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ SHADES VIEW ═══ */}
        {view.level === "shades" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select a shade to view products
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {view.flooringType.shades.map((shade) => (
                <button
                  key={shade.id}
                  onClick={() => handleShadeSelect(shade, view.flooringType, view.parentLabel)}
                  className="group rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all text-left bg-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={shade.image}
                      alt={shade.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{shade.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{shade.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Calculator CTA */}
            {view.flooringType.calculatorId && (
              <Link
                to={`/calculator/${view.flooringType.calculatorId}`}
                className="flex items-center justify-between mt-6 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 hover:bg-accent/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Calculate Cost</p>
                    <p className="text-[10px] text-muted-foreground">Get instant estimate for {view.flooringType.name}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-accent" />
              </Link>
            )}
          </motion.div>
        )}

        {/* ═══ PRODUCTS VIEW — 2-per-row ═══ */}
        {view.level === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              {filteredProducts.length} products available
            </p>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-md transition-all"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={typeImages[product.type] || typeTile}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-3">
                    <p className="text-[10px] text-accent font-bold uppercase tracking-wider mb-0.5">{product.category}</p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xs lg:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[10px] text-muted-foreground line-clamp-1 mb-2">{product.pattern}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm lg:text-base font-bold text-foreground">{product.currency} {product.pricePerSqft}</span>
                        <span className="text-[10px] text-muted-foreground">/sqft</span>
                      </div>
                      <div className="flex gap-1.5">
                        <Link
                          to={`/products/${product.id}`}
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-foreground" />
                        </Link>
                        <button
                          onClick={() => addToCart(product, 10, false)}
                          className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-accent-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg font-bold text-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">Products for this selection coming soon.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
};

// ─── Flooring Type Card Component ───

const FlooringTypeCard = ({ ft, onClick }: { ft: FlooringType; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all text-left bg-card"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={ft.image}
        alt={ft.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {ft.isPopular && (
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold shadow-sm">
          <Flame className="w-3 h-3" /> Popular
        </span>
      )}
    </div>
    <div className="p-3">
      <p className="text-xs lg:text-sm font-bold text-foreground group-hover:text-accent transition-colors">{ft.name}</p>
      <p className="text-[11px] text-accent font-semibold mt-0.5">AED {ft.priceRange}/sqm</p>
    </div>
  </button>
);

export default CategoryModule;
