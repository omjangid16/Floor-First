import AppHomeHero from "@/components/home/AppHomeHero";
import AppHomeAllCategories from "@/components/home/AppHomeAllCategories";
import AppHomeBestSellers from "@/components/home/AppHomeBestSellers";
import AppHomeResources from "@/components/home/AppHomeResources";
import AppHomePromise from "@/components/home/AppHomePromise";
import DesktopHero from "@/components/home/DesktopHero";
import DesktopBenefits from "@/components/home/DesktopBenefits";
import DesktopAllCategories from "@/components/home/DesktopAllCategories";
import DesktopBestSellers from "@/components/home/DesktopBestSellers";
import DesktopSpaces from "@/components/home/DesktopSpaces";
import DesktopCTA from "@/components/home/DesktopCTA";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      {/* Mobile App Layout */}
      <div className="lg:hidden pb-4">
        <AppHomeHero />
        <AppHomeAllCategories />
        <AppHomeBestSellers />
        <AppHomeResources />
        <AppHomePromise />
      </div>

      {/* Desktop Website Layout */}
      <div className="hidden lg:block">
        <DesktopHero />
        <DesktopBenefits />
        <DesktopAllCategories />
        <DesktopBestSellers />
        <DesktopSpaces />
        <DesktopCTA />
      </div>
    </main>
  );
};

export default Index;
