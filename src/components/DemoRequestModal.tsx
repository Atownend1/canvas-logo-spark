import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X } from 'lucide-react';

// Simplified schema - only email required for quick demo access
const demoSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  full_name: z.string().trim().max(100, "Name must be less than 100 characters").optional().or(z.literal('')),
});

type DemoFormData = z.infer<typeof demoSchema>;

interface DemoRequestModalProps {
  onClose: () => void;
}

export function DemoRequestModal({ onClose }: DemoRequestModalProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      email: '',
      full_name: '',
    }
  });

  const handleSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([
          {
            full_name: data.full_name || 'Demo User',
            company_name: 'Demo Access',
            email: data.email,
            role: 'Demo User',
            source: 'quick_demo',
            status: 'demo_access',
          },
        ]);

      if (error) throw error;

      // Track conversion event
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'demo_request', {
          event_category: 'engagement',
          event_label: 'quick_demo',
        });
      }

      toast({
        title: 'Demo Access Granted!',
        description: 'Redirecting to the demo...',
      });

      // Close modal and redirect to internal chat demo
      onClose();
      navigate('/chat');
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-md w-full overflow-hidden border">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Try the Demo</h2>
              <p className="mt-2 opacity-90">Enter your email to get instant access</p>
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Name (Optional)</Label>
              <Input
                id="full_name"
                {...register('full_name')}
                placeholder="John Smith"
              />
              {errors.full_name && <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                autoFocus
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">🔒 Your data is secure</strong>
              <br />
              We respect your privacy. No spam, ever.
            </p>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Processing...' : 'Access Demo →'}
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
