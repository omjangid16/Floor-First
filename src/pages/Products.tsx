import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { products, flooringTypes } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ShadeSelector from "@/components/ShadeSelector";
import type { Shade } from "@/data/shades";

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
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "new", label: "Newest" },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type") || "";
  const searchFromUrl = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchFromUrl);
  const [selectedType, setSelectedType] = useState(typeFilter);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const [selectedTraffic, setSelectedTraffic] = useState<string>("");
  const [selectedSpace, setSelectedSpace] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const activeType = flooringTypes.find((t) => t.id === selectedType);

  const handleShadeSelect = (shade: Shade) => {
    setSelectedShade(selectedShade === shade.id ? null : shade.id);
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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="gradient-walnut py-12 lg:py-16">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Browse our collections</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
            {activeType ? activeType.name : "Premium Flooring Products"}
          </h1>
          <p className="text-primary-foreground/60 font-body mt-3 max-w-xl">
            {activeType
              ? `${activeType.description}. Best for: ${activeType.bestFor.join(", ")}.`
              : "Choose the ideal flooring for your home or office and transform every corner with style and durability."}
          </p>
          {activeType && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeType.subtypes.map((sub) => (
                <span key={sub} className="text-xs bg-primary-foreground/10 text-primary-foreground/80 px-3 py-1.5 rounded-full font-body">{sub}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="container-luxury py-8 lg:py-12">
        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flooring products..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
            >
              <option value="">All Types</option>
              {flooringTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border bg-card font-body text-foreground focus:ring-2 focus:ring-accent outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border font-body text-sm font-medium transition-all ${
                showFilters || activeFilterCount > 0
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-foreground hover:border-accent"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-xl border border-border p-6 mb-6 shadow-luxury space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">Filter Products</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs font-body text-accent hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>

            {/* Traffic Suitability */}
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-2">Traffic Suitability</label>
              <div className="flex flex-wrap gap-2">
                {trafficLevels.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTraffic(selectedTraffic === t ? "" : t)}
                    className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                      selectedTraffic === t ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Space Suitability */}
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-2">Space Suitability</label>
              <div className="flex flex-wrap gap-2">
                {spaceOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSpace(selectedSpace === s ? "" : s)}
                    className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-all capitalize ${
                      selectedSpace === s ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Shade */}
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-2">Shade</label>
              <ShadeSelector selectedShade={selectedShade} onSelect={handleShadeSelect} compact />
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground font-body mb-6">
          Showing {filtered.length} products
          {activeFilterCount > 0 && <span className="text-accent"> · {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active</span>}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="group bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={typeImages[product.type] || typeTile}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 gradient-accent text-accent-foreground text-xs font-body font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-5">
                <p className="text-xs text-accent font-body font-bold uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-base font-display font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-3">
                  {product.description}
                </p>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground font-body">Durability:</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${j < Math.round(product.durabilityScore / 2) ? "text-accent fill-accent" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-body">from </span>
                    <span className="text-lg font-display font-bold text-foreground">{product.currency} {product.pricePerSqft}</span>
                    <span className="text-xs text-muted-foreground font-body">/sqft</span>
                  </div>
                  <button
                    onClick={() => addToCart(product, 10, false)}
                    className="p-2.5 rounded-lg gradient-accent text-accent-foreground hover:opacity-90 transition-opacity"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-display font-bold text-foreground mb-2">No products found</p>
            <p className="text-muted-foreground font-body mb-4">Try adjusting your filters or search query.</p>
            <button onClick={clearFilters} className="gradient-accent text-accent-foreground px-6 py-2.5 rounded-lg font-body font-semibold text-sm hover:opacity-90 transition-opacity">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
