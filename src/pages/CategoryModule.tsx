import { useState, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Flame, ShoppingCart, Eye, Star, ChevronLeft } from "lucide-react";
import { segments, spaceFlooringTypes, type Segment, type MaterialCategory, type FlooringType, type FlooringPattern } from "@/data/segmentData";
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
  | { level: "materials"; segment: Segment }
  | { level: "materials-space"; spaceId: string; spaceName: string; materials: MaterialCategory[] }
  | { level: "flooring-types"; material: MaterialCategory; parentLabel: string }
  | { level: "patterns"; flooringType: FlooringType; material: MaterialCategory; parentLabel: string }
  | { level: "products"; pattern: FlooringPattern; flooringType: FlooringType; parentLabel: string };

const CategoryModule = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const spaceParam = searchParams.get("space");

  const getInitialView = (): ViewState => {
    if (spaceParam) {
      const space = spaceFlooringTypes.find((s) => s.id === spaceParam);
      if (space) return { level: "materials-space", spaceId: space.id, spaceName: space.name, materials: space.materials };
    }
    return { level: "segments" };
  };

  const [view, setView] = useState<ViewState>(getInitialView);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(spaceParam ? "" : "residential");

  const activeSegment = segments.find((s) => s.id === selectedSegmentId);

  const handleSegmentSelect = (seg: Segment) => {
    setSelectedSegmentId(seg.id);
    // Show materials instantly
  };

  const handleMaterialSelect = (mat: MaterialCategory, parentLabel: string) => {
    setView({ level: "flooring-types", material: mat, parentLabel });
  };

  const handleTypeSelect = (ft: FlooringType, mat: MaterialCategory, parentLabel: string) => {
    setView({ level: "patterns", flooringType: ft, material: mat, parentLabel });
  };

  const handlePatternSelect = (pattern: FlooringPattern, ft: FlooringType, parentLabel: string) => {
    setView({ level: "products", pattern, flooringType: ft, parentLabel });
  };

  const handleBack = () => {
    if (view.level === "products") {
      setView({ level: "patterns", flooringType: view.flooringType, material: { id: "", name: "", image: "", flooringTypes: [] }, parentLabel: view.parentLabel });
    } else if (view.level === "patterns") {
      setView({ level: "flooring-types", material: view.material, parentLabel: view.parentLabel });
    } else if (view.level === "flooring-types") {
      if (spaceParam) {
        const space = spaceFlooringTypes.find((s) => s.id === spaceParam);
        if (space) setView({ level: "materials-space", spaceId: space.id, spaceName: space.name, materials: space.materials });
        else setView({ level: "segments" });
      } else {
        setView({ level: "segments" });
      }
    } else if (view.level === "materials-space") {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const filteredProducts = useMemo(() => {
    if (view.level !== "products") return [];
    const calcId = view.flooringType.calculatorId || "";
    let matched = products.filter((p) => p.type === calcId);
    if (matched.length === 0) matched = products.slice(0, 8);
    return matched;
  }, [view]);

  const pageTitle =
    view.level === "segments" ? "Browse Categories"
    : view.level === "materials-space" ? view.spaceName + " Flooring"
    : view.level === "flooring-types" ? view.material.name
    : view.level === "patterns" ? view.flooringType.name + " Patterns"
    : view.level === "products" ? view.pattern.name + " Products"
    : "Categories";

  const breadcrumb =
    view.level === "flooring-types" ? view.parentLabel
    : view.level === "patterns" ? `${view.parentLabel} / ${view.material.name}`
    : view.level === "products" ? `${view.parentLabel} / ${view.flooringType.name}`
    : "";

  return (
    <main className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 lg:max-w-7xl lg:mx-auto lg:px-8">
        <button onClick={handleBack} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
          {breadcrumb && <p className="text-[10px] text-muted-foreground truncate">{breadcrumb}</p>}
        </div>
      </div>

      <div className="px-4 lg:max-w-7xl lg:mx-auto lg:px-8">
        {/* ═══ SEGMENTS VIEW ═══ */}
        {view.level === "segments" && (
          <div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {segments.map((seg) => {
                const active = selectedSegmentId === seg.id;
                return (
                  <button key={seg.id} onClick={() => handleSegmentSelect(seg)}
                    className={`relative rounded-2xl overflow-hidden h-24 lg:h-32 transition-all ${active ? "ring-2 ring-accent shadow-lg" : "border border-border"}`}>
                    <img src={seg.image} alt={seg.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors ${active ? "bg-accent/30" : "bg-foreground/40"}`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm lg:text-base font-bold ${active ? "text-accent-foreground" : "text-card"}`}>{seg.name}</span>
                    </div>
                    {active && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </div>

            {/* Materials — "By Material" */}
            {activeSegment && (
              <motion.div key={activeSegment.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mt-6">
                <p className="text-sm font-semibold text-muted-foreground mb-3">By Material</p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
                  {activeSegment.materials.map((mat) => (
                    <button key={mat.id} onClick={() => handleMaterialSelect(mat, activeSegment.name)}
                      className="group relative rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all text-left bg-card">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={mat.image} alt={mat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {mat.isPopular && (
                          <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold shadow-sm">
                            <Flame className="w-3 h-3" /> Popular
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-xs lg:text-sm font-bold text-foreground group-hover:text-accent transition-colors">{mat.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{mat.flooringTypes.length} types available</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ═══ SPACE MATERIALS (Kitchen/Stairs/Bathroom) ═══ */}
        {view.level === "materials-space" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-sm font-semibold text-muted-foreground mb-3">By Material</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
              {view.materials.map((mat) => (
                <button key={mat.id} onClick={() => handleMaterialSelect(mat, view.spaceName)}
                  className="group relative rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all text-left bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={mat.image} alt={mat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {mat.isPopular && (
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold shadow-sm">
                        <Flame className="w-3 h-3" /> Popular
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs lg:text-sm font-bold text-foreground group-hover:text-accent transition-colors">{mat.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{mat.flooringTypes.length} types available</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ FLOORING TYPES VIEW ═══ */}
        {view.level === "flooring-types" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">Select a flooring type</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {view.material.flooringTypes.map((ft) => (
                <button key={ft.id} onClick={() => handleTypeSelect(ft, view.material, view.parentLabel)}
                  className="group relative rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all text-left bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={ft.image} alt={ft.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
              ))}
            </div>

            {/* Calculator CTA */}
            {view.material.flooringTypes[0]?.calculatorId && (
              <Link to={`/calculator/${view.material.flooringTypes[0].calculatorId}`}
                className="flex items-center justify-between mt-6 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Calculate Cost</p>
                    <p className="text-[10px] text-muted-foreground">Get instant estimate for {view.material.name}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-accent" />
              </Link>
            )}
          </motion.div>
        )}

        {/* ═══ PATTERNS VIEW ═══ */}
        {view.level === "patterns" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">Select a pattern to view products</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {view.flooringType.patterns.map((pattern) => (
                <button key={pattern.id} onClick={() => handlePatternSelect(pattern, view.flooringType, view.parentLabel)}
                  className="group rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all text-left bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={pattern.image} alt={pattern.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{pattern.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{pattern.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ PRODUCTS VIEW — 2-per-row ═══ */}
        {view.level === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">{filteredProducts.length} products available</p>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {filteredProducts.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-md transition-all">
                  <Link to={`/products/${product.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={typeImages[product.type] || typeTile} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {product.badge && (
                        <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">{product.badge}</span>
                      )}
                    </div>
                  </Link>
                  <div className="p-3">
                    <p className="text-[10px] text-accent font-bold uppercase tracking-wider mb-0.5">{product.category}</p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xs lg:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-1">{product.name}</h3>
                    </Link>
                    <p className="text-[10px] text-muted-foreground line-clamp-1 mb-2">{product.pattern}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm lg:text-base font-bold text-foreground">{product.currency} {product.pricePerSqft}</span>
                        <span className="text-[10px] text-muted-foreground">/sqft</span>
                      </div>
                      <div className="flex gap-1.5">
                        <Link to={`/products/${product.id}`} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                          <Eye className="w-3.5 h-3.5 text-foreground" />
                        </Link>
                        <button onClick={() => addToCart(product, 10, false)} className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center hover:opacity-90 transition-opacity">
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

export default CategoryModule;
