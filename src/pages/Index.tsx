import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Index = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  // Auto-flip cards back when scrolling away
  useEffect(() => {
    const handleScroll = () => {
      Object.keys(flippedCards).forEach((key) => {
        const cardNum = parseInt(key);
        const element = document.getElementById(`service-${cardNum}`);
        if (element && flippedCards[cardNum]) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
          if (!isInView) {
            setFlippedCards(prev => ({ ...prev, [cardNum]: false }));
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [flippedCards]);

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    try {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToNext = (nextId: string) => {
    const element = document.getElementById(nextId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* Service 1 */}
      <section id="service-1" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-10 py-10">
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
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 min-h-[300px] flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">AI Readiness Advisory</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[1] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-8 overflow-auto"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3 max-h-[250px] overflow-auto">
                  <p><strong>Purpose:</strong> Assurance that outcomes are achievable with an accurate forecast of milestone risks</p>
                  <p><strong>Key deliverables:</strong> Data Quality Assessment, Risk & Opportunity Heatmap, AI Adoption Roadmap, Business Case with ROI</p>
                  <p><strong>Outcome:</strong> Clear transformation pathway with executive confidence</p>
                  <p><strong>Value:</strong> Entry point that creates demand and establishes buy-in and budget</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-2'); }}
                  className="mt-4 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 2 */}
      <section id="service-2" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-10 py-10">
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
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 min-h-[300px] flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">Platform Implementation</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[2] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-8 overflow-auto"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3 max-h-[250px] overflow-auto">
                  <p><strong>Purpose:</strong> De-risked transformation, accurately budgeted, aligned to actual data maturity</p>
                  <p><strong>Key deliverables:</strong> EPM implementation, Data Warehouse & Analytics, CoA rationalisation, Governance reporting</p>
                  <p><strong>Outcome:</strong> Modern finance infrastructure with clean data</p>
                  <p><strong>Value:</strong> Revenue engine that builds the technical foundation for AI and surfaces data issues</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-3'); }}
                  className="mt-4 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 3 */}
      <section id="service-3" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-10 py-10">
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
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 min-h-[300px] flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">Data Enablement</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[3] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-8 overflow-auto"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3 max-h-[250px] overflow-auto">
                  <p><strong>Purpose:</strong> AI platform that automates validation and reconciliation to save time, cost, and risk while exposing quick wins</p>
                  <p><strong>Key deliverables:</strong> Source system mapping, Reconciliation framework, Master data management, Data model architecture</p>
                  <p><strong>Outcome:</strong> Future-proof foundation enabling AI and preventing decay</p>
                  <p><strong>Value:</strong> Critical bridge between platform and AI</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-4'); }}
                  className="mt-4 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 4 */}
      <section id="service-4" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-10 py-10">
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
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 min-h-[300px] flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">AI Governance</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[4] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-8 overflow-auto"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3 max-h-[250px] overflow-auto">
                  <p><strong>Purpose:</strong> Ongoing monitoring and maintenance that prevents accuracy decay and protects the investment</p>
                  <p><strong>Key deliverables:</strong> Agentic AI for data governance, Pattern recognition, Workflow nudges, Data quality scoring</p>
                  <p><strong>Outcome:</strong> Assurance and optimisation without manual effort</p>
                  <p><strong>Value:</strong> Value multiplier that extends ROI and supports recurring revenue</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('service-5'); }}
                  className="mt-4 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service 5 */}
      <section id="service-5" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-10 py-10">
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
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 min-h-[300px] flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h2 className="text-4xl font-bold text-white">Transformation Service</h2>
            </div>

            {/* Back - Content */}
            {flippedCards[5] && (
              <div 
                className="absolute inset-0 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-8 overflow-auto"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-xs space-y-3 max-h-[250px] overflow-auto">
                  <p><strong>Purpose:</strong> "AxionX Momentum" identifies revenue opportunities in data, producing monthly use-case reports humans miss</p>
                  <p><strong>Key deliverables:</strong> Agentic support and upgrades, Data performance optimisation agents, AaaS staff augmentation, AI agent evolution, Roadmap adaptation, Embedded advisor</p>
                  <p><strong>Outcome:</strong> Alignment between finance, systems, and strategy</p>
                  <p><strong>Value:</strong> Recurring revenue enabling land-and-expand</p>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); scrollToNext('contact'); }}
                  className="mt-4 cursor-pointer inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-10 py-10">
        <div className="relative z-10 w-full max-w-2xl mx-6">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Start Your Journey</h2>
            <p className="text-white text-sm mb-8">
              Ready to transform your business with AI and data? Let's talk.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your@email.com" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your data and AI needs..." 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
