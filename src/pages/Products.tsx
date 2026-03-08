import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingCart, SlidersHorizontal, X, ChevronRight,
  Star, Eye, Grid3X3, LayoutGrid, Shield, Award, Wrench
} from "lucide-react";
import { products, flooringTypes, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ShadeSelector from "@/components/ShadeSelector";
import type { Shade } from "@/data/shades";
import {
  Dialog, DialogContent, DialogTitle, DialogDescription
} from "@/components/ui/dialog";

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

const trafficLevels = ["Low", "Medium", "High", "Very High"];
const spaceOptions = ["residential", "commercial", "industrial", "hospitality", "retail", "sports"];
const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "name", label: "Name A–Z" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "new", label: "Newest" },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeFilter = searchParams.get("type") || "";
  const searchFromUrl = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchFromUrl);
  const [selectedType, setSelectedType] = useState(typeFilter);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const [selectedTraffic, setSelectedTraffic] = useState<string>("");
  const [selectedSpace, setSelectedSpace] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const activeType = flooringTypes.find((t) => t.id === selectedType);

  const handleShadeSelect = (shade: Shade) => {
    setSelectedShade(selectedShade === shade.id ? null : shade.id);
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, 10, false);
    toast({ title: "Added to Cart", description: `${product.name} added (10 sqft).` });
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedType) result = result.filter((p) => p.type === selectedType);
    if (selectedShade) result = result.filter((p) => p.shade === selectedShade);
    if (selectedTraffic) result = result.filter((p) => p.trafficSuitability === selectedTraffic);
    if (selectedSpace) result = result.filter((p) => p.space.includes(selectedSpace));
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.pricePerSqft - b.pricePerSqft); break;
      case "price-high": result.sort((a, b) => b.pricePerSqft - a.pricePerSqft); break;
      case "popular": result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0)); break;
      case "new": result.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [selectedType, selectedShade, selectedTraffic, selectedSpace, search, sortBy]);

  const activeFilterCount = [selectedShade, selectedTraffic, selectedSpace].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedShade(null);
    setSelectedTraffic("");
    setSelectedSpace("");
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* ── Hero Header ────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-walnut" />
        <div className="relative container-luxury py-8 sm:py-12 lg:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] text-primary-foreground/40 mb-4">
            <Link to="/" className="hover:text-primary-foreground/70 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground/70 font-medium">
              {activeType ? activeType.name : "Products"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight">
            {activeType ? activeType.name : "Premium Flooring"}
          </h1>
          <p className="text-primary-foreground/50 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            {activeType
              ? `${activeType.description}. Best for: ${activeType.bestFor.join(", ")}.`
              : "Curated collections for every space and style."}
          </p>

          {activeType && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {activeType.subtypes.map((sub) => (
                <span key={sub} className="text-[10px] sm:text-xs bg-primary-foreground/10 text-primary-foreground/70 px-2.5 py-1 rounded-full font-medium">
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Type Chips (Horizontal Scroll on Mobile) ──────── */}
      <div className="container-luxury pt-5 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          <button
            onClick={() => setSelectedType("")}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              !selectedType
                ? "bg-foreground text-background shadow-md"
                : "bg-card text-foreground border border-border hover:border-accent/40"
            }`}
          >
            All
          </button>
          {flooringTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(selectedType === t.id ? "" : t.id)}
              className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === t.id
                  ? "bg-foreground text-background shadow-md"
                  : "bg-card text-foreground border border-border hover:border-accent/40"
              }`}
            >
              <img
                src={typeImages[t.id]}
                alt={t.name}
                className="w-6 h-6 rounded-lg object-cover"
              />
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="container-luxury">
        {/* ── Search & Controls ─────────────────────────────── */}
        <div className="space-y-3 mb-4">
          {/* Search Bar - Full Width */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort + Filter Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-3 pr-8 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:ring-2 focus:ring-accent/30 outline-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground rotate-90 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                showFilters || activeFilterCount > 0
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:border-accent/40"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-background text-foreground text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Expanded Filters ──────────────────────────────── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-luxury space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">Refine Results</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-[11px] text-accent font-semibold hover:underline flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear all
                    </button>
                  )}
                </div>

                {/* Mobile Sort */}
                <div className="sm:hidden">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sort By</p>
                  <div className="flex flex-wrap gap-1.5">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                          sortBy === opt.value
                            ? "bg-foreground text-background"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Traffic */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Traffic Level</p>
                  <div className="flex flex-wrap gap-1.5">
                    {trafficLevels.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTraffic(selectedTraffic === t ? "" : t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedTraffic === t
                            ? "bg-foreground text-background"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Space */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Space Type</p>
                  <div className="flex flex-wrap gap-1.5">
                    {spaceOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSpace(selectedSpace === s ? "" : s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                          selectedSpace === s
                            ? "bg-foreground text-background"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shade */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Shade</p>
                  <ShadeSelector selectedShade={selectedShade} onSelect={handleShadeSelect} compact />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results Count ──────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> products
            {activeFilterCount > 0 && (
              <span className="text-accent ml-1">· {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}</span>
            )}
          </p>
        </div>

        {/* ── Product Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.2), duration: 0.3 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-luxury hover-lift border border-border"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={typeImages[product.type] || typeTile}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2 left-2 gradient-accent text-accent-foreground text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                  {/* Quick View Overlay */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setPreviewProduct(product);
                    }}
                    className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <div className="bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3 h-3 text-foreground" />
                      <span className="text-[10px] font-semibold text-foreground">Quick View</span>
                    </div>
                  </button>
                </div>
              </Link>

              <div className="p-3 sm:p-4">
                {/* Category */}
                <p className="text-[9px] sm:text-[10px] text-accent font-bold uppercase tracking-[0.15em] mb-1">
                  {product.category}
                </p>

                {/* Name */}
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-1.5 sm:mb-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Description - hidden on mobile for compactness */}
                <p className="hidden sm:block text-[11px] text-muted-foreground line-clamp-2 mb-2.5 leading-relaxed">
                  {product.description}
                </p>

                {/* Durability Stars */}
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${
                          j < Math.round(product.durabilityScore / 2)
                            ? "text-accent fill-accent"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-muted-foreground ml-0.5">{product.durabilityScore}/10</span>
                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-foreground">
                      {product.currency} {product.pricePerSqft}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground">/sqft</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl gradient-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Empty State ────────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground mb-1">No products found</p>
            <p className="text-sm text-muted-foreground mb-5">Try adjusting your filters or search query.</p>
            <button
              onClick={clearFilters}
              className="gradient-accent text-accent-foreground px-5 py-2.5 rounded-xl font-semibold text-xs hover:opacity-90 transition-opacity"
            >
              Clear All Filters
            </button>
          </div>
        )}

      {/* ── Quick Preview Modal ──────────────────────────────── */}
      <Dialog open={!!previewProduct} onOpenChange={(open) => !open && setPreviewProduct(null)}>
        <DialogContent className="max-w-lg sm:max-w-xl p-0 rounded-2xl overflow-hidden border-border">
          {previewProduct && (
            <>
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={typeImages[previewProduct.type] || typeTile}
                  alt={previewProduct.name}
                  className="w-full h-full object-cover"
                />
                {previewProduct.badge && (
                  <span className="absolute top-3 left-3 gradient-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {previewProduct.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <DialogDescription className="text-[10px] text-accent font-bold uppercase tracking-[0.15em] mb-1">
                    {previewProduct.category}
                  </DialogDescription>
                  <DialogTitle className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                    {previewProduct.name}
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                    {previewProduct.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Material", value: previewProduct.material },
                    { label: "Finish", value: previewProduct.finish },
                    { label: "Warranty", value: previewProduct.warranty },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-secondary rounded-xl p-2.5 text-center">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">{spec.label}</p>
                      <p className="text-[11px] font-bold text-foreground mt-0.5 truncate">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Score Bars */}
                <div className="space-y-2">
                  {[
                    { label: "Durability", score: previewProduct.durabilityScore, icon: Shield },
                    { label: "Maintenance", score: previewProduct.maintenanceScore, icon: Wrench },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <item.icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-[11px] font-medium text-foreground w-20 shrink-0">{item.label}</span>
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score * 10}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full gradient-accent"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-foreground w-8 text-right">{item.score}/10</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Shield, text: "Genuine" },
                    { icon: Award, text: "Premium" },
                    { icon: Wrench, text: "Expert Install" },
                  ].map((badge) => (
                    <div key={badge.text} className="flex items-center gap-1 bg-secondary rounded-lg px-2 py-1">
                      <badge.icon className="w-3 h-3 text-accent" />
                      <span className="text-[9px] font-semibold text-foreground">{badge.text}</span>
                    </div>
                  ))}
                </div>

                {/* Price + Actions */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1">
                    <span className="text-xl font-bold text-foreground">
                      {previewProduct.currency} {previewProduct.pricePerSqft}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">/sqft</span>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(previewProduct);
                      setPreviewProduct(null);
                    }}
                    className="gradient-accent text-accent-foreground px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      setPreviewProduct(null);
                      navigate(`/products/${previewProduct.id}`);
                    }}
                    className="bg-foreground text-background px-4 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Full Details
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Products;
