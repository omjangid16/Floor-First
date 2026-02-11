import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import floorFirstLogo from "@/assets/floor-first-logo.png";

const slides = [
  {
    title: "Welcome to Floor First",
    description: "Premium flooring solutions for modern residential, commercial, and industrial spaces across the UAE.",
  },
  {
    title: "Browse & Compare",
    description: "Explore flooring by material, type, and pattern. Compare prices and find the perfect match for your space.",
  },
  {
    title: "Get Expert Help",
    description: "Use our smart calculator, schedule site visits, and get instant quotes — all from your phone.",
  },
];

const Welcome = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const isLast = current === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate("/sign-in");
    } else {
      setCurrent((p) => p + 1);
    }
  };

  return (
    <main className="min-h-screen bg-card flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex-1 flex flex-col justify-center">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <img src={floorFirstLogo} alt="Floor First" className="h-14 w-auto object-contain" />
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <h2 className="text-xl font-bold text-foreground mb-3">
              {slides[current].title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed px-2">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-foreground" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-foreground text-card text-base font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {isLast ? "Get Started" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </button>

        <Link
          to="/"
          className="inline-block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors text-center w-full"
        >
          Skip All
        </Link>
      </div>
    </main>
  );
};

export default Welcome;
