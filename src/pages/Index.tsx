import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Index = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToNext = (nextId: string) => {
    const element = document.getElementById(nextId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHome = () => {
    const element = document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <Navigation />
      <ScrollToTop />
      
      {/* Up Arrow to Home */}
      <div 
        onClick={scrollToHome}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 cursor-pointer backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 shadow-lg"
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </div>
      
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center overflow-hidden relative">
        {/* Logo */}
        <div className="relative z-10 animate-fade-in w-full max-w-2xl md:max-w-5xl flex justify-center mx-4 md:mx-12 my-8 md:my-12 px-4 md:px-12 py-2 md:py-4">
          <img src={axionxLogo} alt="AxionX Logo" className="w-full md:px-8" style={{
            clipPath: 'inset(0 40% 0 0)',
            transform: 'translateX(40px) translateY(-20px)'
          }} />
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
          <p className="text-white text-lg leading-relaxed">
            AxionX isn't just another consultancy - it's a fundamental reimagining of how businesses integrate AI and data into their operations. You're creating a new category that bridges the gap between AI curiosity and practical execution, while simultaneously disrupting the traditional consulting model.
          </p>
        </div>
      </section>

      {/* Service 1 */}
      <section id="service-1" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 w-full max-w-2xl mx-6 text-center">
          <div 
            className="cursor-pointer transition-all duration-700 transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              transform: flippedCards[1] ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
            onClick={() => !flippedCards[1] && toggleCard(1)}
          >
            {/* Front - Title */}
            <div 
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">AI Readiness Advisory</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[1] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3">
                  <p><strong>Purpose:</strong> Assurance that outcomes are achievable with an accurate forecast of milestone risks</p>
                  <p><strong>Key deliverables:</strong> Data Quality Assessment, Risk & Opportunity Heatmap, AI Adoption Roadmap, Business Case with ROI</p>
                  <p><strong>Outcome:</strong> Clear transformation pathway with executive confidence</p>
                  <p><strong>Value:</strong> Entry point that creates demand and establishes buy-in and budget</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-2'); }}
                  className="mt-6 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 2 */}
      <section id="service-2" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 w-full max-w-2xl mx-6 text-center">
          <div 
            className="cursor-pointer transition-all duration-700 transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              transform: flippedCards[2] ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
            onClick={() => !flippedCards[2] && toggleCard(2)}
          >
            {/* Front - Title */}
            <div 
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">Platform Implementation</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[2] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3">
                  <p><strong>Purpose:</strong> De-risked transformation, accurately budgeted, aligned to actual data maturity</p>
                  <p><strong>Key deliverables:</strong> EPM implementation, Data Warehouse & Analytics, CoA rationalisation, Governance reporting</p>
                  <p><strong>Outcome:</strong> Modern finance infrastructure with clean data</p>
                  <p><strong>Value:</strong> Revenue engine that builds the technical foundation for AI and surfaces data issues</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-3'); }}
                  className="mt-6 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 3 */}
      <section id="service-3" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 w-full max-w-2xl mx-6 text-center">
          <div 
            className="cursor-pointer transition-all duration-700 transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              transform: flippedCards[3] ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
            onClick={() => !flippedCards[3] && toggleCard(3)}
          >
            {/* Front - Title */}
            <div 
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">Data Enablement</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[3] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3">
                  <p><strong>Purpose:</strong> AI platform that automates validation and reconciliation to save time, cost, and risk while exposing quick wins</p>
                  <p><strong>Key deliverables:</strong> Source system mapping, Reconciliation framework, Master data management, Data model architecture</p>
                  <p><strong>Outcome:</strong> Future-proof foundation enabling AI and preventing decay</p>
                  <p><strong>Value:</strong> Critical bridge between platform and AI</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-4'); }}
                  className="mt-6 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 4 */}
      <section id="service-4" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 w-full max-w-2xl mx-6 text-center">
          <div 
            className="cursor-pointer transition-all duration-700 transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              transform: flippedCards[4] ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
            onClick={() => !flippedCards[4] && toggleCard(4)}
          >
            {/* Front - Title */}
            <div 
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">AI Governance</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[4] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3">
                  <p><strong>Purpose:</strong> Ongoing monitoring and maintenance that prevents accuracy decay and protects the investment</p>
                  <p><strong>Key deliverables:</strong> Agentic AI for data governance, Pattern recognition, Workflow nudges, Data quality scoring</p>
                  <p><strong>Outcome:</strong> Assurance and optimisation without manual effort</p>
                  <p><strong>Value:</strong> Value multiplier that extends ROI and supports recurring revenue</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-5'); }}
                  className="mt-6 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 5 */}
      <section id="service-5" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 w-full max-w-2xl mx-6 text-center">
          <div 
            className="cursor-pointer transition-all duration-700 transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
              transform: flippedCards[5] ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
            onClick={() => !flippedCards[5] && toggleCard(5)}
          >
            {/* Front - Title */}
            <div 
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">Transformation Service</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[5] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3">
                  <p><strong>Purpose:</strong> "AxionX Momentum" identifies revenue opportunities in data, producing monthly use-case reports humans miss</p>
                  <p><strong>Key deliverables:</strong> Agentic support and upgrades, Data performance optimisation agents, AaaS staff augmentation, AI agent evolution, Roadmap adaptation, Embedded advisor</p>
                  <p><strong>Outcome:</strong> Alignment between finance, systems, and strategy</p>
                  <p><strong>Value:</strong> Recurring revenue enabling land-and-expand</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToHome(); }}
                  className="mt-6 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 3: Data Enablement Layer */}
      <section className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">3</div>
            <h2 className="text-4xl font-bold text-white">Data Enablement Layer</h2>
          </div>
          <div className="text-white text-sm space-y-4">
            <p><strong>Purpose:</strong> AI platform that automates validation and reconciliation to save time, cost, and risk while exposing quick wins</p>
            <p><strong>Key deliverables:</strong> Source system mapping, Reconciliation framework, Master data management, Data model architecture</p>
            <p><strong>Outcome:</strong> Future-proof foundation enabling AI and preventing decay</p>
            <p><strong>Value:</strong> Critical bridge between platform and AI</p>
          </div>
        </div>
      </section>

      {/* Service 4: AI Automation & Governance */}
      <section className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">4</div>
            <h2 className="text-4xl font-bold text-white">AI Automation & Governance</h2>
          </div>
          <div className="text-white text-sm space-y-4">
            <p><strong>Purpose:</strong> Ongoing monitoring and maintenance that prevents accuracy decay and protects the investment</p>
            <p><strong>Key deliverables:</strong> Agentic AI for data governance, Pattern recognition, Workflow nudges, Data quality scoring</p>
            <p><strong>Outcome:</strong> Assurance and optimisation without manual effort</p>
            <p><strong>Value:</strong> Value multiplier that extends ROI and supports recurring revenue</p>
          </div>
        </div>
      </section>

      {/* Service 5: Transformation-as-a-Service */}
      <section className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">5</div>
            <h2 className="text-4xl font-bold text-white">Transformation-as-a-Service</h2>
          </div>
          <div className="text-white text-sm space-y-4">
            <p><strong>Purpose:</strong> "AxionX Momentum" identifies revenue opportunities in data, producing monthly use-case reports humans miss</p>
            <p><strong>Key deliverables:</strong> Agentic support and upgrades, Data performance optimisation agents, AaaS staff augmentation, AI agent evolution, Roadmap adaptation, Embedded advisor</p>
            <p><strong>Outcome:</strong> Alignment between finance, systems, and strategy</p>
            <p><strong>Value:</strong> Recurring revenue enabling land-and-expand</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;