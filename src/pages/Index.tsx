import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center calc(50% - 60px)',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Logo */}
      <div className="relative z-10 animate-fade-in w-full max-w-5xl mx-auto flex justify-center">
        <img 
          src={axionxLogo} 
          alt="AxionX Logo" 
          className="w-full px-8"
          style={{
            clipPath: 'inset(0 35% 0 0)',
            transform: 'translateX(0px) translateY(-50px)'
          }}
        />
      </div>
    </div>
  );
};

export default Index;
