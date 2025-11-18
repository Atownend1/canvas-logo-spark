import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { X } from 'lucide-react';

const demoSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  company_name: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional().or(z.literal('')),
  role: z.string().trim().min(1, "Role is required").max(100, "Role must be less than 100 characters"),
  company_size: z.string().max(50).optional().or(z.literal('')),
  country: z.string().max(100),
  interested_areas: z.array(z.string()).max(10, "Too many selections (max 10)")
});

type DemoFormData = z.infer<typeof demoSchema>;

interface DemoRequestModalProps {
  onClose: () => void;
}

export function DemoRequestModal({ onClose }: DemoRequestModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit: handleFormSubmit, formState: { errors }, setValue, watch } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      full_name: '',
      company_name: '',
      email: '',
      role: '',
      company_size: '',
      phone: '',
      country: 'United Kingdom',
      interested_areas: [],
    }
  });

  const formData = watch();

  const handleSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);

    try {
      const { data: result, error } = await supabase
        .from('demo_requests')
        .insert([
          {
            full_name: data.full_name,
            company_name: data.company_name,
            email: data.email,
            role: data.role,
            company_size: data.company_size || '',
            phone: data.phone || '',
            country: data.country,
            interested_areas: data.interested_areas,
            source: 'landing_page',
            status: 'new',
          },
        ])
        .select('demo_token')
        .single();

      if (error) throw error;

      // Track conversion event
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'demo_request', {
          event_category: 'engagement',
          event_label: formData.role,
        });
      }

      toast({
        title: 'Demo Request Submitted!',
        description: 'Thank you for your interest. We will be in touch shortly.',
      });

      // Redirect to demo with token
      const demoUrl = `https://axionx-demo-showcase.lovable.app?token=${result.demo_token}&welcome=true`;
      window.location.href = demoUrl;
    } catch (err) {
      console.error('Error submitting demo request:', err);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again or contact hello@axionx.uk',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (area: string, checked: boolean) => {
    const currentAreas = formData.interested_areas || [];
    setValue(
      'interested_areas',
      checked ? [...currentAreas, area] : currentAreas.filter((a) => a !== area)
    );
  };

  const interestAreas = [
    'AI-Powered Data Quality',
    'Automated Reconciliation',
    'Real-time Governance',
    'OneStream Integration',
    'Investment Opportunity',
    'Partnership Opportunity',
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Access Your DataController Demo</h2>
              <p className="mt-2 opacity-90">See AI-powered financial data governance in action</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit(handleSubmit)} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                {...register('full_name')}
                placeholder="John Smith"
              />
              {errors.full_name && <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Work Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@company.com"
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                {...register('company_name')}
                placeholder="Acme Corp"
              />
              {errors.company_name && <p className="text-sm text-destructive mt-1">{errors.company_name.message}</p>}
            </div>

            <div>
              <Label htmlFor="role">Your Role *</Label>
              <Select value={formData.role} onValueChange={(value) => setValue('role', value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CEO">CEO / Founder</SelectItem>
                  <SelectItem value="CFO">CFO</SelectItem>
                  <SelectItem value="Finance Director">Finance Director</SelectItem>
                  <SelectItem value="Head of FP&A">Head of FP&A</SelectItem>
                  <SelectItem value="Data Leader">Data / Analytics Leader</SelectItem>
                  <SelectItem value="Investor">Investor / VC</SelectItem>
                  <SelectItem value="Consultant">Consultant</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-destructive mt-1">{errors.role.message}</p>}
            </div>

            <div>
              <Label htmlFor="company_size">Company Size</Label>
              <Select value={formData.company_size} onValueChange={(value) => setValue('company_size', value)}>
                <SelectTrigger id="company_size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-1000">201-1000 employees</SelectItem>
                  <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="+44 20 1234 5678"
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">What are you most interested in? (Check all that apply)</Label>
            <div className="space-y-2">
              {interestAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.interested_areas.includes(area)}
                    onCheckedChange={(checked) => handleCheckboxChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="text-sm font-normal cursor-pointer">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">🔒 Your data is secure</strong>
              <br />
              We respect your privacy. Your information will only be used to provide demo access and follow up on
              your interest. No spam, ever.
            </p>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Processing...' : 'Access Demo Now →'}
            </Button>
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
