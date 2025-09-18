import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { ShopHero } from '../components/Shop/ShopHero';
import { FilterSidebar } from '../components/Shop/FilterSidebar';
import { ProductGrid } from '../components/Shop/ProductGrid';
import { SortDropdown } from '../components/Shop/SortDropdown';

export const Shop: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <SEO
        title="Boutique"
        description="Découvrez notre collection complète de lingerie, mode et accessoires premium."
        keywords="boutique, lingerie, mode féminine, wax, corsets, bijoux, maillots de bain, sacs, accessoires, martinique, premium, luxe"
      />
      
      <div className="min-h-screen bg-luxury-gray-50">
        <div className="pt-0">
          <ShopHero />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters - Rendu sans props */}
            <FilterSidebar />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-luxury-gray-600">
                    0 produit trouvé
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {}}
                    className="lg:hidden flex items-center space-x-2 px-3 py-2 border border-luxury-gray-300 rounded-lg"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtres</span>
                  </motion.button>
                </div>

                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle - Rendu statique */}
                  <div className="hidden sm:flex items-center space-x-2 bg-luxury-gray-100 rounded-lg p-1">
                    <button onClick={() => {}} className="p-2 rounded-md bg-luxury-white text-luxury-red shadow-sm">
                      <Grid className="w-4 h-4" />
                    </button>
                    <button onClick={() => {}} className="p-2 rounded-md text-luxury-gray-600">
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Sort Dropdown - Rendu sans props */}
                  <SortDropdown />
                </div>
              </motion.div>

              {/* Products Grid - Rendu sans props */}
              <div ref={gridRef} />
              <ProductGrid />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};