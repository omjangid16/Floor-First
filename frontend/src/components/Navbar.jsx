import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChevronDown,
  User,
  Search,
  ArrowRight,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  LogIn,
  LayoutGrid,
  Clock,
  Layers,
  Wrench,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import floorFirstLogo from "@/assets/floorfirst_final.svg";

// Image assets for Mega Menu
import typeStone from "@/assets/type-stone.jpg";
import typeTile from "@/assets/type-tile.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";
import spaceResidential from "@/assets/space-residential.jpg";
import calcSpaceOffice from "@/assets/calc-space-office.jpg";
import calcSpaceKitchen from "@/assets/calc-space-kitchen.jpg";
import calcSpaceHotel from "@/assets/calc-space-hotel.jpg";
import calcSpaceWarehouse from "@/assets/calc-space-warehouse.jpg";
import calcSpaceGym from "@/assets/calc-space-gym.jpg";
import shadeParquet from "@/assets/shade-parquet.jpg";
import shadeSolidHardwood from "@/assets/shade-solid-hardwood.jpg";
import shadeCeramicTiles from "@/assets/shade-ceramic-tiles.jpg";
import shadeMosaicTiles from "@/assets/shade-mosaic-tiles.jpg";
import svcStairs from "@/assets/svc-stairs.jpg";
import svcBathroom from "@/assets/svc-bathroom.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import shadeCementTiles from "@/assets/shade-cement-tiles.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";

// Products Mega Menu Data (matching uploaded designs)
const productsMegaMenu = {
  seeAllLink: "/products",
  seeAllText: "See all products",
  tabs: [

    //By material
    {
      id: "material",
      label: "By Material Type",
      icon: LayoutGrid,
      featured: {
        title: "Stone Flooring",
        subtitle: "Natural marble, granite, and limestone for premium spaces",
        link: "/products?type=stone",
        image: typeStone,
      },
      items: [
        {
          title: "Tile Flooring",
          desc: "Ceramic, porcelain, and decorative tiles",
          link: "/products?type=tile",
          image: typeTile,
        },
        {
          title: "Wooden Flooring",
          desc: "Hardwood, engineered, and laminate options",
          link: "/products?type=wood",
          image: typeWood,
        },
        {
          title: "Vinyl & Synthetic",
          desc: "Modern LVT and SPC for durability",
          link: "/products?type=vinyl",
          image: typeVinyl,
        },
        {
          title: "Resin & Industrial",
          desc: "Epoxy and polyurethane floors",
          link: "/products?type=resin",
          image: typeResin,
        },
        {
          title: "Carpet Flooring",
          desc: "Soft, comfortable carpets",
          link: "/products?type=carpet",
          image: typeCarpet,
        },
      ],
    },

    //By use and application
    {
      id: "application",
      label: "By Use/Application",
      icon: Clock,
      featured: {
        title: "Residential Flooring",
        subtitle: "Perfect solutions for homes and apartments",
        link: "/products?space=residential",
        image: spaceResidential,
      },
      items: [
        {
          title: "Commercial & Office",
          desc: "Professional flooring for workspaces",
          link: "/products?space=commercial",
          image: calcSpaceOffice,
        },
        {
          title: "Retail & Showroom",
          desc: "Eye-catching floors for businesses",
          link: "/products?space=retail",
          image: calcSpaceKitchen,
        },
        {
          title: "Hospitality",
          desc: "Premium hotel and restaurant floors",
          link: "/products?space=hospitality",
          image: calcSpaceHotel,
        },
        {
          title: "Industrial & Warehouse",
          desc: "Heavy-duty flooring solutions",
          link: "/products?space=industrial",
          image: calcSpaceWarehouse,
        },
        {
          title: "Gym & Sports",
          desc: "Specialized athletic flooring",
          link: "/products?space=gym",
          image: calcSpaceGym,
        },
      ],
    },

    //By design and pattern
    {
      id: "design",
      label: "By Design & Pattern",
      icon: Layers,
      featured: {
        title: "Herringbone",
        subtitle: "Classic V-shaped pattern for elegant spaces",
        link: "/products?search=herringbone",
        image: shadeParquet,
      },
      items: [
        {
          title: "Chevron",
          desc: "Pointed zigzag for modern aesthetics",
          link: "/products?search=chevron",
          image: shadeSolidHardwood,
        },
        {
          title: "Straight / Grid",
          desc: "Simple, clean alignment",
          link: "/products?search=straight",
          image: shadeCeramicTiles,
        },
        {
          title: "Geometric",
          desc: "Bold geometric patterns",
          link: "/products?search=geometric",
          image: shadeMosaicTiles,
        },
      ],
    },
  ],
};

