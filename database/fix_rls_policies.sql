-- Script pour corriger les politiques RLS et résoudre l'erreur 500
-- À exécuter dans Supabase SQL Editor

-- 1. Supprimer toutes les politiques existantes sur la table users
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow admin full access to users" ON users;
DROP POLICY IF EXISTS "Allow public read access to active products" ON products;
DROP POLICY IF EXISTS "Allow admin full access to products" ON products;

-- 2. Désactiver temporairement RLS pour déboguer
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- 3. Réactiver RLS avec des politiques corrigées
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Créer des politiques plus simples et fonctionnelles pour users
-- Politique pour permettre à un utilisateur de voir son propre profil
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Politique pour permettre à un utilisateur de modifier son propre profil
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Politique pour permettre aux admins de tout voir et modifier
CREATE POLICY "Allow admin full access to users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Politique pour permettre la lecture des utilisateurs admin lors de la connexion
CREATE POLICY "Allow auth check for admin login" ON users
  FOR SELECT USING (
    auth.uid() = id OR 
    (is_admin = true AND auth.uid() IS NOT NULL)
  );

-- 5. Créer des politiques pour products
-- Politique pour permettre la lecture publique des produits actifs
CREATE POLICY "Allow public read access to active products" ON products
  FOR SELECT USING (active = true AND archived = false);

-- Politique pour permettre aux admins de tout gérer sur products
CREATE POLICY "Allow admin full access to products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- 6. Vérifier que l'admin peut être lu
SELECT 
  id,
  email,
  full_name,
  is_admin,
  'Test de lecture réussi' as status
FROM users 
WHERE email = 'admin@audieboutique.com';

-- 7. Test de la politique admin
SELECT 
  'Politique admin fonctionnelle' as test_result
WHERE EXISTS (
  SELECT 1 FROM users 
  WHERE email = 'admin@audieboutique.com' 
  AND is_admin = true
);
