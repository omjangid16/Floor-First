import AppHomeHero from "@/components/home/AppHomeHero";
import AppHomeCategories from "@/components/home/AppHomeCategories";
import AppHomeBestSellers from "@/components/home/AppHomeBestSellers";
import AppHomeResources from "@/components/home/AppHomeResources";
import AppHomePromise from "@/components/home/AppHomePromise";

const Index = () => {
  return (
    <main className="bg-background min-h-screen pb-4">
      <AppHomeHero />
      <AppHomeCategories />
      <AppHomeBestSellers />
      <AppHomeResources />
      <AppHomePromise />
    </main>
  );
};

export default Index;
