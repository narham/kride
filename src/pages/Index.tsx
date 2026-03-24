import Header from "@/components/Header";
import GoPayCard from "@/components/GoPayCard";
import ServicesGrid from "@/components/ServicesGrid";
import BannerCarousel from "@/components/BannerCarousel";
import PromoSection from "@/components/PromoSection";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-lg">
        <GoPayCard />
        <ServicesGrid />
        <BannerCarousel />
        <PromoSection />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
