
-- ============================================================
-- Auth Hardening: Automatic Public Profile Creation
-- Ensures every auth.users entry has a corresponding public.profiles entry
-- ============================================================

-- 1. Create the function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_patient_role_id UUID;
BEGIN
  -- Get the default PATIENT role ID
  SELECT id INTO v_patient_role_id FROM public.roles WHERE name = 'PATIENT' LIMIT 1;

  INSERT INTO public.profiles (id, full_name, email, phone, role_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    NEW.phone,
    v_patient_role_id
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Backfill profiles for any existing users who don't have one
INSERT INTO public.profiles (id, full_name, email, phone, role_id)
SELECT 
    u.id, 
    COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', 'User'),
    u.email,
    u.phone,
    (SELECT id FROM public.roles WHERE name = 'PATIENT' LIMIT 1)
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
