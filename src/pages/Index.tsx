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
      <div className="relative z-10 animate-fade-in overflow-hidden max-w-2xl">
        <img 
          src={axionxLogo} 
          alt="AxionX Logo" 
          className="w-full px-8"
          style={{
            clipPath: 'inset(0 35% 0 0)'
          }}
        />
      </div>
    </div>
  );
};

export default Index;
