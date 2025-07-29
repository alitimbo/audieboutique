-- Script pour vérifier l'existence de l'admin
-- À exécuter dans Supabase SQL Editor

-- 1. Vérifier si l'admin existe dans auth.users
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users 
WHERE email = 'admin@audieboutique.com';

-- 2. Vérifier si l'admin existe dans votre table users
SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM users 
WHERE email = 'admin@audieboutique.com';

-- 3. Vérifier tous les admins dans votre table users
SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM users 
WHERE is_admin = true;
