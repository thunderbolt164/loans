import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import LoanTypesSection from "@/components/home/LoanTypesSection";
import BankPartnersSection from "@/components/home/BankPartnersSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <LoanTypesSection />
        <BankPartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
