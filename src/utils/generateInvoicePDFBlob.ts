import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// --- Interfaces des données ---
interface ProductItem {
  product: {
    name: string
    price: number
    images: string[]
  }
  quantity: number
  selectedColor: string
  selectedSize: string
}

interface OrderDetails {
  id: string
  orderId: string
  customerName: string
  customerEmail: string
  total: number
  createdAt: string
  orderDetails: {
    cartItems: ProductItem[]
    subtotal: number
    shipping: number
    total: number
  }
}

/**
 * Génère un PDF de facture et déclenche le téléchargement.
 * @param order Les données complètes de la commande/facture selon la structure OrderDetails.
 */
const generateInvoicePDFBlob = (order: OrderDetails) => {
  // 1️⃣ Initialisation du document PDF
  const doc = new jsPDF()
  let yOffset = 15
  const marginX = 15

  // --- 2️⃣ En-tête ---
  doc.setFontSize(24)
  doc.text(`FACTURE N° : ${order.id}`, 105, yOffset, { align: 'center' })
  yOffset += 12

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Facture N° : ${order.id}`, marginX, yOffset)
  doc.text(
    `Date de Commande : ${new Date(order.createdAt).toLocaleDateString()}`,
    marginX,
    yOffset + 5
  )
  yOffset += 15

  // --- 3️⃣ Informations client ---
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Détails du Client :', marginX, yOffset)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Nom : ${order.customerName}`, marginX, yOffset + 5)
  doc.text(`Email : ${order.customerEmail}`, marginX, yOffset + 10)
  yOffset += 20

  // --- 4️⃣ Détails des articles ---
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Articles de la Commande', marginX, yOffset)
  yOffset += 5

  const tableColumn = [
    'Article',
    'Options',
    'Quantité',
    'Prix Unitaire TTC',
    'Total TTC'
  ]
  const tableRows = order.orderDetails.cartItems.map(item => {
    const itemTotal = item.quantity * item.product.price
    return [
      item.product.name,
      `Couleur : ${item.selectedColor}, Taille : ${item.selectedSize}`,
      item.quantity.toString(),
      `${item.product.price.toFixed(2)} €`,
      `${itemTotal.toFixed(2)} €`
    ]
  })

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: yOffset,
    headStyles: { fillColor: [50, 50, 50] },
    bodyStyles: { textColor: [0, 0, 0] },
    margin: { left: marginX, right: marginX }
  })

  const finalY = (doc as any).lastAutoTable?.finalY || yOffset + 10

  const totalsXRight = 195 // position du montant aligné à droite
  const totalsXLeft = marginX + 10 // position du label à gauche
  let totalsY = finalY + 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  // Sous-total
  doc.text(
    `Sous-total : ${order.orderDetails.subtotal.toFixed(2)} €`,
    totalsXRight,
    totalsY,
    { align: 'right' }
  )
  totalsY += 5

  // Frais de livraison
  doc.text(
    `Frais de Livraison : ${order.orderDetails.shipping.toFixed(2)} €`,
    totalsXRight,
    totalsY,
    { align: 'right' }
  )
  totalsY += 7

  // TOTAL NET À PAYER
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL NET À PAYER :', totalsXLeft, totalsY, { align: 'left' }) // label à gauche
  doc.text(`${order.orderDetails.total.toFixed(2)} €`, totalsXRight, totalsY, {
    align: 'right'
  }) // montant à droite

  // --- 6️⃣ Téléchargement PDF ---
  return doc.output('arraybuffer')
}

export { generateInvoicePDFBlob }
