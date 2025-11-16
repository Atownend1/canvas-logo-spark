import { Button } from "@/components/ui/button";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Our Story Button */}
          <Button
            onClick={() => scrollToSection('our-story')}
            className="rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-lg transition-all duration-300"
            variant="outline"
          >
            Our Story
          </Button>

          {/* Center: AI Readiness Report Text */}
          <div className="hidden md:block text-white font-medium text-sm tracking-wider cursor-pointer" onClick={() => scrollToSection('contact')}>
            AI READINESS REPORT
          </div>

          {/* Right: Services Button */}
          <Button
            onClick={() => scrollToSection('service-1')}
            className="rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-lg transition-all duration-300"
            variant="outline"
          >
            Services
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
