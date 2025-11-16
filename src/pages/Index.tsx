import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <>
      <Navigation />
      <ScrollToTop />
      
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

      {/* Service 1: Data & AI Readiness Advisory */}
      <section id="services" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">1</div>
            <h2 className="text-4xl font-bold text-white">Data & AI Readiness Advisory</h2>
          </div>
          <div className="text-white text-sm space-y-4">
            <p><strong>Purpose:</strong> Assurance that outcomes are achievable with an accurate forecast of milestone risks</p>
            <p><strong>Key deliverables:</strong> Data Quality Assessment, Risk & Opportunity Heatmap, AI Adoption Roadmap, Business Case with ROI</p>
            <p><strong>Outcome:</strong> Clear transformation pathway with executive confidence</p>
            <p><strong>Value:</strong> Entry point that creates demand and establishes buy-in and budget</p>
          </div>
        </div>
      </section>

      {/* Service 2: ERP, EPM & Data Warehouse Implementation */}
      <section className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">2</div>
            <h2 className="text-4xl font-bold text-white">ERP, EPM & Data Warehouse Implementation</h2>
          </div>
          <div className="text-white text-sm space-y-4">
            <p><strong>Purpose:</strong> De-risked transformation, accurately budgeted, aligned to actual data maturity</p>
            <p><strong>Key deliverables:</strong> EPM implementation, Data Warehouse & Analytics, CoA rationalisation, Governance reporting</p>
            <p><strong>Outcome:</strong> Modern finance infrastructure with clean data</p>
            <p><strong>Value:</strong> Revenue engine that builds the technical foundation for AI and surfaces data issues</p>
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