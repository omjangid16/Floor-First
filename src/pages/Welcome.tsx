import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import onboardWelcome from "@/assets/onboard-welcome.jpg";
import onboardBrowse from "@/assets/onboard-browse.jpg";
import onboardExpert from "@/assets/onboard-expert.jpg";

const slides = [
  {
    image: onboardWelcome,
    title: "Elevate Your\nLiving Space",
    description:
      "Premium flooring solutions crafted for modern homes, offices, and commercial spaces across the UAE.",
  },
  {
    image: onboardBrowse,
    title: "Discover &\nCompare",
    description:
      "Explore materials, patterns, and finishes. Find the perfect flooring that matches your vision.",
  },
  {
    image: onboardExpert,
    title: "Expert Guidance\nAt Your Fingertips",
    description:
      "Smart calculators, site visits, and instant quotes — everything you need, simplified.",
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
    <main className="fixed inset-0 bg-foreground overflow-hidden">
      {/* Full-screen background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Content positioned at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            {/* Headline */}
            <h1 className="text-[2rem] leading-[1.1] font-bold text-white tracking-tight whitespace-pre-line mb-3">
              {slides[current].title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/70 text-[0.95rem] leading-relaxed max-w-[300px] mb-10">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar: Skip — Dots — Next */}
        <div className="flex items-center justify-between">
          {/* Skip */}
          <Link
            to="/"
            className="text-white/50 text-sm font-medium tracking-wide hover:text-white/80 transition-colors"
          >
            Skip All
          </Link>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-7 bg-accent"
                    : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30 hover:brightness-110 active:scale-95 transition-all"
          >
            <ArrowRight className="w-5 h-5 text-accent-foreground" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
