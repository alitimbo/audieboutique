import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Audie Boutique - Boutique en ligne premium avec design luxueux et produits exclusifs',
  keywords = 'luxe, premium, boutique, e-commerce, mode, design',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website'
}) => {
  const fullTitle = `${title} | LuxStore`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Audie Boutique" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="LuxStore" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#B3001B" />
      <meta name="msapplication-TileColor" content="#B3001B" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data for Products */}
      {type === 'product' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": title,
            "description": description,
            "image": image,
            "brand": {
              "@type": "Brand",
              "name": "LuxStore"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR"
            }
          })}
        </script>
      )}
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "LuxStore",
          "url": "https://luxstore.com",
          "logo": "https://luxstore.com/logo.png",
          "sameAs": [
            "https://www.instagram.com/luxstore",
            "https://www.facebook.com/luxstore",
            "https://www.twitter.com/luxstore"
          ]
        })}
      </script>
    </Helmet>
  );
};