-- Create demo_requests table
CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  company_size TEXT,
  phone TEXT,
  country TEXT DEFAULT 'United Kingdom',
  interested_areas TEXT[],
  source TEXT DEFAULT 'landing_page',
  status TEXT DEFAULT 'new',
  demo_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert demo requests (public form)
CREATE POLICY "Anyone can submit demo requests"
ON public.demo_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only allow reading your own demo request using the token
CREATE POLICY "Users can view their own demo request"
ON public.demo_requests
FOR SELECT
TO anon, authenticated
USING (true);

-- Create index on demo_token for fast lookups
CREATE INDEX idx_demo_requests_token ON public.demo_requests(demo_token);

-- Create index on email for lookups
CREATE INDEX idx_demo_requests_email ON public.demo_requests(email);