// Services Mega Menu Data (matching uploaded designs)
const servicesMegaMenu = {
  seeAllLink: "/services",
  seeAllText: "See all services",
  tabs: [
    //core services
    {
      id: "core",
      label: "Core Services",
      icon: Wrench,
      featured: {
        title: "Residential Flooring",
        subtitle: "Complete flooring solutions for homes",
        link: "/services?type=residential",
        image: spaceResidential,
      },
      items: [
        {
          title: "Commercial Flooring",
          desc: "Professional installations for offices",
          link: "/services?type=commercial",
          image: calcSpaceOffice,
        },
        {
          title: "Industrial Flooring",
          desc: "Heavy-duty warehouse solutions",
          link: "/services?type=industrial",
          image: calcSpaceWarehouse,
        },
        {
          title: "Outdoor Flooring",
          desc: "Weather-resistant decking",
          link: "/services?type=outdoor",
          image: catOutdoor,
        },
      ],
    },
    //by featured and add on
    {
      id: "addon",
      label: "Featured & Add-On",
      icon: Sparkles,
      featured: {
        title: "Stair Cladding with Lighting",
        subtitle: "Premium stair solutions with integrated LED",
        link: "/services?addon=stairs",
        image: svcStairs,
      },
      items: [
        {
          title: "Bathroom Renovation",
          desc: "Complete bathroom flooring",
          link: "/services?addon=bathroom",
          image: svcBathroom,
        },
        {
          title: "Kitchen Renovation",
          desc: "Durable and stylish kitchen floors",
          link: "/services?addon=kitchen",
          image: svcKitchen,
        },
        {
          title: "Surface Preparation",
          desc: "Expert screeding and leveling",
          link: "/services?addon=surface-prep",
          image: shadeCementTiles,
        },
        {
          title: "Floor Restoration",
          desc: "Professional polishing services",
          link: "/services?addon=restoration",
          image: shadeParquet,
        },
      ],
    },
  ],
};

