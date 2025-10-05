export async function createCheckout (
  orderId: string,
  userId: string,
  total: number
) {
  try {
    const EDGE_FUNCTION_URL = `${
      import.meta.env.VITE_SUPABASE_URL
    }/functions/v1/create-checkout`

    const response = await fetch(`${EDGE_FUNCTION_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        orderId,
        userId,
        total
      })
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json()

    // Si le backend renvoie l'URL du checkout Stripe :
    if (data.url) {
      window.location.href = data.url // Redirection vers la page Stripe Checkout
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la création du checkout :', error)
    throw error
  }
}
