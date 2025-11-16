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

      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 py-20">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-5xl">
          <h2 className="text-4xl font-bold text-white mb-8">Services</h2>
          <div className="space-y-8 text-white">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Data & AI Readiness Advisory</h3>
              <p className="mb-2"><strong>Purpose:</strong> Assurance that outcomes are achievable with an accurate forecast of milestone risks</p>
              <p className="mb-2"><strong>Key deliverables:</strong> Data Quality Assessment, Risk & Opportunity Heatmap, AI Adoption Roadmap, Business Case with ROI</p>
              <p className="mb-2"><strong>Outcome:</strong> Clear transformation pathway with executive confidence</p>
              <p><strong>Value:</strong> Entry point that creates demand and establishes buy-in and budget</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">ERP, EPM & Data Warehouse Implementation</h3>
              <p className="mb-2"><strong>Purpose:</strong> De-risked transformation, accurately budgeted, aligned to actual data maturity</p>
              <p className="mb-2"><strong>Key deliverables:</strong> EPM implementation, Data Warehouse & Analytics, CoA rationalisation, Governance reporting</p>
              <p className="mb-2"><strong>Outcome:</strong> Modern finance infrastructure with clean data</p>
              <p><strong>Value:</strong> Revenue engine that builds the technical foundation for AI and surfaces data issues</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">Data Enablement Layer</h3>
              <p className="mb-2"><strong>Purpose:</strong> AI platform that automates validation and reconciliation to save time, cost, and risk while exposing quick wins</p>
              <p className="mb-2"><strong>Key deliverables:</strong> Source system mapping, Reconciliation framework, Master data management, Data model architecture</p>
              <p className="mb-2"><strong>Outcome:</strong> Future-proof foundation enabling AI and preventing decay</p>
              <p><strong>Value:</strong> Critical bridge between platform and AI</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">AI Automation & Governance</h3>
              <p className="mb-2"><strong>Purpose:</strong> Ongoing monitoring and maintenance that prevents accuracy decay and protects the investment</p>
              <p className="mb-2"><strong>Key deliverables:</strong> Agentic AI for data governance, Pattern recognition, Workflow nudges, Data quality scoring</p>
              <p className="mb-2"><strong>Outcome:</strong> Assurance and optimisation without manual effort</p>
              <p><strong>Value:</strong> Value multiplier that extends ROI and supports recurring revenue</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">Transformation-as-a-Service</h3>
              <p className="mb-2"><strong>Purpose:</strong> "AxionX Momentum" identifies revenue opportunities in data, producing monthly use-case reports humans miss</p>
              <p className="mb-2"><strong>Key deliverables:</strong> Agentic support and upgrades, Data performance optimisation agents, AaaS staff augmentation, AI agent evolution, Roadmap adaptation, Embedded advisor</p>
              <p className="mb-2"><strong>Outcome:</strong> Alignment between finance, systems, and strategy</p>
              <p><strong>Value:</strong> Recurring revenue enabling land-and-expand</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;