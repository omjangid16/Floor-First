import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/data/categories";

// Reuse existing type images as subcategory placeholders
import typeTile from "@/assets/type-tile.jpg";
import typeStone from "@/assets/type-stone.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";
import typeRubber from "@/assets/type-rubber.jpg";

const categoryImages: Record<string, string> = {
  tile: typeTile,
  vinyl: typeVinyl,
  wood: typeWood,
  carpet: typeCarpet,
  concrete: typeStone,
  outdoor: typeOutdoor,
  resin: typeResin,
  rubber: typeRubber,
  stone: typeStone,
};

// Map subcategory slugs to images (fallback to parent category image)
const getSubImage = (catId: string) => categoryImages[catId] || typeTile;

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // "all" shows every category
  const isAll = categoryId === "all";
  const filteredCategories = isAll
    ? categories
    : categories.filter((c) => c.id === categoryId);

  const pageTitle = isAll
    ? "All Flooring Categories"
    : filteredCategories[0]?.name || "Category";

  return (
    <main className="bg-background min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8 xl:px-12 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium text-foreground">{pageTitle}</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">{pageTitle}</h1>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-0 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12 pb-8">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className={isAll ? "mb-8" : ""}>
            {isAll && (
              <h2 className="text-base lg:text-xl font-bold text-foreground mb-3 mt-4">
                {cat.name}
              </h2>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
              {cat.subcategories.map((sub, i) => (
                <motion.div
                  key={sub.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={`/products?type=${cat.id}&sub=${sub.slug}`}
                    className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all"
                  >
                    <div className="relative h-28 lg:h-36 overflow-hidden">
                      <img
                        src={getSubImage(cat.id)}
                        alt={sub.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs lg:text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {sub.name}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;
