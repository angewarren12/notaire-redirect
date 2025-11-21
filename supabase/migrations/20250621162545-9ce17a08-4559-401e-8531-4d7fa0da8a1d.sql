
-- Create a table to store login attempts
CREATE TABLE public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  password_attempt TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) but allow all operations for now
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert login attempts
CREATE POLICY "Anyone can create login attempts" 
  ON public.login_attempts 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to select login attempts (for admin page)
CREATE POLICY "Anyone can view login attempts" 
  ON public.login_attempts 
  FOR SELECT 
  USING (true);
