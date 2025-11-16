import heroBackground from "@/assets/hero-background.png";
import axionxLogo from "@/assets/axionx-logo.png";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
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

  const activeCard = Object.keys(flippedCards).find(key => flippedCards[parseInt(key)]);

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
      <section id="our-story" className="min-h-screen flex items-center justify-center overflow-hidden relative -mt-[100px]">
        <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 mx-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
          <p className="text-white text-lg leading-relaxed">
            AxionX isn't just another consultancy - it's a fundamental reimagining of how businesses integrate AI and data into their operations. You're creating a new category that bridges the gap between AI curiosity and practical execution, while simultaneously disrupting the traditional consulting model.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center justify-center overflow-hidden relative py-20">
        <div className="relative z-10 w-full max-w-2xl mx-6 space-y-[30px]">
          {services.map((service) => (
            <div
              key={service.id}
              className={`transition-all duration-500 ${
                activeCard && activeCard !== service.id.toString() ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <div 
                className="relative cursor-pointer"
                style={{
                  perspective: '1000px',
                  minHeight: flippedCards[service.id] ? 'auto' : '200px'
                }}
                onClick={() => toggleCard(service.id)}
              >
                {/* Front - Title */}
                <div 
                  className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-12 min-h-[200px] flex items-center justify-center transition-all duration-700 ${
                    flippedCards[service.id] ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                  }`}
                >
                  <h2 className="text-4xl font-bold text-white">{service.title}</h2>
                </div>

                {/* Back - Content */}
                <div 
                  className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg p-8 transition-all duration-700 ${
                    flippedCards[service.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <div className="text-white text-sm space-y-4">
                    <p><strong>Purpose:</strong> {service.content.purpose}</p>
                    <p><strong>Key deliverables:</strong> {service.content.deliverables}</p>
                    <p><strong>Outcome:</strong> {service.content.outcome}</p>
                    <p><strong>Value:</strong> {service.content.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