const dropdownMenus = {
  Inspiration: [
    { label: "Flooring by Space", path: "/products?space=residential" },
    { label: "Flooring by Finish", path: "/products?type=wood" },
    { label: "Project Gallery", path: "/our-works" },
    { label: "Floor Patterns Visual Guide", path: "/products?search=herringbone" },
  ],
  Resources: [
    { label: "Flooring Size Reference", path: "/calculator" },
    { label: "Maintenance & Care Tips", path: "/services" },
    { label: "Material Comparison", path: "/calculator" },
    { label: "Fun Flooring Facts", path: "/inspiration" },
    { label: "Blog / Guides", path: "/inspiration" },
  ],
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products", megaMenuKey: "products" },
  { label: "Services", path: "/services", megaMenuKey: "services" },
  { label: "Calculator", path: "/calculator" },
  { label: "Inspiration", path: "/inspiration", dropdownKey: "Inspiration" },
  { label: "Our Works", path: "/our-works" },
  { label: "Resources", path: "/resources", dropdownKey: "Resources" },
  { label: "About us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const profileMenuItems = [
  { label: "My Account", icon: User, path: "/profile/account" },
  { label: "My Orders", icon: Package, path: "/profile/orders" },
  { label: "Wishlist", icon: Heart, path: "/profile/wishlist" },
  { label: "Addresses", icon: MapPin, path: "/profile/addresses" },
  { label: "Settings", icon: Settings, path: "/profile/settings" },
];



const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null); // "Products" | "Services" | null
  const [activeProductTab, setActiveProductTab] = useState("material");
  const [activeServiceTab, setActiveServiceTab] = useState("core");
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const profileRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setOpenMenu(null);
    }
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/resources")
      return (
        location.pathname.startsWith("/resources") ||
        location.pathname.startsWith("/help-center")
      );
    return location.pathname.startsWith(path.split("?")[0]);
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Smooth hover open/close with debounce to bridge trigger <-> dropdown gap
  const handleTriggerMouseEnter = (label) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setOpenMenu(label);
  };

  const handleTriggerMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  };

  const handleMenuMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
  };

  const handleMenuMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  };

  // Resolve current active mega menu
  const currentMegaMenu =
    openMenu === "Products"
      ? productsMegaMenu
      : openMenu === "Services"
        ? servicesMegaMenu
        : null;

  const currentTabId =
    openMenu === "Products"
      ? activeProductTab
      : openMenu === "Services"
        ? activeServiceTab
        : null;

  const currentTabData =
    currentMegaMenu?.tabs.find((t) => t.id === currentTabId) ||
    currentMegaMenu?.tabs[0];

  const handleTabChange = (tabId) => {
    if (openMenu === "Products") setActiveProductTab(tabId);
    if (openMenu === "Services") setActiveServiceTab(tabId);
  };

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      {/* Top bar */}
      <div className="border-b border-border/80">
        <div className="max-w-[1280px] mx-auto px-6 xl:px-8 flex items-center justify-between h-[64px]">
          {/* Logo with tagline matching brand design */}
          <Link
            to="/"
            onClick={() => setOpenMenu(null)}
            className="flex items-center gap-3 shrink-0 mr-8"
          >
            <img
              src={floorFirstLogo}
              alt="Floor First"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search flooring, tiles, marble..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all font-body"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 ml-8 shrink-0">
            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setOpenMenu(null)}
              className="relative w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="User Profile"
              >
                <User className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-card rounded-xl border border-border shadow-luxury-lg overflow-hidden z-50"
                  >
                    {user ? (
                      <Link
                        to="/profile/account"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent text-xs">
                          {user.fullName?.charAt(0)?.toUpperCase() ||
                            user.email?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user.fullName || user.email?.split("@")[0]}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to="/sign-in"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <LogIn className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Login / Sign Up
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Access your account
                          </p>
                        </div>
                      </Link>
                    )}

                    <div className="h-px bg-border" />

                    <div className="py-1">
                      {profileMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {user && (
                      <>
                        <div className="h-px bg-border" />
                        <button
                          onClick={() => {
                            signOut();
                            setProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-6 bg-border mx-2" />

            <Link
              to="/get-quote"
              onClick={() => setOpenMenu(null)}
              className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Nav links bar */}
      <div className="max-w-[1280px] mx-auto px-6 xl:px-8 relative">
        <nav className="flex items-center gap-1 h-[48px]">
          {navItems.map((item) => {
            const isMega = Boolean(item.megaMenuKey);
            const isDropdown = Boolean(item.dropdownKey);
            const hasSubmenu = isMega || isDropdown;
            const isOpen = openMenu === item.label;
            const itemActive = isActive(item.path);
            const dropdownItems = item.dropdownKey
              ? dropdownMenus[item.dropdownKey]
              : null;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  hasSubmenu && handleTriggerMouseEnter(item.label)
                }
                onMouseLeave={() => hasSubmenu && handleTriggerMouseLeave()}
              >
                <Link
                  to={item.path}
                  onClick={() => setOpenMenu(null)}
                  className={`px-3.5 py-1.5 text-[13px] font-medium transition-all rounded-full flex items-center gap-1.5 ${
                    isOpen
                      ? "bg-muted text-foreground font-semibold shadow-xs"
                      : itemActive
                      ? "text-accent font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                  {hasSubmenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-foreground" : "opacity-60"
                      }`}
                    />
                  )}
                </Link>

                {/* Vertical Submenu Dropdown (for Inspiration, Resources, etc.) */}
                <AnimatePresence>
                  {isOpen && isDropdown && dropdownItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={handleMenuMouseEnter}
                      onMouseLeave={handleMenuMouseLeave}
                      className="absolute top-full left-0 mt-1.5 w-64 bg-card rounded-2xl shadow-xl border border-border/80 overflow-hidden py-1 z-50 divide-y divide-border/50"
                    >
                      {dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          onClick={() => setOpenMenu(null)}
                          className="block px-5 py-3.5 text-sm font-medium text-foreground hover:text-accent hover:bg-muted/50 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {openMenu && currentMegaMenu && currentTabData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.16 }}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
              className="absolute top-full left-6 right-6 xl:left-8 xl:right-8 bg-card rounded-2xl md:rounded-3xl shadow-2xl border border-border/80 overflow-hidden z-50 flex mt-1"
            >
              {/* Left Sidebar Tabs */}
              <div className="w-[260px] bg-[#FAF8F5] border-r border-border/70 p-5 flex flex-col justify-between shrink-0">
                <div className="space-y-1.5">
                  {currentMegaMenu.tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isTabActive = currentTabId === tab.id;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onMouseEnter={() => handleTabChange(tab.id)}
                        onClick={() => handleTabChange(tab.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-[13px] transition-all cursor-pointer ${isTabActive
                            ? "bg-[#FDF0E8] text-[#1E1E1E] font-semibold border border-[#F4DACB]/90 shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-black/5 font-medium"
                          }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${isTabActive ? "text-accent" : "text-muted-foreground"
                            }`}
                        />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <Link
                  to={currentMegaMenu.seeAllLink}
                  onClick={() => setOpenMenu(null)}
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 pt-6 mt-auto transition-colors group cursor-pointer"
                >
                  <span>{currentMegaMenu.seeAllText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 p-6 flex flex-col justify-start">
                {/* Top Featured Hero Banner */}
                {currentTabData.featured && (
                  <Link
                    to={currentTabData.featured.link}
                    onClick={() => setOpenMenu(null)}
                    className="relative h-36 lg:h-40 rounded-2xl overflow-hidden group block shadow-xs transition-shadow hover:shadow-md shrink-0"
                  >
                    <img
                      src={currentTabData.featured.image}
                      alt={currentTabData.featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

                    <span className="absolute top-3.5 right-4 bg-[#FF6B00] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      Featured
                    </span>

                    <div className="absolute bottom-4 right-4 text-white group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-5 max-w-lg z-10">
                      <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight leading-tight">
                        {currentTabData.featured.title}
                      </h3>
                      <p className="text-xs text-white/80 mt-1 font-body">
                        {currentTabData.featured.subtitle}
                      </p>
                    </div>
                  </Link>
                )}

                {/* Bottom Cards Grid */}
                <div
                  className={`mt-3.5 grid gap-3.5 ${currentTabData.items.length === 4
                      ? "grid-cols-2"
                      : "grid-cols-3"
                    }`}
                >
                  {currentTabData.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.link}
                      onClick={() => setOpenMenu(null)}
                      className="relative h-28 lg:h-32 rounded-xl overflow-hidden group block shadow-xs transition-shadow hover:shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" />
                      <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                        <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-white/75 mt-0.5 line-clamp-1 font-body">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
