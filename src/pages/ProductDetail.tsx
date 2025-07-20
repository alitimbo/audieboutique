import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/ui/SEO';
import { ImageGallery } from '../components/Product/ImageGallery';
import { ProductInfo } from '../components/Product/ProductInfo';
import { ProductTabs } from '../components/Product/ProductTabs';
import { RelatedProducts } from '../components/Product/RelatedProducts';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Ensemble Lingerie Dentelle Rouge Passion Premium',
  price: 89.99,
  originalPrice: 119.99,
  rating: 4.8,
  reviews: 124,
  badge: 'Bestseller',
  inStock: true,
  colors: [
    { name: 'Rouge Passion', value: '#B3001B' },
    { name: 'Noir Élégant', value: '#000000' },
    { name: 'Blanc Nacré', value: '#FFFFFF' }
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  description: `Découvrez l'élégance à l'état pur avec cet ensemble lingerie en dentelle française premium. 
    Conçu pour sublimer votre féminité, cet ensemble allie confort exceptionnel et raffinement absolu. 
    La dentelle délicate épouse parfaitement vos courbes tandis que les finitions soignées garantissent 
    un maintien optimal tout au long de la journée. Parfait pour les occasions spéciales ou pour vous 
    sentir belle au quotidien.`,
  images: [
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  specifications: {
    'Matière': 'Dentelle française 90% Polyamide, 10% Élasthanne',
    'Doublure': 'Coton bio certifié GOTS',
    'Entretien': 'Lavage à la main recommandé',
    'Origine': 'Fabriqué en France',
    'Certification': 'Oeko-Tex Standard 100'
  }
};

const relatedProducts = [
  {
    id: '2',
    name: 'Corset Sculptant Premium Noir',
    price: 75.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Nouveau'
  },
  {
    id: '3',
    name: 'Parure Bijoux Dorés Créoles',
    price: 45.00,
    originalPrice: 65.00,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Promo'
  },
  {
    id: '4',
    name: 'Robe Wax Traditionnelle Moderne',
    price: 125.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Maillot de Bain Tropical Chic',
    price: 65.00,
    originalPrice: 85.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Soldes'
  }
];

export const ProductDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <SEO
        title={mockProduct.name}
        description={`${mockProduct.name} - ${mockProduct.description.substring(0, 160)}...`}
        keywords="lingerie, dentelle, rouge passion, ensemble, premium, audie boutique, martinique"
        image={mockProduct.images[0]}
        type="product"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-luxury-gray-50 to-luxury-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-sm text-luxury-gray-600 mb-8"
          >
            <a href="/" className="hover:text-luxury-red transition-colors duration-200">Accueil</a>
            <span>/</span>
            <a href="/shop" className="hover:text-luxury-red transition-colors duration-200">Boutique</a>
            <span>/</span>
            <span className="text-luxury-black font-medium">Lingerie</span>
          </motion.nav>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <ImageGallery images={mockProduct.images} productName={mockProduct.name} />
            
            {/* Product Info */}
            <ProductInfo product={mockProduct} />
          </div>

          {/* Product Tabs */}
          <div className="mb-16">
            <ProductTabs 
              description={mockProduct.description}
              specifications={mockProduct.specifications}
            />
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </>
  );
};