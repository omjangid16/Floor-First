import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileHeader from "@/components/MobileHeader";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Services from "./pages/Services";
import Inspiration from "./pages/Inspiration";
import InspirationDetail from "./pages/InspirationDetail";
import Calculator from "./pages/Calculator";
import CategoryCalculator from "./pages/CategoryCalculator";
import OurWorks from "./pages/OurWorks";
import ProjectDetail from "./pages/ProjectDetail";
import GetQuote from "./pages/GetQuote";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OtpVerification from "./pages/OtpVerification";
import ForgotPassword from "./pages/ForgotPassword";
import CategoryPage from "./pages/CategoryPage";
import CategoryModule from "./pages/CategoryModule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const authRoutes = ["/welcome", "/sign-in", "/sign-up", "/otp-verification", "/forgot-password"];

const AppLayout = () => {
  const location = useLocation();
  const isAuth = authRoutes.includes(location.pathname);

  return (
    <>
      {/* Desktop navbar - hidden on mobile */}
      {!isAuth && <Navbar />}
      {/* Mobile/tablet header - hidden on desktop */}
      {!isAuth && <MobileHeader />}
      <div className={!isAuth ? "pb-16 lg:pb-0" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/categories" element={<CategoryModule />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/inspiration/:id" element={<InspirationDetail />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/calculator/:categoryId" element={<CategoryCalculator />} />
          <Route path="/our-works" element={<OurWorks />} />
          <Route path="/our-works/:id" element={<ProjectDetail />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* Footer only on desktop */}
      {!isAuth && <div className="hidden lg:block"><Footer /></div>}
      {/* Bottom nav only on non-auth pages, hidden on calculator */}
      {!isAuth && !location.pathname.startsWith("/calculator/") && <MobileBottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
