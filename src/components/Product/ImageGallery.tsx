import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImage((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square bg-luxury-gray-50 rounded-3xl overflow-hidden group cursor-zoom-in"
          onClick={() => openLightbox(currentImage)}
        >
          <img
            src={images[currentImage]}
            alt={`${productName} - Image ${currentImage + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-luxury-black/50 text-luxury-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="w-5 h-5" />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-luxury-white/90 hover:bg-luxury-white text-luxury-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-luxury-white/90 hover:bg-luxury-white text-luxury-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-4 gap-3"
          >
            {images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImage
                    ? 'border-luxury-red shadow-lg'
                    : 'border-luxury-gray-200 hover:border-luxury-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${productName} - Miniature ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxImage]}
                alt={`${productName} - Image ${lightboxImage + 1}`}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 bg-luxury-white/20 hover:bg-luxury-white/30 text-luxury-white p-2 rounded-full backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevLightboxImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-luxury-white/20 hover:bg-luxury-white/30 text-luxury-white p-3 rounded-full backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextLightboxImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-luxury-white/20 hover:bg-luxury-white/30 text-luxury-white p-3 rounded-full backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-luxury-black/50 text-luxury-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {lightboxImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};