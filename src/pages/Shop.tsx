import React from 'react';
import { SEO } from '../components/ui/SEO';

export const Shop: React.FC = () => {
  return (
    <>
      <SEO
        title="Boutique"
        description="Découvrez notre collection complète de produits premium. Filtres avancés, tri par prix et catégories."
        keywords="boutique, produits, premium, collection, shopping, luxe"
      />
      
      <div className="min-h-screen bg-luxury-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-luxury-white mb-4">
              Boutique
            </h1>
            <p className="text-luxury-gray-300 mb-8">
              Page boutique en cours de développement...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};