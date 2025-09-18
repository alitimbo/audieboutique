import { Product } from '../types/product' // Assurez-vous que le chemin est correct

/**
 * Filtre un tableau de produits par nom.
 * @param products Le tableau complet des produits.
 * @param searchTerm Le terme de recherche.
 * @returns Un nouveau tableau contenant les produits qui correspondent au terme de recherche.
 */
export const searchProductsByName = (
  products: Product[],
  searchTerm: string
): Product[] => {
  // Gérer les cas où le terme de recherche est vide ou null
  if (!searchTerm || searchTerm.trim() === '') {
    return products // Retourne tous les produits si la recherche est vide
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim()

  return products.filter(product =>
    product.name.toLowerCase().includes(normalizedSearchTerm)
  )
}

/**
 * Filtre un tableau de produits par un tag spécifique.
 * @param products Le tableau complet des produits.
 * @param selectedTag Le tag sélectionné (ex. 'Nouveautés', 'Soldes').
 * @returns Un nouveau tableau contenant les produits qui ont le tag spécifié.
 */
export const filterProductsByTag = (
  products: Product[],
  selectedTag: string
): Product[] => {
  // Si aucun tag n'est sélectionné, retourner tous les produits
  if (!selectedTag || selectedTag.trim() === '') {
    return products
  }

  // Filtrer les produits dont le tableau de tags inclut le tag sélectionné
  return products.filter(product => product.tags.includes(selectedTag))
}

/**
 * Filtre un tableau de produits par une ou plusieurs catégories.
 * @param products Le tableau complet des produits.
 * @param selectedCategories Un tableau de noms de catégories sélectionnés.
 * @returns Un nouveau tableau contenant les produits qui correspondent aux catégories sélectionnées.
 */
export const filterProductsByCategories = (
  products: Product[],
  selectedCategories: string[]
): Product[] => {
  // Si aucune catégorie n'est sélectionnée, retourner tous les produits
  if (!selectedCategories || selectedCategories.length === 0) {
    return products
  }

  // Filtrer les produits dont le nom de catégorie est inclus dans le tableau des catégories sélectionnées
  return products.filter(product =>
    selectedCategories.includes(product.category)
  )
}

/**
 * Filtre un tableau de produits par une fourchette de prix.
 * @param products Le tableau complet des produits.
 * @param minPrice Le prix minimum (facultatif).
 * @param maxPrice Le prix maximum (facultatif).
 * @returns Un nouveau tableau contenant les produits dans la fourchette de prix spécifiée.
 */
export const filterProductsByPrice = (
  products: Product[],
  minPrice: number | null,
  maxPrice: number | null
): Product[] => {
  // Si les deux valeurs sont nulles, retourner tous les produits
  if (minPrice === null && maxPrice === null) {
    return products
  }

  return products.filter(product => {
    // Convertir le prix du produit en nombre, si ce n'est pas déjà fait
    const price =
      typeof product.price === 'string'
        ? parseFloat(product.price)
        : product.price

    // Vérifier si le prix est supérieur ou égal au prix minimum
    const isAboveMin = minPrice === null || price >= minPrice

    // Vérifier si le prix est inférieur ou égal au prix maximum
    const isBelowMax = maxPrice === null || price <= maxPrice

    // Le produit est inclus si les deux conditions sont vraies
    return isAboveMin && isBelowMax
  })
}

/**
 * Filtre un tableau de produits par une couleur spécifique.
 * @param products Le tableau complet des produits.
 * @param selectedColor La couleur sélectionnée.
 * @returns Un nouveau tableau contenant les produits qui ont la couleur spécifiée.
 */
export const filterProductsByColor = (
  products: Product[],
  selectedColor: string
): Product[] => {
  if (!selectedColor || selectedColor.trim() === '') {
    return products
  }

  return products.filter(product => {
    // Les couleurs sont stockées sous forme de chaîne de caractères JSON, il faut la parser.
    try {
      const colors = JSON.parse(product.colors as any) // Assurez-vous que le type est correctement géré
      return colors.some(
        (color: { name: string; value: string }) => color.name === selectedColor
      )
    } catch (e) {
      console.error('Erreur de parsing des couleurs du produit:', e)
      return false
    }
  })
}

/**
 * Trie un tableau de produits selon une option donnée.
 * @param products Le tableau de produits à trier.
 * @param sortOption L'option de tri (ex: 'price-asc', 'name-desc').
 * @returns Un nouveau tableau trié.
 */
export const sortProducts = (
  products: Product[],
  sortOption: string
): Product[] => {
  // Créez une copie du tableau pour ne pas modifier l'original.
  // C'est une bonne pratique pour éviter les effets de bord inattendus.
  const sortedProducts = [...products]

  switch (sortOption) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price)
    case 'name-asc':
      // Utilisez localeCompare pour un tri de chaînes de caractères correct,
      // en gérant les accents et les majuscules/minuscules.
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
    default:
      // Si l'option n'est pas reconnue, retournez le tableau non trié.
      return sortedProducts
  }
}

/**
 * Filtre avec multifonction complete.
 * @param products Le tableau complet des produits.
 * @param multiple ooptions.
 * @returns Un nouveau tableau contenant les produits qui ont le tags, couleur, etc.
 */
export const applyAllFilters = (
  products: Product[],
  searchTerm: string, // <-- Ajout de l'argument manquant
  selectedTag: string,
  selectedCategories: string[],
  minPrice: number | null,
  maxPrice: number | null,
  selectedColor: string
): Product[] => {
  let filteredProducts = products

  // Appliquer le filtre de recherche en premier
  filteredProducts = searchProductsByName(filteredProducts, searchTerm)

  // Appliquer les autres filtres
  filteredProducts = filterProductsByTag(filteredProducts, selectedTag)
  filteredProducts = filterProductsByCategories(
    filteredProducts,
    selectedCategories
  )
  filteredProducts = filterProductsByPrice(filteredProducts, minPrice, maxPrice)
  filteredProducts = filterProductsByColor(filteredProducts, selectedColor)

  return filteredProducts
}
