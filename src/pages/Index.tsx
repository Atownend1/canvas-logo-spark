import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <img 
              src={axionxLogo} 
              alt="AxionX Logo" 
              className="mx-auto mb-8 w-full max-w-2xl"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transform Your Digital Future
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Pioneering innovation through cutting-edge technology solutions that empower businesses to reach new heights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Why Choose AxionX?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-lg bg-card border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Experience unparalleled speed and performance that keeps you ahead of the competition
              </p>
            </div>
            
            <div className="p-8 rounded-lg bg-card border border-border hover:border-secondary transition-colors">
              <div className="w-12 h-12 bg-secondary rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Built with enterprise-grade security to protect your data and ensure 99.9% uptime
              </p>
            </div>
            
            <div className="p-8 rounded-lg bg-card border border-border hover:border-accent transition-colors">
              <div className="w-12 h-12 bg-accent rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Fully Customizable</h3>
              <p className="text-muted-foreground">
                Tailor every aspect to match your unique needs with our flexible platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Join thousands of businesses already transforming their digital presence with AxionX
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
