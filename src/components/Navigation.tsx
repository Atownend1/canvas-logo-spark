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
          {/* Left: Services Button */}
          <Button
            onClick={() => scrollToSection('services')}
            className="rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-lg transition-all duration-300"
            variant="outline"
          >
            Services
          </Button>

          {/* Center: Contact Button */}
          <Button
            onClick={() => scrollToSection('contact')}
            className="rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-lg transition-all duration-300"
            variant="outline"
          >
            Contact
          </Button>

          {/* Right: AI Readiness Report Text */}
          <div className="hidden md:block text-white font-medium text-sm tracking-wider cursor-pointer" onClick={() => scrollToSection('contact')}>
            AI READINESS REPORT
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
