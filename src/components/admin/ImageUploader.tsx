import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageService } from '../../services/imageService';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  productId?: string;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onImagesChange,
  productId,
  maxImages = 5
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    // Vérifier le nombre maximum d'images
    if (images.length + fileArray.length > maxImages) {
      toast.error(`Vous ne pouvez ajouter que ${maxImages} images maximum`);
      return;
    }

    // Valider chaque fichier
    for (const file of fileArray) {
      const validation = ImageService.validateImageFile(file);
      if (!validation.isValid) {
        toast.error(validation.error);
        return;
      }
    }

    setUploading(true);
    try {
      const uploadedUrls = await ImageService.uploadMultipleImages(fileArray, productId);
      const newImages = [...images, ...uploadedUrls];
      onImagesChange(newImages);
      toast.success(`${uploadedUrls.length} image(s) uploadée(s) avec succès`);
    } catch (error) {
      console.error('Erreur upload:', error);
      toast.error('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Supprimer de Supabase si ce n'est pas une URL externe
      if (imageUrl.includes('supabase')) {
        await ImageService.deleteImage(imageUrl);
      }
      
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
      toast.success('Image supprimée');
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${dragOver 
            ? 'border-accent-gold bg-accent-gold/10' 
            : 'border-gray-300 hover:border-accent-gold hover:bg-gray-50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-accent-gold animate-spin mb-2" />
            <p className="text-gray-600">Upload en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-gray-600 mb-1">
              Glissez vos images ici ou cliquez pour sélectionner
            </p>
            <p className="text-sm text-gray-500">
              JPG, PNG, WebP - Max 5MB par image ({images.length}/{maxImages})
            </p>
          </div>
        )}
      </div>

      {/* Aperçu des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDEyVjdBMiAyIDAgMCAwIDE5IDVINUEyIDIgMCAwIDAgMyA3VjE3QTIgMiAwIDAgMCA1IDE5SDE5QTIgMiAwIDAgMCAyMSAxN1YxMloiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTggMTBBMiAyIDAgMSAwIDggNkEyIDIgMCAwIDAgOCAxMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTIxIDEyTDE2IDdMNSAxOCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                  }}
                />
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(imageUrl, index);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-accent-gold text-luxury-black text-xs px-2 py-1 rounded">
                  Principal
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Informations */}
      <div className="text-sm text-gray-500">
        <p>• La première image sera utilisée comme image principale</p>
        <p>• Formats supportés : JPG, PNG, WebP</p>
        <p>• Taille maximum : 5MB par image</p>
        <p>• Maximum {maxImages} images par produit</p>
      </div>
    </div>
  );
};
