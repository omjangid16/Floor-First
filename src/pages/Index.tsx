import HeroSection from "@/components/home/HeroSection";
import PromoBanner from "@/components/home/PromoBanner";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import BestSellers from "@/components/home/BestSellers";
import SpaceShowcase from "@/components/home/SpaceShowcase";
import StatsSection from "@/components/home/StatsSection";
import InspirationPreview from "@/components/home/InspirationPreview";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <PromoBanner />
      <CategoryShowcase />
      <BestSellers />
      <SpaceShowcase />
      <StatsSection />
      <InspirationPreview />
      <ContactSection />
    </main>
  );
};

export default Index;
