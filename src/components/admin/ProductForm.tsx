import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, X, Plus, Trash2, Tag, Palette } from 'lucide-react'
import { toast } from 'sonner'
import {
  Product,
  ProductFormData,
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  PRODUCT_TAGS
} from '../../types/product'
import { ImageUploader } from './ImageUploader'
import { usePreventReload } from '../../hooks/usePreventReload'

interface ProductFormProps {
  product?: Product
  isOpen: boolean
  onClose: () => void
  onSave: (productData: ProductFormData) => Promise<void>
  mode: 'create' | 'edit'
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    original_price: undefined,
    category: '',
    images: [],
    stock: 0,
    featured: false,
    active: true,
    colors: [],
    sizes: [],
    tags: [],
    specifications: {}
  })

  console.log("specification", formData.specifications)

  const [isLoading, setIsLoading] = useState(false)
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')

  // Clé pour le sessionStorage
  const FORM_STORAGE_KEY = 'admin_product_form_data'

  // Empêcher les rechargements intempestifs quand le modal est ouvert
  const { disableProtection } = usePreventReload({
    when: isOpen,
    message:
      'Vous avez des modifications non sauvegardées dans le formulaire produit. Êtes-vous sûr de vouloir quitter ?'
  })

  // Sauvegarder les données du formulaire
  const saveFormData = (data: ProductFormData) => {
    if (isOpen) {
      sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data))
    }
  }

  // Restaurer les données du formulaire
  const restoreFormData = (): ProductFormData | null => {
    const saved = sessionStorage.getItem(FORM_STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  }

  useEffect(() => {
    if (product && mode === 'edit') {
      const editData = {
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.original_price,
        category: product.category,
        images: product.images,
        stock: product.stock,
        featured: product.featured,
        active: product.active,
        colors: product.colors,
        sizes: product.sizes,
        tags: product.tags,
        specifications: product.specifications
      }
      setFormData(editData)
      saveFormData(editData)
    } else if (mode === 'create') {
      // Essayer de restaurer les données sauvegardées pour le mode création
      const savedData = restoreFormData()
      if (savedData && isOpen) {
        console.log('🔄 Restauration des données du formulaire:', savedData)
        setFormData(savedData)
      } else {
        // Reset form for create mode
        const defaultData = {
          name: '',
          description: '',
          price: 0,
          original_price: undefined,
          category: '',
          images: [],
          stock: 0,
          featured: false,
          active: true,
          colors: [],
          sizes: [],
          tags: [],
          specifications: {}
        }
        setFormData(defaultData)
        if (isOpen) saveFormData(defaultData)
      }
    }
  }, [product, mode, isOpen])

  // Sauvegarder automatiquement à chaque modification
  useEffect(() => {
    if (isOpen) {
      console.log('💾 Sauvegarde automatique des données du formulaire')
      saveFormData(formData)
    }
  }, [formData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    if (formData.price <= 0) {
      toast.error('Le prix doit être supérieur à 0')
      return
    }

    if (formData.stock < 0) {
      toast.error('Le stock ne peut pas être négatif')
      return
    }

    setIsLoading(true)
    try {
      await onSave(formData)
      toast.success(
        mode === 'create'
          ? 'Produit créé avec succès'
          : 'Produit modifié avec succès'
      )

      // Nettoyer le sessionStorage après une sauvegarde réussie
      sessionStorage.removeItem(FORM_STORAGE_KEY)
      sessionStorage.removeItem('admin_product_modal_state')

      // Désactiver la protection contre les rechargements
      disableProtection()

      onClose()
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleColor = (color: typeof PRODUCT_COLORS[0]) => {
    setFormData(prev => {
      const exists = prev.colors.find(c => c.value === color.value)
      if (exists) {
        return {
          ...prev,
          colors: prev.colors.filter(c => c.value !== color.value)
        }
      } else {
        return {
          ...prev,
          colors: [...prev.colors, color]
        }
      }
    })
  }

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }))
  }

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }))
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return {
        ...prev,
        specifications: newSpecs
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className='bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
      >
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {mode === 'create' ? 'Ajouter un produit' : 'Modifier le produit'}
            </h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Informations de base */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Nom du produit *
              </label>
              <input
                type='text'
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
                placeholder='Nom du produit'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData(prev => ({ ...prev, category: e.target.value }))
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
                required
              >
                <option value=''>Sélectionner une catégorie</option>
                {PRODUCT_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prix */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Prix (€) *
              </label>
              <input
                type='number'
                step='0.01'
                min='0'
                value={formData.price}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    price: parseFloat(e.target.value) || 0
                  }))
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
                placeholder='0.00'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Prix original (€)
              </label>
              <input
                type='number'
                step='0.01'
                min='0'
                value={formData.original_price || ''}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    original_price: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined
                  }))
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
                placeholder='Prix barré'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Stock *
              </label>
              <input
                type='number'
                min='0'
                value={formData.stock}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    stock: parseInt(e.target.value) || 0
                  }))
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
                placeholder='Quantité en stock'
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all resize-none'
              placeholder='Description détaillée du produit'
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Images du produit
            </label>
            <ImageUploader
              images={formData.images}
              onImagesChange={images =>
                setFormData(prev => ({ ...prev, images }))
              }
              productId={product?.id}
              maxImages={5}
            />
          </div>

          {/* Couleurs */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <Palette className='w-4 h-4 inline mr-2' />
              Couleurs disponibles
            </label>
            <div className='grid grid-cols-4 md:grid-cols-8 gap-3'>
              {PRODUCT_COLORS.map(color => (
                <button
                  key={color.value}
                  type='button'
                  onClick={() => toggleColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    formData.colors.find(c => c.value === color.value)
                      ? 'border-accent-gold shadow-lg scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {color.value === '#FFFFFF' && (
                    <div className='w-full h-full border border-gray-200 rounded-full' />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tailles */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Tailles disponibles
            </label>
            <div className='flex flex-wrap gap-2'>
              {PRODUCT_SIZES.map(size => (
                <button
                  key={size}
                  type='button'
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    formData.sizes.includes(size)
                      ? 'bg-accent-gold text-luxury-black border-accent-gold'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <Tag className='w-4 h-4 inline mr-2' />
              Tags
            </label>
            <div className='flex flex-wrap gap-2'>
              {PRODUCT_TAGS.map(tag => (
                <button
                  key={tag}
                  type='button'
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    formData.tags.includes(tag)
                      ? 'bg-accent-gold text-luxury-black border-accent-gold'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Spécifications */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Spécifications techniques
            </label>
            <div className='space-y-3'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={newSpecKey}
                  onChange={e => setNewSpecKey(e.target.value)}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
                  placeholder='Nom de la spécification'
                />
                <input
                  type='text'
                  value={newSpecValue}
                  onChange={e => setNewSpecValue(e.target.value)}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all'
                  placeholder='Valeur'
                />
                <button
                  type='button'
                  onClick={addSpecification}
                  className='px-4 py-2 bg-accent-gold text-luxury-black rounded-lg hover:bg-accent-gold/90 transition-colors'
                >
                  <Plus className='w-4 h-4' />
                </button>
              </div>

              {Object.entries(formData.specifications).length > 0 && (
                <div className='space-y-2'>
                  {Object.entries(formData.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <div>
                          <span className='font-medium text-gray-900'>
                            {key}:
                          </span>
                          <span className='text-gray-700 ml-2'>{value}</span>
                        </div>
                        <button
                          type='button'
                          onClick={() => removeSpecification(key)}
                          className='p-1 text-red-500 hover:bg-red-50 rounded transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/*
              <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                <div>
                  <span className='font-medium text-gray-900'>
                    Produit en vedette
                  </span>
                  <p className='text-sm text-gray-600'>
                    Afficher sur la page d'accueil
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={formData.featured}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        featured: e.target.checked
                      }))
                    }
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                </label>
              </div>
            */}

            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div>
                <span className='font-medium text-gray-900'>Produit actif</span>
                <p className='text-sm text-gray-600'>Visible sur le site</p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={formData.active}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, active: e.target.checked }))
                  }
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className='flex justify-end gap-3 pt-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Annuler
            </button>
            <motion.button
              type='submit'
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='px-6 py-2 bg-accent-gold text-luxury-black font-semibold rounded-lg hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center'
            >
              <Save className='w-4 h-4 mr-2' />
              {isLoading
                ? 'Sauvegarde...'
                : mode === 'create'
                ? 'Créer le produit'
                : 'Sauvegarder'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
