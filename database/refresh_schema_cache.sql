-- Script pour forcer le rafraîchissement du cache de schéma Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Forcer le rafraîchissement du cache de schéma PostgREST
NOTIFY pgrst, 'reload schema';

-- 2. Vérifier que la colonne original_price est bien présente
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'original_price';

-- 3. Tester une insertion simple pour vérifier que ça fonctionne
-- (Optionnel - décommente si tu veux tester)
/*
INSERT INTO products (name, description, price, original_price, category, stock)
VALUES ('Test Product', 'Test Description', 99.99, 149.99, 'Test Category', 10)
RETURNING id, name, price, original_price;
*/
