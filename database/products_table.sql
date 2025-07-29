-- Table des produits pour l'e-commerce AudioBoutique
-- À exécuter dans Supabase SQL Editor

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10,2) CHECK (original_price >= 0),
  category TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  featured BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  colors JSONB DEFAULT '[]',
  sizes TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  reviews INTEGER DEFAULT 0 CHECK (reviews >= 0),
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_archived ON products(archived);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Index pour la recherche textuelle
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING gin(to_tsvector('french', name || ' ' || description));

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des produits actifs
CREATE POLICY "Allow public read access to active products" ON products
  FOR SELECT USING (active = true AND archived = false);

-- Politique pour permettre aux administrateurs de tout gérer
CREATE POLICY "Allow admin full access" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'is_admin' = 'true'
    )
  );

-- Insérer quelques données d'exemple (optionnel)
INSERT INTO products (
  name, 
  description, 
  price, 
  original_price, 
  category, 
  images, 
  stock, 
  featured, 
  colors, 
  sizes, 
  tags, 
  specifications
) VALUES 
(
  'Ensemble Lingerie Dentelle Rouge Passion',
  'Ensemble lingerie en dentelle française premium avec finitions soignées',
  89.99,
  119.99,
  'Femmes',
  ARRAY['https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'],
  15,
  true,
  '[{"name": "Rouge Passion", "value": "#B3001B"}, {"name": "Noir Élégant", "value": "#000000"}]'::jsonb,
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Bestseller', 'Nouveautés'],
  '{"Matière": "Dentelle française 90% Polyamide, 10% Élasthanne", "Entretien": "Lavage à la main recommandé", "Origine": "Fabriqué en France"}'::jsonb
),
(
  'Corset Sculptant Premium Noir',
  'Corset sculptant avec armatures pour un maintien parfait',
  75.00,
  NULL,
  'Corsets & Gaines',
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'],
  8,
  false,
  '[{"name": "Noir", "value": "#000000"}]'::jsonb,
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Nouveau'],
  '{"Matière": "Satin et dentelle", "Armatures": "Oui", "Fermeture": "Lacets ajustables"}'::jsonb
),
(
  'Maillot Bikini Tropical',
  'Bikini deux pièces aux motifs tropicaux colorés',
  45.99,
  NULL,
  'Maillots de bain',
  ARRAY['https://images.pexels.com/photos/1551698/pexels-photo-1551698.jpeg?auto=compress&cs=tinysrgb&w=800'],
  0,
  false,
  '[{"name": "Bleu", "value": "#3B82F6"}, {"name": "Vert", "value": "#10B981"}]'::jsonb,
  ARRAY['XS', 'S', 'M', 'L'],
  ARRAY['Été', 'Tropical'],
  '{"Matière": "Polyester recyclé", "Protection": "UV 50+", "Séchage": "Rapide"}'::jsonb
);

-- Vérifier que tout fonctionne
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
