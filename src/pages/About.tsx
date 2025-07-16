import React from 'react';
import { SEO } from '../components/ui/SEO';

export const About: React.FC = () => {
  return (
    <>
      <SEO
        title="À propos"
        description="Découvrez l'histoire de LuxStore, notre mission et nos valeurs. Une boutique premium dédiée à l'excellence."
        keywords="à propos, luxstore, histoire, mission, valeurs, équipe"
      />
      
      <div className="min-h-screen bg-luxury-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-luxury-white mb-4">
              À propos
            </h1>
            <p className="text-luxury-gray-300 mb-8">
              Page à propos en cours de développement...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};