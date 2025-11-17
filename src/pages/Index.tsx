import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { DemoButton } from "@/components/DemoButton";
import { ServiceCard } from "@/components/ServiceCard";
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
      <section id="hero" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 sm:pt-0">
        <div className="relative z-10 w-full flex flex-col items-center px-4 sm:px-6">
          {/* Logo - Mobile optimized sizing */}
          <div className="animate-fade-in w-full max-w-[280px] sm:max-w-xl md:max-w-5xl flex justify-center my-8 sm:my-6 md:my-12">
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
          
          {/* Hero Content - iPhone optimized typography */}
          <div className="text-center mt-4 sm:mt-8 max-w-full">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6 px-4 leading-tight">
              Welcome to AxionX
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
              Transforming Data into Intelligence
            </p>
            <div className="flex flex-col items-center gap-3 px-4">
              <DemoButton variant="default" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 min-h-[56px] w-full max-w-xs touch-manipulation" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - iPhone optimized */}
      <section id="our-story" className="min-h-screen flex items-center justify-center overflow-hidden relative -mt-16 sm:-mt-[100px] py-12 sm:py-0">
        <div 
          ref={storyAnimation.ref}
          className={`relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-12 mx-4 sm:mx-6 max-w-4xl transition-all duration-1000 ${
            storyAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">Our Story</h2>
          <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
            AxionX isn't just another consultancy - it's a fundamental reimagining of how businesses integrate AI and data into their operations. You're creating a new category that bridges the gap between AI curiosity and practical execution, while simultaneously disrupting the traditional consulting model.
          </p>
        </div>
      </section>

      {/* Services Section - iPhone optimized */}
      <section id="services" className="relative overflow-hidden py-20 sm:py-24 md:py-32">
        <div 
          ref={servicesAnimation.ref}
          className={`relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10 md:space-y-12 transition-all duration-1000 delay-200 ${
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

      {/* Contact Section - iPhone optimized */}
      <section id="contact" className="min-h-screen flex items-center justify-center overflow-hidden relative pt-16 pb-10 sm:pt-10 sm:py-10 md:py-20">
        <div 
          ref={contactAnimation.ref}
          className={`relative z-10 w-full max-w-2xl mx-4 sm:mx-6 transition-all duration-1000 delay-300 ${
            contactAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-3 md:mb-4 leading-tight">Start Your Journey</h2>
            <p className="text-white text-sm sm:text-xs md:text-sm mb-6 sm:mb-6 md:mb-8 leading-relaxed">
              Ready to transform your business with AI and data? Let's talk.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 text-left">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[48px] text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your@email.com" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[48px] text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Company</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[48px] text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your data and AI needs..." 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[140px] text-base resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[52px] text-base font-semibold touch-manipulation"
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
