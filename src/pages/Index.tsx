import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Animated Sunshine Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="sunshine-beam animate-sunshine" />
      </div>

      {/* Logo */}
      <div className="relative z-10 animate-fade-in">
        <img 
          src={axionxLogo} 
          alt="AxionX Logo" 
          className="w-full max-w-3xl px-8"
        />
      </div>
    </div>
  );
};

export default Index;
