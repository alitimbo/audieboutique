import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SEO } from '../components/ui/SEO'
import { ImageGallery } from '../components/Product/ImageGallery'
import { ProductInfo } from '../components/Product/ProductInfo'
import { ProductTabs } from '../components/Product/ProductTabs'
import { RelatedProducts } from '../components/Product/RelatedProducts'
import { useProductStore } from '../store/useProductStore'
import { Product } from '../types/product'

export const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const { products, fetchProducts, error, loading } = useProductStore()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    } else {
      const foundProduct = products.find(p => p.id === id)
      setProduct(foundProduct || null)
    }
  }, [id, products, fetchProducts])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Chargement...
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        Erreur: {error}
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Produit non trouvé.
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  return (
    <>
      <SEO
        title={product.name}
        description={`${product.name} - ${product.description.substring(
          0,
          160
        )}...`}
        keywords={`${product.name}, ${product.tags?.join(', ') || ''}, ${
          product.category || ''
        },Martinique, mode, luxe, boutique, audie boutique`}
        image={product.images[0]}
        type='product'
      />

      <div className='min-h-screen bg-gradient-to-br from-luxury-gray-50 to-luxury-white pt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex items-center space-x-2 text-sm text-luxury-gray-600 mb-8'
          >
            <a
              href='/'
              className='hover:text-luxury-red transition-colors duration-200'
            >
              Accueil
            </a>
            <span>/</span>
            <a
              href='/shop'
              className='hover:text-luxury-red transition-colors duration-200'
            >
              Boutique
            </a>
            <span>/</span>
            <span className='text-luxury-black font-medium'>Lingerie</span>
          </motion.nav>

          {/* Product Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
            {/* Image Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>

          {/* Product Tabs */}
          <div className='mb-16'>
            <ProductTabs
              description={product.description}
              specifications={product.specifications}
            />
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}
        </div>
      </div>
    </>
  )
}
