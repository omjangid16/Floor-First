import AppHomeHero from "@/components/home/AppHomeHero";
import AppHomeCategories from "@/components/home/AppHomeCategories";
import AppHomeBestSellers from "@/components/home/AppHomeBestSellers";
import AppHomeResources from "@/components/home/AppHomeResources";
import AppHomePromise from "@/components/home/AppHomePromise";
import AppHomeStats from "@/components/home/AppHomeStats";
import AppHomeHelpCenter from "@/components/home/AppHomeHelpCenter";
import { AppHomeTestimonials } from "@/components/home/TestimonialsSection";
import { AppHomeTrustedBy } from "@/components/home/TrustedBySection";
import { AppHomeTrustBadges } from "@/components/home/TrustBadgesSection";
import { AppHomeFAQ } from "@/components/home/FAQSection";
import DesktopHero from "@/components/home/DesktopHero";
import DesktopBenefits from "@/components/home/DesktopBenefits";
import DesktopCategories from "@/components/home/DesktopCategories";
import DesktopBestSellers from "@/components/home/DesktopBestSellers";
import DesktopSpaces from "@/components/home/DesktopSpaces";
import DesktopCTA from "@/components/home/DesktopCTA";
import DesktopStats from "@/components/home/DesktopStats";
import { DesktopTestimonials } from "@/components/home/TestimonialsSection";
import { DesktopTrustedBy } from "@/components/home/TrustedBySection";
import { DesktopTrustBadges } from "@/components/home/TrustBadgesSection";
import { DesktopFAQ } from "@/components/home/FAQSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      {/* Mobile App Layout */}
      <div className="lg:hidden pb-4">
        <AppHomeHero />
        <AppHomeCategories />
        <AppHomeBestSellers />
        <AppHomeResources />
        <AppHomePromise />
        <AppHomeStats />
        <AppHomeTrustBadges />
        <AppHomeTestimonials />
        <AppHomeTrustedBy />
        <AppHomeFAQ />
        <AppHomeHelpCenter />
      </div>

      {/* Desktop Website Layout */}
      <div className="hidden lg:block">
        <DesktopHero />
        <DesktopBenefits />
        <DesktopCategories />
        <DesktopBestSellers />
        <DesktopSpaces />
        <DesktopStats />
        <DesktopTestimonials />
        <DesktopTrustedBy />
        <DesktopTrustBadges />
        <DesktopFAQ />
        <DesktopCTA />
      </div>
    </main>
  );
};

export default Index;
