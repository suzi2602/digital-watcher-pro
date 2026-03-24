import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AnalyzerSection from "@/components/AnalyzerSection";
import SafetyTips from "@/components/SafetyTips";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AnalyzerSection />
      <SafetyTips />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 ShieldHer — Empowering women's digital safety</p>
      </footer>
    </div>
  );
};

export default Index;
