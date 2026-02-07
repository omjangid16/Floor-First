import HeroSection from "@/components/home/HeroSection";
import BrowseSection from "@/components/home/BrowseSection";
import StatsSection from "@/components/home/StatsSection";
import InspirationPreview from "@/components/home/InspirationPreview";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <BrowseSection />
      <StatsSection />
      <InspirationPreview />
      <ContactSection />
    </main>
  );
};

export default Index;
