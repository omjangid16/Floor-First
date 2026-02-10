import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import floorFirstLogo from "@/assets/floor-first-logo.png";

const Welcome = () => {
  return (
    <main className="min-h-screen bg-card flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm text-center"
      >
        {/* Logo */}
        <div className="mb-12 flex flex-col items-center">
          <img src={floorFirstLogo} alt="Floor First" className="h-16 w-auto object-contain mb-4" />
        </div>

        {/* Welcome Text */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Welcome to Floor First
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium flooring solutions for modern spaces
          </p>
        </div>

        {/* Get Started Button */}
        <Link
          to="/sign-in"
          className="block w-full py-4 rounded-2xl bg-foreground text-card text-base font-semibold hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>

        {/* Skip */}
        <Link
          to="/"
          className="inline-block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </Link>
      </motion.div>
    </main>
  );
};

export default Welcome;
