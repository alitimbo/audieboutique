import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { ShopHero } from '../components/Shop/ShopHero';
import { FilterSidebar, ShopFilters } from '../components/Shop/FilterSidebar';
import { ProductGrid } from '../components/Shop/ProductGrid';
import { SortDropdown } from '../components/Shop/SortDropdown';
import { Pagination } from '../components/Shop/Pagination';
import { Product } from '../components/Shop/ProductCard';
import { useCartStore } from '../store/useCartStore';
import { useNavigate, useParams } from 'react-router-dom';


// Mock data pour les produits
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ensemble Lingerie Dentelle Rouge Passion',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lingerie',
    colors: ['#B3001B', '#000000'],
    isNew: false,
    isOnSale: true,
    rating: 4.8,
    reviews: 124,
    inStock: true
  },
  {
    id: '2',
    name: 'Robe Wax Traditionnelle Moderne',
    price: 125.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Wax',
    colors: ['#F59E0B', '#10B981', '#3B82F6'],
    isNew: true,
    isOnSale: false,
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'Corset Sculptant Premium Noir',
    price: 75.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Corsets & Gaines',
    colors: ['#000000', '#FFFFFF'],
    isNew: false,
    isOnSale: false,
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: '4',
    name: 'Parure Bijoux Dorés Créoles',
    price: 45.00,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bijoux',
    colors: ['#F59E0B'],
    isNew: true,
    isOnSale: false,
    rating: 4.6,
    reviews: 78,
    inStock: true
  },
  {
    id: '5',
    name: 'Maillot de Bain Tropical Chic',
    price: 65.00,
    originalPrice: 85.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Maillots de bain',
    colors: ['#EC4899', '#10B981'],
    isNew: false,
    isOnSale: true,
    rating: 4.8,
    reviews: 92,
    inStock: true
  },
  {
    id: '6',
    name: 'Sac à Main Cuir Caraïbe Premium',
    price: 150.00,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sacs & portes monnaies',
    colors: ['#000000', '#8B5CF6'],
    isNew: true,
    isOnSale: false,
    rating: 4.9,
    reviews: 67,
    inStock: true
  },
  {
    id: '7',
    name: 'Ensemble Couple Assorti Élégant',
    price: 180.00,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'En couple',
    colors: ['#B3001B', '#000000'],
    isNew: false,
    isOnSale: false,
    rating: 4.5,
    reviews: 43,
    inStock: false
  },
  {
    id: '8',
    name: 'Robe de Soirée Paillettes Or',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Spécial Fêtes',
    colors: ['#F59E0B'],
    isNew: true,
    isOnSale: true,
    rating: 4.7,
    reviews: 112,
    inStock: true
  }
];

export const Shop: React.FC = () => {
  const [filters, setFilters] = useState<ShopFilters>({
    categories: [],
    priceRange: [0, 500],
    colors: [],
    availability: [],
    sortBy: 'newest'
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  const { addItem } = useCartStore();
  const navigate = useNavigate();
  const { collections: tagParam } = useParams();
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Synchronise le filtre tag avec l'URL
  useEffect(() => {
    if (tagParam) {
      // Optionnel : tu peux filtrer les produits ici selon le tag si besoin
    }
  }, [tagParam]);

  // Callback pour changer de tag (naviguer)
  const handleTagChange = (tag?: string) => {
    if (tag) {
      navigate(`/shop/tags/${tag}`);
    } else {
      navigate('/shop');
    }
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll au début de la grille lors d'un changement de filtre, tag ou page
  useEffect(() => {
    if (gridRef.current) {
      const yOffset = -80; // hauteur du header à ajuster si besoin
      const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [filters, tagParam, currentPage]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Filtrage par tag
    if (tagParam) {
      switch (tagParam) {
        case 'soldes':
          filtered = filtered.filter(product => product.isOnSale);
          break;
        case 'nouveautes':
          filtered = filtered.filter(product => product.isNew);
          break;
        case 'exclusivites':
          // Si tu veux une logique spéciale, adapte ici (ex: category === 'Exclusivités')
          filtered = filtered.filter(product => product.category === 'Exclusivités');
          break;
        case 'collections':
        default:
          // Pas de filtre supplémentaire pour 'collections'
          break;
      }
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Filter by colors
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Filter by availability
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        if (filters.availability.includes('Nouveautés') && !product.isNew) return false;
        if (filters.availability.includes('En promotion') && !product.isOnSale) return false;
        if (filters.availability.includes('En stock') && !product.inStock) return false;
        return true;
      });
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [filters, tagParam]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistItems(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Boutique"
        description="Découvrez notre collection complète de lingerie, mode et accessoires premium. Filtres avancés, tri par prix et catégories pour trouver vos pièces parfaites."
        keywords="boutique, lingerie, mode féminine, wax, corsets, bijoux, maillots de bain, sacs, accessoires, martinique, premium, luxe"
      />
      
      <div className="min-h-screen bg-luxury-gray-50">
        {/* Hero Section */}
        <div className="pt-0">
          <ShopHero />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFiltersChange={setFilters}
              selectedTag={tagParam}
              onTagChange={handleTagChange}
            />

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
                    {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''} 
                    {totalPages > 1 && `(page ${currentPage} sur ${totalPages})`}
                  </span>
                  
                  {/* Desktop Filter Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center space-x-2 px-3 py-2 border border-luxury-gray-300 rounded-lg hover:border-luxury-red transition-colors duration-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtres</span>
                  </motion.button>
                </div>

                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center space-x-2 bg-luxury-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-luxury-white text-luxury-red shadow-sm'
                          : 'text-luxury-gray-600 hover:text-luxury-black'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'list'
                          ? 'bg-luxury-white text-luxury-red shadow-sm'
                          : 'text-luxury-gray-600 hover:text-luxury-black'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <SortDropdown
                    value={filters.sortBy}
                    onChange={handleSortChange}
                  />
                </div>
              </motion.div>

              {/* Products Grid */}
              <div ref={gridRef} />
              <ProductGrid
                products={paginatedProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
              />

              {/* Pagination */}
              {!loading && filteredProducts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};