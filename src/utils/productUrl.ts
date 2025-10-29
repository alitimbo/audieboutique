// Fonction utilitaire pour formater le nom de la catégorie en URL (kebab-case)
export const formatCategoryNameForUrl = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD') // Normalise la chaîne en décomposant les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (les accents)
    .replace(/ & /g, '-') // Remplace ' & ' par '-'
    .replace(/ /g, '-') // Remplace les espaces par '-'
    .replace(/'/g, '') // Supprime les apostrophes
}

export const getOriginalTagWithSwitch = (urlTag: string) => {
  switch (urlTag.toLowerCase()) {
    case 'nouveautes':
      return 'Nouveautés'
    case 'soldes':
      return 'Soldes'
    case 'collections':
      return 'Collections'
    case 'exclusivites':
      return 'Exclusivités'
    case 'meilleures_ventes':
      return 'Meilleures ventes'
    case 'promo':
      return 'Promo'
    default:
      return null
  }
}

/**
 * Récupère le nom de la catégorie d'origine en utilisant une instruction switch.
 * @param {string} urlCategory Le nom de catégorie formaté pour l'URL.
 * @returns {string | null} Le nom de la catégorie d'origine ou null si non trouvé.
 */
export const getOriginalCategoryNameWithSwitch = (
  urlCategory: string
): string | null => {
  // Normalize the URL string to match the switch cases
  const normalizedUrl = urlCategory
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/'/g, '')

  switch (normalizedUrl) {
    case 'special-fetes':
      return 'Spécial Fêtes'
    case 'femmes':
      return 'Femmes'
    case 'corsets-gaines':
      return 'Corsets & Gaines'
    case 'maillots-de-bain':
      return 'Maillots de bain'
    case 'sacs-portes-monnaies':
      return 'Sacs & portes monnaies'
    case 'bijoux':
      return 'Bijoux'
    case 'en-couple':
      return 'En couple'
    case 'ensembles':
      return 'Ensembles'
    case 'chemises-tops':
      return 'Chemises & tops'
    case 'robes':
      return 'Robes'
    case 'combinaisons':
      return 'Combinaisons'
    default:
      return null
  }
}
