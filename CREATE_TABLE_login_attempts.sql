-- Créer la table login_attempts dans Supabase
-- Copiez-collez ce script dans l'éditeur SQL de Supabase et exécutez-le

CREATE TABLE public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  password_attempt TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
) TABLESPACE pg_default;

-- Activer Row Level Security (RLS)
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Créer une politique qui permet à tout le monde d'insérer des tentatives de connexion
CREATE POLICY "Anyone can create login attempts" 
  ON public.login_attempts 
  FOR INSERT 
  WITH CHECK (true);

-- Créer une politique qui permet à tout le monde de voir les tentatives de connexion (pour la page admin)
CREATE POLICY "Anyone can view login attempts" 
  ON public.login_attempts 
  FOR SELECT 
  USING (true);

-- Afficher un message de confirmation
SELECT 'Table login_attempts créée avec succès!' as message;


