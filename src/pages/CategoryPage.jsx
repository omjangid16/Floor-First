import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calculator, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import typeTile from "@/assets/type-tile.jpg";
import typeStone from "@/assets/type-stone.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";
import typeRubber from "@/assets/type-rubber.jpg";
const categoryImages = {
  tile: typeTile,
  vinyl: typeVinyl,
  wood: typeWood,
  carpet: typeCarpet,
  concrete: typeStone,
  outdoor: typeOutdoor,
  resin: typeResin,
  rubber: typeRubber,
  stone: typeStone
};
const categoryDescriptions = {
  tile: "Elegant ceramic, porcelain, and mosaic tiles crafted for timeless beauty and durability.",
  vinyl: "Modern SPC, LVT, and WPC flooring — waterproof, stylish, and easy to install.",
  wood: "Classic engineered, laminate, and solid hardwood floors for warm, luxurious interiors.",
  carpet: "Soft, comfortable carpets and rugs in premium textures and patterns.",
  outdoor: "Weather-resistant decking and tiles built for Dubai's outdoor spaces.",
  concrete: "Industrial-chic polished and stamped concrete for contemporary spaces.",
  resin: "High-performance epoxy and polyurethane floors for commercial and industrial use.",
  rubber: "Shock-absorbing sports and gym flooring for safety and performance.",
  stone: "Natural marble, granite, and limestone for unmatched elegance."
};
const subcatBenefits = {
  "cement-tiles": "Handcrafted artisan patterns",
  "ceramic-tiles": "Affordable & versatile",
  "mosaic-tiles": "Intricate decorative designs",
  "porcelain-tiles": "Ultra-durable & low maintenance",
  "terrazzo-tiles": "Timeless aggregate beauty",
  "vitrified-tiles": "Stain-resistant & glossy",
  "lvt": "Wood & stone look, waterproof",
  "pvc-flooring": "Budget-friendly & easy install",
  "spc-flooring": "Rigid core, 100% waterproof",
  "vinyl-sheets": "Seamless, large-area coverage",
  "wpc-flooring": "Warm underfoot, waterproof",
  "engineered-wood": "Real wood, multi-layer stability",
  "laminate": "Affordable wood-look finish",
  "parquet": "Timeless geometric patterns",
  "solid-hardwood": "100% real wood luxury",
  "area-rugs": "Decorative accent pieces",
  "carpet-tiles": "Modular & easy to replace",
  "wall-to-wall-carpet": "Full room comfort & warmth",
  "outdoor-tiles": "Slip-resistant for outdoors",
  "stone-pavers": "Natural stone durability",
  "timber-decking": "Classic wood deck aesthetic",
  "wpc-decking": "Low-maintenance composite",
  "microtopping": "Ultra-thin cement overlay",
  "polished-concrete": "Sleek industrial finish",
  "screed": "Perfect leveling base",
  "stamped-concrete": "Decorative stamped patterns",
  "epoxy": "Chemical-resistant coating",
  "mma": "Fast-curing resin system",
  "pu-flooring": "Flexible polyurethane finish",
  "self-leveling-resin": "Seamless smooth surface",
  "pu-sports": "Shock-absorbing sports surface",
  "rubber-rolls": "Continuous gym flooring",
  "rubber-tiles": "Modular impact protection",
  "granite": "Extremely hard & durable",
  "limestone": "Soft, earthy elegance",
  "marble": "Luxurious veined beauty",
  "sandstone": "Warm natural tones",
  "slate": "Rustic textured appeal",
  "travertine": "Classic Mediterranean look"
};
const startingPrices = {
  "cement-tiles": 85,
  "ceramic-tiles": 45,
  "mosaic-tiles": 120,
  "porcelain-tiles": 65,
  "terrazzo-tiles": 150,
  "vitrified-tiles": 55,
  "lvt": 42,
  "pvc-flooring": 28,
  "spc-flooring": 48,
  "vinyl-sheets": 22,
  "wpc-flooring": 55,
  "engineered-wood": 95,
  "laminate": 38,
  "parquet": 130,
  "solid-hardwood": 180,
  "area-rugs": 75,
  "carpet-tiles": 35,
  "wall-to-wall-carpet": 45,
  "outdoor-tiles": 60,
  "stone-pavers": 90,
  "timber-decking": 120,
  "wpc-decking": 85,
  "microtopping": 70,
  "polished-concrete": 60,
  "screed": 35,
  "stamped-concrete": 55,
  "epoxy": 50,
  "mma": 80,
  "pu-flooring": 65,
  "self-leveling-resin": 75,
  "pu-sports": 60,
  "rubber-rolls": 40,
  "rubber-tiles": 45,
  "granite": 200,
  "limestone": 160,
  "marble": 250,
  "sandstone": 140,
  "slate": 130,
  "travertine": 180
};
const CategoryPage = () => {
  const {
    categoryId
  } = useParams();
  const isAll = categoryId === "all";
  const filteredCategories = isAll ? categories : categories.filter(c => c.id === categoryId);
  const pageTitle = isAll ? "All Flooring Categories" : filteredCategories[0]?.name || "Category";
  const heroImage = categoryId ? categoryImages[categoryId] : undefined;
  const description = categoryId ? categoryDescriptions[categoryId] : undefined;
  return <main className="bg-background min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden">
        {/* Hero Banner */}
        {!isAll && heroImage && <div className="relative h-48 overflow-hidden">
            <img src={heroImage} alt={pageTitle} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <button onClick={() => window.history.back()} className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h1 className="text-2xl font-bold text-card">{pageTitle}</h1>
              {description && <p className="text-xs text-card/80 mt-1 line-clamp-2">{description}</p>}
            </div>
          </div>}
        {(isAll || !heroImage) && <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
            </div>
          </div>}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8 xl:px-12">
        {!isAll && heroImage && <div className="relative rounded-2xl overflow-hidden h-64 mt-6 mb-6">
            <img src={heroImage} alt={pageTitle} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 text-card/70 text-sm mb-2">
                <Link to="/" className="hover:text-card transition-colors">Home</Link>
                <span>/</span>
                <span className="text-card font-medium">{pageTitle}</span>
              </div>
              <h1 className="text-4xl font-bold text-card tracking-tight">{pageTitle}</h1>
              {description && <p className="text-sm text-card/80 mt-2 max-w-xl">{description}</p>}
            </div>
          </div>}
        {(isAll || !heroImage) && <div className="pt-8 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium text-foreground">{pageTitle}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">{pageTitle}</h1>
          </div>}
      </div>

      {/* Calculator CTA */}
      {!isAll && filteredCategories[0] && <div className="px-4 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12 mb-4 mt-4 lg:mt-0">
          <Link to={`/calculator/${categoryId}`} className="flex items-center justify-between bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 hover:bg-accent/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center">
                <Calculator className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Calculate Cost</p>
                <p className="text-[10px] text-muted-foreground">Get instant estimate for {filteredCategories[0].name}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>
        </div>}

      {/* Content */}
      <div className="px-4 lg:px-0 lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12 pb-8">
        {filteredCategories.map(cat => <div key={cat.id} className={isAll ? "mb-8" : ""}>
            {isAll && <div className="flex items-end justify-between mt-6 mb-3">
                <h2 className="text-base lg:text-xl font-bold text-foreground">{cat.name}</h2>
                <Link to={`/category/${cat.id}`} className="text-xs text-accent font-semibold">View All</Link>
              </div>}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
              {cat.subcategories.map((sub, i) => <motion.div key={sub.slug} initial={{
            opacity: 0,
            y: 12
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.03
          }}>
                  <Link to={`/products?type=${cat.id}&sub=${sub.slug}`} className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all">
                    <div className="relative h-28 lg:h-36 overflow-hidden">
                      <img src={categoryImages[cat.id] || typeTile} alt={sub.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs lg:text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {sub.name}
                      </p>
                      {subcatBenefits[sub.slug] && <p className="text-[10px] text-muted-foreground mt-0.5">{subcatBenefits[sub.slug]}</p>}
                      {startingPrices[sub.slug] && <p className="text-[10px] font-semibold text-accent mt-1">
                          From AED {startingPrices[sub.slug]}/sqft
                        </p>}
                    </div>
                  </Link>
                </motion.div>)}
            </div>
          </div>)}
      </div>
    </main>;
};
export default CategoryPage;