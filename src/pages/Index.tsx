import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const backgroundStyle = {
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center calc(50% - 60px)',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  };

  return (
    <>
      <Navigation />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center overflow-hidden relative" style={backgroundStyle}>
        {/* Logo */}
        <div className="relative z-10 animate-fade-in w-full max-w-5xl flex justify-center mx-[50px] my-[50px] px-[50px] py-[10px]">
          <img src={axionxLogo} alt="AxionX Logo" className="w-full px-8" style={{
            clipPath: 'inset(0 35% 0 0)',
            transform: 'translateX(80px) translateY(-50px)'
          }} />
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20" style={backgroundStyle}>
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Story</h2>
          <p className="text-foreground text-lg">Our Story Content</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20" style={backgroundStyle}>
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground mb-4">Services</h2>
          <p className="text-foreground text-lg">Services Content</p>
        </div>
      </section>
    </>
  );
};

export default Index;