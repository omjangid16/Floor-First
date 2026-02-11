import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import floorFirstLogo from "@/assets/floor-first-logo.png";
import onboardWelcome from "@/assets/onboard-welcome.jpg";
import onboardBrowse from "@/assets/onboard-browse.jpg";
import onboardExpert from "@/assets/onboard-expert.jpg";

const slides = [
  {
    image: onboardWelcome,
    title: "Welcome to Floor First",
    description:
      "Premium flooring solutions for modern residential, commercial, and industrial spaces across the UAE.",
  },
  {
    image: onboardBrowse,
    title: "Browse & Compare",
    description:
      "Explore flooring by material, type, and pattern. Compare prices and find the perfect match for your space.",
  },
  {
    image: onboardExpert,
    title: "Get Expert Help",
    description:
      "Use our smart calculator, schedule site visits, and get instant quotes — all from your phone.",
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
    <main className="min-h-screen bg-card flex flex-col">
      {/* Top: Logo bar */}
      <div className="px-6 pt-10 pb-4 flex items-center justify-center">
        <img
          src={floorFirstLogo}
          alt="Floor First"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Slide */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-sm flex flex-col items-center"
          >
            {/* Image */}
            <div className="w-full aspect-square max-w-[280px] rounded-3xl overflow-hidden mb-8 shadow-lg">
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <h2 className="text-xl font-bold text-foreground mb-2 text-center">
              {slides[current].title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed text-center px-4">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-10 w-full max-w-sm mx-auto">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-foreground" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Next / Get Started */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-foreground text-card text-base font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {isLast ? "Get Started" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Skip */}
        <Link
          to="/"
          className="block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          Skip All
        </Link>
      </div>
    </main>
  );
};

export default Welcome;
