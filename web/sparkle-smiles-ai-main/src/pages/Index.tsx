import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import BenefitsSection from "@/components/BenefitsSection";
import FlavorsSection from "@/components/FlavorsSection";
import HowToUseSection from "@/components/HowToUseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <FlavorsSection />
      <HowToUseSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
