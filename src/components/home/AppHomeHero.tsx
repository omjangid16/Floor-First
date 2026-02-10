import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const AppHomeHero = () => {
  return (
    <div className="px-4 pt-5 pb-2">
      {/* Top Bar — menu icon */}
      <div className="flex items-center justify-end mb-4">
        <button className="w-10 h-10 flex items-center justify-center">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Offer Pill */}
      <div className="flex justify-center mb-5">
        <div className="border-2 border-foreground rounded-full px-8 py-2.5">
          <span className="text-base font-semibold text-foreground">10% Off First Order</span>
        </div>
      </div>
    </div>
  );
};

export default AppHomeHero;
