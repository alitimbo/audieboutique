import React, { useEffect } from 'react'
import { SEO } from '../components/ui/SEO'
import { HeroSlider } from '../components/Home/HeroSlider'
import { BrandPresentation } from '../components/Home/BrandPresentation'
import { CategoryGrid } from '../components/Home/CategoryGrid'
import { ProductGrid } from '../components/Home/ProductGrid'
import { BestSellers } from '../components/Home/BestSellers'
import { CategoryFocus } from '../components/Home/CategoryFocus'
import { DeliveryBanner } from '../components/Home/DeliveryBanner'
import { Testimonials } from '../components/Home/Testimonials'
import { WhyAudie } from '../components/Home/WhyAudie'
import { Newsletter } from '../components/Home/Newsletter'


export const Home: React.FC = () => {
  
  return (
    <>
      <SEO
        title='Accueil'
        description='Audie Boutique - La référence de la lingerie, mode et accessoires. Entre audace, wax et élégance. Livraison gratuite dès 80€.'
        keywords='audie boutique, lingerie, mode féminine, wax, corsets, bijoux créoles, boutique en ligne, élégance caribéenne, style unique, accessoires de mode, vêtements tendance, shopping en ligne'
      />

      <div className='min-h-screen bg-luxury-black'>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Brand Presentation */}
        <BrandPresentation />

        {/* Categories Section */}
        <CategoryGrid />

        {/* Best Sellers Section */}
        <BestSellers />

        {/* Category Focus Section */}
        <CategoryFocus />

        {/* Delivery Banner */}
        <DeliveryBanner />

        {/* Products Section */}
        <ProductGrid />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Why Audie Section */}
        <WhyAudie />

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </>
  )
}
