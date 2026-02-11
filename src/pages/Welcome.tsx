import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import floorFirstLogo from "@/assets/floor-first-logo.png";
import onboardWelcome from "@/assets/onboard-welcome.jpg";
import onboardBrowse from "@/assets/onboard-browse.jpg";
import onboardExpert from "@/assets/onboard-expert.jpg";

const slides = [
  {
    image: onboardWelcome,
    tag: "Welcome",
    title: "Elevate Your\nLiving Space",
    description:
      "Premium flooring solutions crafted for modern homes, offices, and commercial spaces across the UAE.",
  },
  {
    image: onboardBrowse,
    tag: "Explore",
    title: "Browse &\nCompare",
    description:
      "Discover materials, patterns, and finishes. Find the perfect flooring that matches your vision and budget.",
  },
  {
    image: onboardExpert,
    tag: "Connect",
    title: "Expert Guidance\nSimplified",
    description:
      "Smart calculators, on-site visits, and instant quotes — professional support at every step.",
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
    <main className="fixed inset-0 bg-black overflow-hidden select-none">
      {/* Full-screen background image with Ken Burns effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover will-change-transform"
            animate={{ scale: 1.05 }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

      {/* Top: Logo */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-14">
        <img
          src={floorFirstLogo}
          alt="Floor First"
          className="h-7 w-auto brightness-0 invert opacity-90"
        />
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {/* Tag */}
            <motion.span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              {slides[current].tag}
            </motion.span>

            {/* Headline */}
            <h1 className="text-[2.5rem] leading-[1.05] font-extrabold text-white tracking-tight whitespace-pre-line mb-4">
              {slides[current].title}
            </h1>

            {/* Divider line */}
            <div className="w-10 h-[2px] bg-accent mb-5" />

            {/* Subtitle */}
            <p className="text-white/60 text-[0.9rem] leading-[1.65] max-w-[280px] font-light">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-12">
          {/* Skip */}
          <Link
            to="/"
            className="text-white/40 text-[0.8rem] font-medium tracking-widest uppercase hover:text-white/70 transition-colors"
          >
            Skip
          </Link>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                className="h-[3px] rounded-full bg-white"
                animate={{
                  width: i === current ? 28 : 6,
                  opacity: i === current ? 1 : 0.25,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Next / Get Started button */}
          <motion.button
            onClick={handleNext}
            whileTap={{ scale: 0.92 }}
            className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:brightness-110 transition-all"
          >
            <ArrowRight className="w-5 h-5 text-accent-foreground" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
