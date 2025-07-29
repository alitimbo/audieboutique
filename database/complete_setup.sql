-- Script SQL complet pour AudioBoutique
-- À exécuter dans Supabase SQL Editor

-- Table des utilisateurs (clients et admins)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  provider TEXT DEFAULT 'email', -- 'email' ou 'google'
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Table des tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL
);

-- Table des couleurs
CREATE TABLE IF NOT EXISTS colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  hex_code TEXT NOT NULL
);

-- Table des tailles
CREATE TABLE IF NOT EXISTS sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL
);

-- Table des produits (adaptée pour compatibilité avec ProductService)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10,2) CHECK (original_price >= 0),
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  category TEXT NOT NULL, -- Simplifié pour compatibilité
  images TEXT[] DEFAULT '{}', -- Array d'URLs pour compatibilité
  featured BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  colors JSONB DEFAULT '[]', -- JSON pour compatibilité
  sizes TEXT[] DEFAULT '{}', -- Array pour compatibilité
  tags TEXT[] DEFAULT '{}', -- Array pour compatibilité
  specifications JSONB DEFAULT '{}',
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  reviews INTEGER DEFAULT 0 CHECK (reviews >= 0),
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Champs additionnels de votre structure
  is_new BOOLEAN DEFAULT FALSE,
  is_on_sale BOOLEAN DEFAULT FALSE,
  is_exclusive BOOLEAN DEFAULT FALSE
);

-- Tables de liaison (optionnelles, pour évolution future)
CREATE TABLE IF NOT EXISTS product_tags (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE IF NOT EXISTS product_colors (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  color_id UUID REFERENCES colors(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, color_id)
);

CREATE TABLE IF NOT EXISTS product_sizes (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size_id UUID REFERENCES sizes(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, size_id)
);

-- Table des images produits (optionnelle)
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  is_primary BOOLEAN DEFAULT FALSE
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  shipping_address JSONB,
  billing_address JSONB
);

-- Table des items de commande
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Table des paramètres admin
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT,
  settings JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_archived ON products(archived);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Index pour la recherche textuelle
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING gin(to_tsvector('french', name || ' ' || COALESCE(description, '')));

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Politiques pour products
CREATE POLICY "Allow public read access to active products" ON products
  FOR SELECT USING (active = true AND archived = false);

CREATE POLICY "Allow admin full access to products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Politiques pour users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow admin full access to users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Politiques pour orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow admin full access to orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Insérer les catégories par défaut
INSERT INTO categories (name, description) VALUES
('Soldes', 'Produits en promotion'),
('Spécial Fêtes', 'Collections spéciales pour les fêtes'),
('Femmes', 'Lingerie et vêtements pour femmes'),
('Wax', 'Tissus et vêtements en wax'),
('Corsets & Gaines', 'Corsets et gaines sculptantes'),
('Maillots de bain', 'Maillots et bikinis'),
('Sacs & portes monnaies', 'Maroquinerie et accessoires'),
('Bijoux', 'Bijoux et accessoires'),
('En couple', 'Produits pour couples')
ON CONFLICT (name) DO NOTHING;

-- Insérer les couleurs par défaut
INSERT INTO colors (name, hex_code) VALUES
('Noir', '#000000'),
('Rouge', '#B3001B'),
('Blanc', '#FFFFFF'),
('Rose', '#EC4899'),
('Bleu', '#3B82F6'),
('Vert', '#10B981'),
('Jaune', '#F59E0B'),
('Violet', '#8B5CF6')
ON CONFLICT (name) DO NOTHING;

-- Insérer les tailles par défaut
INSERT INTO sizes (name) VALUES
('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL')
ON CONFLICT (name) DO NOTHING;

-- Insérer les tags par défaut
INSERT INTO tags (name) VALUES
('Nouveautés'),
('Soldes'),
('Collections'),
('Exclusivités'),
('Bestseller'),
('Promo'),
('Nouveau')
ON CONFLICT (name) DO NOTHING;

-- Créer l'utilisateur admin dans auth.users (seulement s'il n'existe pas)
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
) 
SELECT 
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
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@audieboutique.com'
);

-- Récupérer l'ID de l'utilisateur et l'insérer dans votre table users (seulement s'il n'existe pas)
INSERT INTO users (id, email, full_name, provider, is_admin, created_at)
SELECT id, email, 'Administrateur', 'email', true, NOW()
FROM auth.users 
WHERE email = 'admin@audieboutique.com'
AND NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'admin@audieboutique.com'
);

-- Insérer quelques produits d'exemple
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

-- Vérifier l'admin
SELECT id, email, full_name, is_admin FROM users WHERE is_admin = true;
