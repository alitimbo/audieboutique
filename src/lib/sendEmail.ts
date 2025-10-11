const sendEmail = async (
  subject: string,
  recipients: string[],
  body: string | HTMLElement,
  attachments: File[]
) => {
  const ENDPOINT = `${
    import.meta.env.VITE_SUPABASE_URL
  }/functions/v1/send-email`
  const form = new FormData()

  form.append('subject', subject)
  form.append('recipients', JSON.stringify(recipients))
  form.append('body', typeof body === 'string' ? body : body.outerHTML)

  attachments.forEach((file, index) => {
    form.append(`attachment-${index}`, file, file.name)
  })

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: form
  })

  if (!response.ok) {
    const errorBody = await response.json()
    throw new Error(
      `Échec de l'envoi de l'e-mail: ${errorBody.message || 'Erreur inconnue'}`
    )
  }

  return response.json()
}

export { sendEmail }
