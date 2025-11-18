import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { DemoButton } from "@/components/DemoButton";
import { ServiceCard } from "@/components/ServiceCard";
import { AIChatWidget } from "@/components/AIChatWidget";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
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
  const { toast } = useToast();
  
  const storyAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const services = [
    {
      id: 1,
      title: "AI Readiness Advisory",
      content: {
        purpose: "Assurance that outcomes are achievable with an accurate forecast of milestone risks",
        deliverables: "Data Quality Assessment, Risk & Opportunity Heatmap, AI Adoption Roadmap, Business Case with ROI",
        outcome: "Clear transformation pathway with executive confidence",
        value: "Entry point that creates demand and establishes buy-in and budget"
      }
    },
    {
      id: 2,
      title: "Platform Implementation",
      content: {
        purpose: "De-risked transformation, accurately budgeted, aligned to actual data maturity",
        deliverables: "EPM implementation, Data Warehouse & Analytics, CoA rationalisation, Governance reporting",
        outcome: "Modern finance infrastructure with clean data",
        value: "Revenue engine that builds the technical foundation for AI and surfaces data issues"
      }
    },
    {
      id: 3,
      title: "Data Enablement",
      content: {
        purpose: "AI platform that automates validation and reconciliation to save time, cost, and risk while exposing quick wins",
        deliverables: "Source system mapping, Reconciliation framework, Master data management, Data model architecture",
        outcome: "Future-proof foundation enabling AI and preventing decay",
        value: "Critical bridge between platform and AI"
      }
    },
    {
      id: 4,
      title: "AI Governance",
      content: {
        purpose: "Ongoing monitoring and maintenance that prevents accuracy decay and protects the investment",
        deliverables: "Agentic AI for data governance, Pattern recognition, Workflow nudges, Data quality scoring",
        outcome: "Assurance and optimisation without manual effort",
        value: "Value multiplier that extends ROI and supports recurring revenue"
      }
    },
    {
      id: 5,
      title: "Transformation Service",
      content: {
        purpose: '"AxionX Momentum" identifies revenue opportunities in data, producing monthly use-case reports humans miss',
        deliverables: "Agentic support and upgrades, Data performance optimisation agents, AaaS staff augmentation, AI agent evolution, Roadmap adaptation, Embedded advisor",
        outcome: "Alignment between finance, systems, and strategy",
        value: "Recurring revenue enabling land-and-expand"
      }
    }
  ];

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    try {
      const response = await fetch("https://formspree.io/f/mldodjpe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

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
      
      {/* Hero Section - iPhone optimized */}
      <section id="hero" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-24 sm:pt-0">
        <div className="relative z-10 w-full flex flex-col items-center px-6 sm:px-8 max-w-6xl mx-auto">
          {/* Logo - Mobile optimized sizing */}
          <div className="animate-fade-in w-full max-w-[300px] sm:max-w-2xl md:max-w-4xl flex justify-center mb-12 sm:mb-16 md:mb-20">
            <img 
              src={axionxLogo} 
              alt="AxionX Logo" 
              className="w-full md:px-8" 
              style={{
                clipPath: 'inset(0 40% 0 0)',
                transform: 'translateX(40px) translateY(-20px)'
              }} 
            />
          </div>
          
          {/* Hero Content - Enhanced typography and spacing */}
          <div className="text-center w-full">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto mb-12 sm:mb-16 px-4 leading-relaxed font-light">
              We deliver AI-powered Finance Transformation with guaranteed outcomes. 
              Fixing your data governance permanently, and your cost exposure.
            </p>
            <div className="flex flex-col items-center">
              <DemoButton variant="default" className="text-lg sm:text-xl px-10 sm:px-12 py-6 sm:py-7 min-h-[60px] w-full max-w-sm touch-manipulation font-medium" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Enhanced spacing and typography */}
      <section id="our-story" className="min-h-screen flex items-center justify-center overflow-hidden relative py-20 sm:py-32">
        <div 
          ref={storyAnimation.ref}
          className={`relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-14 lg:p-16 mx-6 sm:mx-8 max-w-5xl transition-all duration-1000 ${
            storyAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">Our Story</h2>
          <div className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed space-y-6">
            <p>
              Traditional consulting is no longer fit for a world where AI can reshape entire industries in months, not years.
            </p>
            <p>
              AxionX is an AI-first consulting model that blends deep domain expertise with autonomous execution. We design, build, and deploy intelligent finance and performance systems that run continuously, improve themselves, and deliver measurable value.
            </p>
            <p>
              AI is not a cost saving add-on. It's the difference between your organisation being relevant to your customers. Our customers are experiencing that with our operating model:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fixed-price, milestone-based, outcome-aligned</li>
              <li>AI agents working alongside human experts</li>
              <li>Real-time governance, not static documentation</li>
              <li>Owned delivery risk rather than "time & materials"</li>
              <li>Faster, repeatable, scalable transformation</li>
            </ul>
            <p className="font-medium">
              Book a 15 minute introduction call to understand our data readiness workshops to understand your AI ROI potential.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced spacing */}
      <section id="services" className="relative overflow-hidden py-24 sm:py-32 md:py-40">
        <div 
          ref={servicesAnimation.ref}
          className={`relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12 md:space-y-16 transition-all duration-1000 delay-200 ${
            servicesAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              content={service.content}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Contact Section - Enhanced spacing and typography */}
      <section id="contact" className="min-h-screen flex items-center justify-center overflow-hidden relative py-24 sm:py-32">
        <div 
          ref={contactAnimation.ref}
          className={`relative z-10 w-full max-w-3xl mx-6 sm:mx-8 transition-all duration-1000 delay-300 ${
            contactAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-14 lg:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-12 leading-tight">Contact Us</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-7 text-left">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-base sm:text-lg font-medium">Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[52px] text-base sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-base sm:text-lg font-medium">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your@email.com" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[52px] text-base sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-base sm:text-lg font-medium">Company</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[52px] text-base sm:text-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-base sm:text-lg font-medium">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your data and AI needs..." 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[160px] text-base sm:text-lg resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-sm" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[58px] text-lg sm:text-xl font-semibold touch-manipulation mt-8"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <AIChatWidget />
    </>
  );
};

export default Index;
