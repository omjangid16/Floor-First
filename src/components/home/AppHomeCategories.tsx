import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import typeTile from "@/assets/type-tile.jpg";
import typeStone from "@/assets/type-stone.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";
import typeRubber from "@/assets/type-rubber.jpg";

const mainCategory = {
  title: "Flooring",
  subtitle: "Explore all types",
  image: typeWood,
  link: "/products",
};

const subCategories = [
  { title: "Stairs", image: typeStone, link: "/products?type=stone" },
  { title: "Bathroom", image: typeTile, link: "/products?type=tile" },
  { title: "Wallpaper", image: typeVinyl, link: "/products?type=vinyl" },
  { title: "Kitchen", image: typeResin, link: "/products?type=tile" },
];

const AppHomeCategories = () => {
  return (
    <div className="px-4 py-4">
      {/* Main Category Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link
          to={mainCategory.link}
          className="block relative rounded-2xl overflow-hidden h-44 mb-4"
        >
          <img
            src={mainCategory.image}
            alt={mainCategory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-xl font-bold text-card">{mainCategory.title}</h2>
            <p className="text-xs text-card/70">{mainCategory.subtitle}</p>
          </div>
        </Link>
      </motion.div>

      {/* Sub Categories Grid */}
      <div className="grid grid-cols-4 gap-3">
        {subCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={cat.link} className="block text-center">
              <div className="rounded-2xl overflow-hidden h-20 mb-1.5">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-foreground">{cat.title}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppHomeCategories;
