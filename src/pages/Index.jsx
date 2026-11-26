import AppHomeHero from "@/components/home/AppHomeHero";
import AppHomeCategories from "@/components/home/AppHomeCategories";
import AppHomeBestSellers from "@/components/home/AppHomeBestSellers";
import AppHomeResources from "@/components/home/AppHomeResources";
import AppHomePromise from "@/components/home/AppHomePromise";
import AppHomeStats from "@/components/home/AppHomeStats";
import AppHomeHelpCenter from "@/components/home/AppHomeHelpCenter";
import DesktopHero from "@/components/home/DesktopHero";
import DesktopBenefits from "@/components/home/DesktopBenefits";
import DesktopCategories from "@/components/home/DesktopCategories";
import DesktopBestSellers from "@/components/home/DesktopBestSellers";
import DesktopSpaces from "@/components/home/DesktopSpaces";
import DesktopCTA from "@/components/home/DesktopCTA";
const Index = () => {
  return <main className="bg-background min-h-screen">
      {/* Mobile App Layout */}
      <div className="lg:hidden pb-4">
        <AppHomeHero />
        <AppHomeCategories />
        <AppHomeBestSellers />
        <AppHomeResources />
        <AppHomePromise />
        <AppHomeStats />
        <AppHomeHelpCenter />
      </div>

      {/* Desktop Website Layout */}
      <div className="hidden lg:block">
        <DesktopHero />
        <DesktopBenefits />
        <DesktopCategories />
        <DesktopBestSellers />
        <DesktopSpaces />
        <DesktopCTA />
      </div>
    </main>;
};
export default Index;