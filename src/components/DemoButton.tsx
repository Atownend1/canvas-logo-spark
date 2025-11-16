import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface DemoButtonProps {
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
}

export function DemoButton({ variant = 'default', className = '' }: DemoButtonProps) {
  const handleClick = () => {
    window.location.href = 'https://axionx-demo-showcase.lovable.app';
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={`${className} touch-manipulation active:scale-95 transition-transform`}
    >
      Experience DataController Demo →
    </Button>
  );
}

interface FormData {
  full_name: string;
  company_name: string;
  email: string;
  role: string;
  company_size: string;
  phone: string;
  country: string;
  interested_areas: string[];
}

function DemoRequestModal({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    company_name: '',
    email: '',
    role: '',
    company_size: '',
    phone: '',
    country: 'United Kingdom',
    interested_areas: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('demo_requests')
        .insert([{
          ...formData,
          source: 'landing_page',
          status: 'new'
        }])
        .select('demo_token')
        .single();

      if (error) throw error;

      toast({
        title: "Demo Access Granted!",
        description: "Check your email for demo access details.",
      });

      // Track conversion event if analytics available
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'demo_request', {
          event_category: 'engagement',
          event_label: formData.role
        });
      }

      onClose();
      
    } catch (err) {
      console.error('Error submitting demo request:', err);
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again or contact hello@axionx.uk",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interested_areas: checked 
        ? [...prev.interested_areas, area]
        : prev.interested_areas.filter(a => a !== area)
    }));
  };

  const interestAreas = [
    'AI-Powered Data Quality',
    'Automated Reconciliation',
    'Real-time Governance',
    'OneStream Integration',
    'Investment Opportunity',
    'Partnership Opportunity'
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 -m-6 mb-6 rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">
                Access Your DataController Demo
              </DialogTitle>
              <p className="text-sm opacity-90">
                See AI-powered financial data governance in action
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-foreground/20 -mr-2 -mt-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                name="company_name"
                required
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Acme Corp"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role *</Label>
              <Select 
                required 
                value={formData.role} 
                onValueChange={(value) => handleSelectChange('role', value)}
              >
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_size">Company Size</Label>
              <Select 
                value={formData.company_size} 
                onValueChange={(value) => handleSelectChange('company_size', value)}
              >
                <SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 20 1234 5678"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>What are you most interested in? (Check all that apply)</Label>
            <div className="space-y-2">
              {interestAreas.map(area => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.interested_areas.includes(area)}
                    onCheckedChange={(checked) => handleCheckboxChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="font-normal cursor-pointer">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <p className="text-sm">
              <strong>🔒 Your data is secure</strong><br />
              We respect your privacy. Your information will only be used to provide demo access 
              and follow up on your interest. No spam, ever.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Processing...' : 'Access Demo Now →'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function InvestorQuickAccess() {
  const { toast } = useToast();

  const handleQuickAccess = async () => {
    try {
      const { data, error } = await supabase
        .from('demo_requests')
        .insert([{
          full_name: 'Investor Quick Access',
          company_name: 'Investment Firm',
          email: `investor-${Date.now()}@axionx-demo.uk`,
          role: 'Investor',
          source: 'quick_access',
          status: 'investor_preview',
          country: 'United Kingdom',
          interested_areas: ['Investment Opportunity']
        }])
        .select('demo_token')
        .single();

      if (error) throw error;

      toast({
        title: "Quick Access Granted",
        description: "Redirecting to investor preview...",
      });
      
    } catch (err) {
      console.error('Quick access error:', err);
      toast({
        title: "Error",
        description: "Please use the main demo request form",
        variant: "destructive"
      });
    }
  };

  return (
    <button 
      onClick={handleQuickAccess}
      className="text-sm text-primary hover:text-primary/80 underline"
    >
      Investor? Quick preview →
    </button>
  );
}
