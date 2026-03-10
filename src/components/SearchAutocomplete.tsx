import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  showClear?: boolean;
}

const MAX_SUGGESTIONS = 6;

const SearchAutocomplete = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search products...",
  autoFocus = false,
  className = "",
  inputClassName = "",
  showClear = true,
}: SearchAutocompleteProps) => {
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!value || value.length < 2) return [];
    const q = value.toLowerCase();
    const seen = new Set<string>();
    const results: { id: string; name: string; type: string; price: number; currency: string }[] = [];

    for (const p of products) {
      if (
        (p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)) &&
        !seen.has(p.id)
      ) {
        seen.add(p.id);
        results.push({ id: p.id, name: p.name, type: p.type, price: p.pricePerSqft, currency: p.currency });
        if (results.length >= MAX_SUGGESTIONS) break;
      }
    }
    return results;
  }, [value]);

  const showDropdown = focused && value.length >= 2;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (productId: string) => {
    setFocused(false);
    navigate(`/products/${productId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setFocused(false);
      onSubmit(value.trim());
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            autoFocus={autoFocus}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className={
              inputClassName ||
              "w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all"
            }
          />
          {showClear && value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
          >
            {suggestions.length > 0 ? (
              <>
                <p className="px-3 pt-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Products
                </p>
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/60 transition-colors text-left"
                  >
                    <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground capitalize">{item.type}</p>
                    </div>
                    <span className="text-xs font-semibold text-accent shrink-0">
                      {item.currency} {item.price}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setFocused(false);
                    onSubmit(value.trim());
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 border-t border-border text-xs font-semibold text-accent hover:bg-muted/40 transition-colors"
                >
                  View all results <ArrowRight className="w-3 h-3" />
                </button>
              </>
            ) : (
              <div className="px-3 py-4 text-center">
                <p className="text-sm text-muted-foreground">No products found</p>
                <p className="text-[11px] text-muted-foreground/70 mt-0.5">Try a different search term</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAutocomplete;
