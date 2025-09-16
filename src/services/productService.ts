import { supabase } from '../lib/supabase'
import { Product, ProductFormData, ProductFilters, StockMovementDb } from '../types/product'

export class ProductService {
  // Récupérer tous les produits avec filtres
  static async getProducts (filters?: ProductFilters): Promise<Product[]> {
    try {
      console.log('🔍 Récupération des produits avec filtres:', filters)

      // Requête de base SANS filtres pour déboguer
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📡 Exécution de la requête...')
      const { data, error } = await query

      if (error) {
        console.error('❌ Erreur Supabase:', error)
        throw new Error(`Erreur Supabase: ${error.message}`)
      }

      console.log('✅ Données récupérées:', data?.length || 0, 'produits')
      console.log('📦 Produits:', data)

      // Appliquer les filtres côté client pour déboguer
      let filteredData = data || []

      if (filters) {
        console.log('🔧 Application des filtres côté client...')

        if (filters.search) {
          filteredData = filteredData.filter(
            product =>
              product.name
                ?.toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              product.description
                ?.toLowerCase()
                .includes(filters.search.toLowerCase())
          )
        }

        if (filters.category && filters.category !== 'all') {
          filteredData = filteredData.filter(
            product => product.category === filters.category
          )
        }

        if (filters.status && filters.status !== 'all') {
          switch (filters.status) {
            case 'active':
              filteredData = filteredData.filter(
                product => product.active && !product.archived
              )
              break
            case 'archived':
              filteredData = filteredData.filter(product => product.archived)
              break
            case 'out_of_stock':
              filteredData = filteredData.filter(product => product.stock === 0)
              break
          }
        }

        if (filters.featured !== null) {
          filteredData = filteredData.filter(
            product => product.featured === filters.featured
          )
        }
      }

      console.log('🎯 Produits après filtrage:', filteredData?.length || 0)
      return filteredData
    } catch (error) {
      console.error('💥 Erreur ProductService.getProducts:', error)
      throw error
    }
  }

  // Récupérer un produit par ID
  static async getProductById (id: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Produit non trouvé
        }
        console.error('Erreur lors de la récupération du produit:', error)
        throw new Error('Impossible de récupérer le produit')
      }

      return data
    } catch (error) {
      console.error('Erreur ProductService.getProductById:', error)
      throw error
    }
  }

  // Créer un nouveau produit
  static async createProduct (productData: ProductFormData): Promise<Product> {
    try {
      console.log("🆕 Création d'un nouveau produit:", productData)

      const newProduct = {
        ...productData,
        archived: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('📤 Envoi des données à Supabase:', newProduct)

      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()
        .single()

      if (error) {
        console.error('❌ Erreur lors de la création du produit:', error)
        throw new Error(`Impossible de créer le produit: ${error.message}`)
      }

      console.log('✅ Produit créé avec succès:', data)
      return data
    } catch (error) {
      console.error('💥 Erreur ProductService.createProduct:', error)
      throw error
    }
  }

  // Mettre à jour un produit
  static async updateProduct (
    id: string,
    productData: Partial<ProductFormData>
  ): Promise<Product> {
    try {
      console.log('✏️ Mise à jour du produit:', id, productData)

      const updateData = {
        ...productData,
        updated_at: new Date().toISOString()
      }

      console.log('📤 Envoi des données de mise à jour:', updateData)

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('❌ Erreur lors de la mise à jour du produit:', error)
        throw new Error(
          `Impossible de mettre à jour le produit: ${error.message}`
        )
      }

      console.log('✅ Produit mis à jour avec succès:', data)
      return data
    } catch (error) {
      console.error('💥 Erreur ProductService.updateProduct:', error)
      throw error
    }
  }

  // Archiver/désarchiver un produit
  static async toggleArchiveProduct (
    id: string,
    archived: boolean
  ): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          archived,
          active: !archived, // Si archivé, alors inactif
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error("Erreur lors de l'archivage du produit:", error)
        throw new Error('Impossible de modifier le statut du produit')
      }

      return data
    } catch (error) {
      console.error('Erreur ProductService.toggleArchiveProduct:', error)
      throw error
    }
  }

  // Supprimer définitivement un produit
  static async deleteProduct (id: string): Promise<void> {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)

      if (error) {
        console.error('Erreur lors de la suppression du produit:', error)
        throw new Error('Impossible de supprimer le produit')
      }
    } catch (error) {
      console.error('Erreur ProductService.deleteProduct:', error)
      throw error
    }
  }

  // Mettre à jour le stock d'un produit
  static async updateStock (id: string, stock: number): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          stock,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erreur lors de la mise à jour du stock:', error)
        throw new Error('Impossible de mettre à jour le stock')
      }

      return data
    } catch (error) {
      console.error('Erreur ProductService.updateStock:', error)
      throw error
    }
  }

  //Enregistrer le mouvement du stock
  static async addStockMovement (
    productId: string,
    newStock: number,
    movement: {
      type: 'in' | 'out' | 'adjustment'
      quantity: number
      reason: string
    }
  ): Promise<void> {
    try {
      // Récupérer l'ID de l'utilisateur connecté
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData?.user?.id || null

      const { error } = await supabase.from('stock_movements').insert({
        product_id: productId,
        type: movement.type,
        quantity_change: movement.quantity,
        reason: movement.reason,
        // La nouvelle quantité sera le nouveau stock, qui est déjà calculé
        new_stock: newStock, // Nous ne le connaissons pas encore ici
        user_id: userId
      })

      if (error) {
        console.error('Erreur lors de l’ajout du mouvement de stock:', error)
        throw new Error('Impossible d’enregistrer le mouvement de stock')
      }
    } catch (error) {
      console.error('Erreur ProductService.addStockMovement:', error)
      throw error
    }
  }

  //recuperer la liste des mouvements
  static async getStockMovementById (productId: string): Promise<StockMovementDb[]> {
    try {
      const { data, error } = await supabase
        .from('stock_movements')
        .select('*')
        .match({ product_id: productId });

      if (error) {
        console.error('Erreur lors de la récupération des mouvements de stock:', error)
        throw new Error('Impossible de récupérer les mouvements de stock')
      }

      return data || [];
    } catch (error) {
      console.error('Erreur ProductService.getStockMovementById:', error)
      throw error;
    }
  }

  // Récupérer les produits en vedette
  static async getFeaturedProducts (limit: number = 8): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .eq('active', true)
        .eq('archived', false)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error(
          'Erreur lors de la récupération des produits en vedette:',
          error
        )
        throw new Error('Impossible de récupérer les produits en vedette')
      }

      return data || []
    } catch (error) {
      console.error('Erreur ProductService.getFeaturedProducts:', error)
      throw error
    }
  }

  // Récupérer les produits par catégorie
  static async getProductsByCategory (
    category: string,
    limit?: number
  ): Promise<Product[]> {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('active', true)
        .eq('archived', false)
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        console.error(
          'Erreur lors de la récupération des produits par catégorie:',
          error
        )
        throw new Error(
          'Impossible de récupérer les produits de cette catégorie'
        )
      }

      return data || []
    } catch (error) {
      console.error('Erreur ProductService.getProductsByCategory:', error)
      throw error
    }
  }

  // Rechercher des produits
  static async searchProducts (searchTerm: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`
        )
        .eq('active', true)
        .eq('archived', false)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors de la recherche de produits:', error)
        throw new Error('Impossible de rechercher les produits')
      }

      return data || []
    } catch (error) {
      console.error('Erreur ProductService.searchProducts:', error)
      throw error
    }
  }
}
