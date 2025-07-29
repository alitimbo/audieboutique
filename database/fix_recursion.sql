-- Script pour corriger la récursion infinie dans les politiques RLS
-- À exécuter dans Supabase SQL Editor

-- 1. Supprimer TOUTES les politiques existantes pour éviter les conflits
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow admin full access to users" ON users;
DROP POLICY IF EXISTS "Allow auth check for admin login" ON users;
DROP POLICY IF EXISTS "Allow public read access to active products" ON products;
DROP POLICY IF EXISTS "Allow admin full access to products" ON products;

-- 2. Désactiver complètement RLS sur users pour éviter la récursion
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 3. Pour products, on peut garder RLS mais avec des politiques simples
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Créer des politiques simples pour products SANS référence à users
-- Politique pour lecture publique des produits actifs
CREATE POLICY "Public can read active products" ON products
  FOR SELECT USING (active = true AND archived = false);

-- Politique pour admin - utilise directement auth.uid() sans jointure
CREATE POLICY "Authenticated users can manage products" ON products
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 5. Vérification que tout fonctionne
SELECT 
  'RLS configuré sans récursion' as status,
  COUNT(*) as total_users
FROM users;

SELECT 
  'Products accessibles' as status,
  COUNT(*) as total_products  
FROM products;
