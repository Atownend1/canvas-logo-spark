import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg safe-top">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Services Button - Mobile optimized */}
          <Button
            onClick={() => scrollToSection('services')}
            className="rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-lg transition-all duration-300 min-h-[44px] min-w-[44px] px-4 sm:px-6 text-sm sm:text-base touch-manipulation"
            variant="outline"
          >
            Services
          </Button>

          {/* Center: Contact Button - Mobile optimized */}
          <Button
            onClick={() => scrollToSection('contact')}
            className="rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-lg transition-all duration-300 min-h-[44px] min-w-[44px] px-4 sm:px-6 text-sm sm:text-base touch-manipulation"
            variant="outline"
          >
            Contact
          </Button>

          {/* AI Chat Link - Mobile optimized */}
          <Link to="/chat">
            <Button
              className="rounded-full backdrop-blur-lg bg-primary/80 border border-primary/40 hover:bg-primary hover:border-primary/60 text-primary-foreground shadow-lg transition-all duration-300 min-h-[44px] min-w-[44px] px-4 sm:px-6 text-sm sm:text-base touch-manipulation flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </Button>
          </Link>

          {/* Right: AI Readiness Report Text - Hidden on mobile, shows on tablet+ */}
          <div className="hidden lg:block text-white font-medium text-xs sm:text-sm tracking-wider cursor-pointer touch-manipulation active:opacity-70" onClick={() => scrollToSection('contact')}>
            AI READINESS REPORT
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
