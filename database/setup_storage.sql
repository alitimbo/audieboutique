-- Script pour configurer le Storage Supabase pour les images produits
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Créer le bucket pour les images produits
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Politique pour permettre aux admins de lire toutes les images
CREATE POLICY "Admins can view all product images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.is_admin = true
  )
);

-- 3. Politique pour permettre aux admins d'uploader des images
CREATE POLICY "Admins can upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.is_admin = true
  )
);

-- 4. Politique pour permettre aux admins de supprimer des images
CREATE POLICY "Admins can delete product images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.is_admin = true
  )
);

-- 5. Politique pour permettre aux admins de mettre à jour des images
CREATE POLICY "Admins can update product images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.is_admin = true
  )
);

-- 6. Politique pour permettre la lecture publique des images (pour le site web)
CREATE POLICY "Public can view product images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'product-images'
);

-- Vérifier que les politiques ont été créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;
