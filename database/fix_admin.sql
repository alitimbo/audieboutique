-- Script pour corriger le problème d'admin
-- À exécuter dans Supabase SQL Editor

-- Option 1: Si l'admin existe dans auth.users mais pas dans users
-- Insérer l'admin dans la table users en utilisant l'ID de auth.users
INSERT INTO users (id, email, full_name, provider, is_admin, created_at)
SELECT 
  au.id, 
  au.email, 
  'Administrateur', 
  'email', 
  true, 
  NOW()
FROM auth.users au
WHERE au.email = 'admin@audieboutique.com'
AND NOT EXISTS (
  SELECT 1 FROM users u WHERE u.email = 'admin@audieboutique.com'
);

-- Option 2: Si l'admin existe dans users mais is_admin = false
-- Mettre à jour is_admin à true
UPDATE users 
SET is_admin = true
WHERE email = 'admin@audieboutique.com' 
AND is_admin = false;

-- Option 3: Si l'admin n'existe nulle part, le créer complètement
-- (Seulement si les options 1 et 2 n'ont rien fait)

-- D'abord créer dans auth.users
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@audieboutique.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@audieboutique.com',
      crypt('Admin123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- Puis créer dans users
INSERT INTO users (id, email, full_name, provider, is_admin, created_at)
SELECT 
  au.id, 
  au.email, 
  'Administrateur', 
  'email', 
  true, 
  NOW()
FROM auth.users au
WHERE au.email = 'admin@audieboutique.com'
AND NOT EXISTS (
  SELECT 1 FROM users u WHERE u.email = 'admin@audieboutique.com'
);

-- Vérification finale
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.is_admin,
  u.created_at,
  'Utilisateur correctement configuré' as status
FROM users u
WHERE u.email = 'admin@audieboutique.com' 
AND u.is_admin = true;
