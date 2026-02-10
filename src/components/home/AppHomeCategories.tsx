import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import catFeatured from "@/assets/cat-featured-spc.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import catTiles from "@/assets/cat-tiles.jpg";
import catCarpet from "@/assets/cat-carpet.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import svcStairs from "@/assets/svc-stairs.jpg";
import svcBathroom from "@/assets/svc-bathroom.jpg";

const mainCategories = [
  { title: "Wooden", image: catWooden, link: "/calculator/wood" },
  { title: "Tiles", image: catTiles, link: "/calculator/tile" },
  { title: "Carpet", image: catCarpet, link: "/calculator/carpet" },
  { title: "Outdoor", image: catOutdoor, link: "/calculator/outdoor" },
];

const services = [
  { title: "Kitchen", image: svcKitchen, link: "/products?type=tile" },
  { title: "Stairs", image: svcStairs, link: "/products?type=wood" },
  { title: "Bathroom", image: svcBathroom, link: "/products?type=tile" },
];

const AppHomeCategories = () => {
  return (
    <div className="px-4 pb-6">
      {/* Featured Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/calculator/vinyl"
          className="block relative rounded-3xl overflow-hidden h-52 mb-2"
        >
          <img
            src={catFeatured}
            alt="SPC / LVT Flooring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
          {/* Popular badge */}
          <div className="absolute top-4 left-4">
            <span className="text-sm text-card/90 font-medium">Popular</span>
          </div>
          {/* Bottom text */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-3xl font-bold text-card leading-tight">SPC/LVT</h2>
            <p className="text-sm text-card/80 mt-0.5">Starting at AED 42/Sqmt</p>
          </div>
        </Link>
      </motion.div>

      {/* View All link */}
      <div className="flex justify-end mb-3">
        <Link to="/category/all" className="text-sm font-medium text-foreground">
          View All
        </Link>
      </div>

      {/* Main Category Grid — 4 in a row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {mainCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={cat.link} className="block text-center">
              <div className="aspect-square rounded-2xl overflow-hidden mb-1.5">
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

      {/* View All Products */}
      <div className="flex justify-center mb-8">
        <Link
          to="/category/all"
          className="text-sm font-medium text-foreground"
        >
          View All Products
        </Link>
      </div>

      {/* Services Section */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Services</h3>
        <div className="grid grid-cols-3 gap-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={svc.link} className="block text-center">
                <div className="aspect-square rounded-2xl overflow-hidden mb-1.5">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-foreground">{svc.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppHomeCategories;
