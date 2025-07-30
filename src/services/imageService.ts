import { supabase } from '../lib/supabase';

export class ImageService {
  private static readonly BUCKET_NAME = 'product-images';
  
  /**
   * Upload une image vers Supabase Storage
   */
  static async uploadImage(file: File, productId?: string): Promise<string> {
    try {
      console.log('📤 Upload d\'image en cours...', { fileName: file.name, size: file.size });
      
      // Générer un nom unique pour le fichier
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId || 'temp'}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;
      
      // Upload vers Supabase Storage
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('❌ Erreur lors de l\'upload:', error);
        throw new Error(`Erreur lors de l'upload: ${error.message}`);
      }
      
      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath);
      
      console.log('✅ Image uploadée avec succès:', urlData.publicUrl);
      return urlData.publicUrl;
      
    } catch (error) {
      console.error('❌ Erreur dans uploadImage:', error);
      throw error;
    }
  }
  
  /**
   * Supprime une image de Supabase Storage
   */
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      console.log('🗑️ Suppression d\'image:', imageUrl);
      
      // Extraire le chemin du fichier depuis l'URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const bucketIndex = pathParts.findIndex(part => part === this.BUCKET_NAME);
      
      if (bucketIndex === -1) {
        throw new Error('URL d\'image invalide');
      }
      
      const filePath = pathParts.slice(bucketIndex + 1).join('/');
      
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);
      
      if (error) {
        console.error('❌ Erreur lors de la suppression:', error);
        throw new Error(`Erreur lors de la suppression: ${error.message}`);
      }
      
      console.log('✅ Image supprimée avec succès');
      
    } catch (error) {
      console.error('❌ Erreur dans deleteImage:', error);
      throw error;
    }
  }
  
  /**
   * Upload multiple images
   */
  static async uploadMultipleImages(files: File[], productId?: string): Promise<string[]> {
    try {
      console.log(`📤 Upload de ${files.length} images...`);
      
      const uploadPromises = files.map(file => this.uploadImage(file, productId));
      const urls = await Promise.all(uploadPromises);
      
      console.log(`✅ ${urls.length} images uploadées avec succès`);
      return urls;
      
    } catch (error) {
      console.error('❌ Erreur dans uploadMultipleImages:', error);
      throw error;
    }
  }
  
  /**
   * Valide un fichier image
   */
  static validateImageFile(file: File): { isValid: boolean; error?: string } {
    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Type de fichier non supporté. Utilisez JPG, PNG ou WebP.'
      };
    }
    
    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Le fichier est trop volumineux. Taille maximum: 5MB.'
      };
    }
    
    return { isValid: true };
  }
}
