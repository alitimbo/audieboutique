-- Script pour diagnostiquer les problèmes d'affichage des produits
-- À exécuter dans Supabase SQL Editor

-- 1. Vérifier combien de produits existent
SELECT 
  'Total produits' as info,
  COUNT(*) as count
FROM products;

-- 2. Voir tous les produits avec leurs détails
SELECT 
  id,
  name,
  price,
  category,
  stock,
  featured,
  active,
  archived,
  created_at
FROM products
ORDER BY created_at DESC;

-- 3. Vérifier les produits actifs (ceux qui devraient s'afficher)
SELECT 
  'Produits actifs' as info,
  COUNT(*) as count
FROM products 
WHERE active = true AND archived = false;

-- 4. Vérifier les colonnes de la table products
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- 5. Test d'une requête similaire à celle du ProductService
SELECT *
FROM products
WHERE active = true AND archived = false
ORDER BY created_at DESC;

-- 6. Vérifier les politiques RLS sur products
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'products';
