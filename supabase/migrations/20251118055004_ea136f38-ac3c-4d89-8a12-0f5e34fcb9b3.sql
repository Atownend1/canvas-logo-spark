-- Drop the overly permissive SELECT policy that allows anyone to read all demo requests
DROP POLICY IF EXISTS "Users can view their own demo request" ON public.demo_requests;

-- Note: Demo requests should only be accessed through backend admin interface
-- using service role, not through public queries. This prevents unauthorized
-- access to sensitive PII including emails, phone numbers, and company details.