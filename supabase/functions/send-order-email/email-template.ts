// ============================================================
// NOURYA — Email Templates
// Palette: #080400 (dark bg), #C4A45C (gold), #FBF6EE (cream)
// ============================================================

interface OrderItem {
  name: string
  quantity: number
  price: number
  format?: string
}

interface Order {
  order_number: string
  customer_name: string
  email?: string
  phone: string
  address: string
  wilaya: string
  items: OrderItem[]
  subtotal?: number
  total: number
  payment_method: string
  notes?: string
  created_at?: string
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' DA'
}

function getPaymentInstructions(method: string): string {
  switch (method) {
    case 'ccp':
      return `
        <div style="background:#1a1409;border:1px solid #C4A45C;border-radius:8px;padding:20px;margin:20px 0;">
          <p style="color:#C4A45C;font-weight:bold;margin:0 0 10px 0;font-size:16px;">💳 Paiement CCP</p>
          <p style="color:#FBF6EE;margin:0 0 8px 0;">Veuillez effectuer votre virement au compte CCP indiqué ci-dessous :</p>
          <p style="color:#FBF6EE;margin:0 0 4px 0;font-size:13px;">• Connectez-vous sur <strong>www.ccp.dz</strong> ou rendez-vous à votre bureau de poste</p>
          <p style="color:#FBF6EE;margin:0 0 4px 0;font-size:13px;">• Effectuez un virement avec votre numéro de commande en référence</p>
          <p style="color:#FBF6EE;margin:0;font-size:13px;">• Envoyez le reçu par WhatsApp pour confirmation rapide</p>
        </div>`
    case 'baridimob':
      return `
        <div style="background:#1a1409;border:1px solid #C4A45C;border-radius:8px;padding:20px;margin:20px 0;">
          <p style="color:#C4A45C;font-weight:bold;margin:0 0 10px 0;font-size:16px;">📱 Paiement BaridiMob</p>
          <p style="color:#FBF6EE;margin:0 0 8px 0;">Envoyez le montant via l'application BaridiMob :</p>
          <p style="color:#FBF6EE;margin:0 0 4px 0;font-size:13px;">• Ouvrez l'application BaridiMob sur votre téléphone</p>
          <p style="color:#FBF6EE;margin:0 0 4px 0;font-size:13px;">• Sélectionnez "Transfert d'argent" et entrez le numéro NOURYA</p>
          <p style="color:#FBF6EE;margin:0;font-size:13px;">• Mentionnez votre numéro de commande dans la référence</p>
        </div>`
    case 'cib':
      return `
        <div style="background:#1a1409;border:1px solid #C4A45C;border-radius:8px;padding:20px;margin:20px 0;">
          <p style="color:#C4A45C;font-weight:bold;margin:0 0 10px 0;font-size:16px;">🏦 Paiement CIB / Virement bancaire</p>
          <p style="color:#FBF6EE;margin:0 0 8px 0;">Effectuez un virement bancaire vers notre RIB :</p>
          <p style="color:#FBF6EE;margin:0 0 4px 0;font-size:13px;">• Connectez-vous à votre espace bancaire en ligne</p>
          <p style="color:#FBF6EE;margin:0 0 4px 0;font-size:13px;">• Ajoutez NOURYA comme bénéficiaire avec le RIB fourni</p>
          <p style="color:#FBF6EE;margin:0;font-size:13px;">• Envoyez-nous la confirmation de virement par WhatsApp</p>
        </div>`
    case 'cash':
    default:
      return `
        <div style="background:#1a1409;border:1px solid #C4A45C;border-radius:8px;padding:20px;margin:20px 0;">
          <p style="color:#C4A45C;font-weight:bold;margin:0 0 10px 0;font-size:16px;">💵 Paiement à la livraison</p>
          <p style="color:#FBF6EE;margin:0 0 8px 0;">Vous payez en espèces à la réception de votre colis.</p>
          <p style="color:#FBF6EE;margin:0;font-size:13px;">Préparez le montant exact pour faciliter la livraison.</p>
        </div>`
  }
}

function buildItemsTable(items: OrderItem[]): string {
  const rows = items.map(item => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #2a2010;color:#FBF6EE;font-size:14px;">
        ${item.name}${item.format ? ` <span style="color:#C4A45C;font-size:12px;">(${item.format})</span>` : ''}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #2a2010;color:#C4A45C;text-align:center;font-size:14px;">
        ${item.quantity}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #2a2010;color:#FBF6EE;text-align:right;font-size:14px;white-space:nowrap;">
        ${formatPrice(item.price * item.quantity)}
      </td>
    </tr>`).join('')

  return `
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <thead>
        <tr style="background:#1a1409;">
          <th style="padding:12px 16px;text-align:left;color:#C4A45C;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Produit</th>
          <th style="padding:12px 16px;text-align:center;color:#C4A45C;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Qté</th>
          <th style="padding:12px 16px;text-align:right;color:#C4A45C;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Prix</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>NOURYA</title>
</head>
<body style="margin:0;padding:0;background-color:#080400;font-family:'Georgia',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#080400;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;background:#0f0c06;border:1px solid #2a2010;border-radius:12px;overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f0c06 0%,#1a1409 50%,#0f0c06 100%);padding:40px 40px 30px;text-align:center;border-bottom:1px solid #C4A45C;">
              <p style="margin:0 0 8px 0;color:#C4A45C;font-size:11px;letter-spacing:4px;text-transform:uppercase;">نورية — Beauté Naturelle</p>
              <h1 style="margin:0;color:#C4A45C;font-size:36px;font-weight:normal;letter-spacing:6px;text-transform:uppercase;">NOURYA</h1>
              <p style="margin:8px 0 0 0;color:#FBF6EE;font-size:11px;letter-spacing:2px;opacity:0.6;">Cosmétiques Naturels d'Algérie</p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #2a2010;text-align:center;">
              <p style="margin:0 0 8px 0;color:#C4A45C;font-size:12px;letter-spacing:2px;">NOURYA</p>
              <p style="margin:0 0 4px 0;color:#FBF6EE;font-size:11px;opacity:0.5;">Cosmétiques Naturels • Algérie</p>
              <p style="margin:0;color:#FBF6EE;font-size:11px;opacity:0.4;">Pour toute question, contactez-nous via WhatsApp</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildOrderEmailHtml(order: Order): string {
  const paymentMethodLabels: Record<string, string> = {
    cash: 'Paiement à la livraison',
    ccp: 'Virement CCP',
    baridimob: 'BaridiMob',
    cib: 'Virement CIB / Bancaire',
  }

  const content = `
    <!-- Greeting -->
    <h2 style="color:#FBF6EE;font-size:22px;font-weight:normal;margin:0 0 8px 0;">
      Merci pour votre commande, ${order.customer_name} !
    </h2>
    <p style="color:#C4A45C;font-size:13px;letter-spacing:1px;margin:0 0 24px 0;">
      شكراً على طلبك — Votre commande a bien été reçue
    </p>
    <p style="color:#FBF6EE;font-size:14px;line-height:1.7;margin:0 0 28px 0;opacity:0.85;">
      Nous avons bien reçu votre commande et nous la préparons avec soin.
      Vous recevrez une notification dès l'expédition.
    </p>

    <!-- Order number badge -->
    <div style="background:#1a1409;border:1px solid #C4A45C;border-radius:8px;padding:16px 20px;margin:0 0 28px 0;text-align:center;">
      <p style="color:#FBF6EE;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px 0;opacity:0.7;">Numéro de commande</p>
      <p style="color:#C4A45C;font-size:24px;font-weight:bold;margin:0;letter-spacing:3px;">#${order.order_number}</p>
    </div>

    <!-- Items -->
    <p style="color:#C4A45C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px 0;">Détail de la commande</p>
    ${buildItemsTable(order.items)}

    <!-- Total -->
    <div style="background:#1a1409;border-radius:8px;padding:16px 20px;margin:0 0 28px 0;display:flex;justify-content:space-between;align-items:center;">
      <table width="100%">
        <tr>
          <td style="color:#FBF6EE;font-size:15px;font-weight:bold;">Total</td>
          <td style="color:#C4A45C;font-size:20px;font-weight:bold;text-align:right;">${formatPrice(order.total)}</td>
        </tr>
        <tr>
          <td colspan="2" style="color:#FBF6EE;font-size:12px;opacity:0.6;padding-top:4px;">
            Livraison incluse — ${paymentMethodLabels[order.payment_method] || order.payment_method}
          </td>
        </tr>
      </table>
    </div>

    <!-- Payment instructions -->
    <p style="color:#C4A45C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px 0;">Instructions de paiement</p>
    ${getPaymentInstructions(order.payment_method)}

    <!-- Delivery info -->
    <div style="background:#0a0804;border-radius:8px;padding:16px 20px;margin:0 0 8px 0;">
      <p style="color:#C4A45C;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px 0;">Adresse de livraison</p>
      <p style="color:#FBF6EE;font-size:14px;margin:0 0 4px 0;">${order.customer_name}</p>
      <p style="color:#FBF6EE;font-size:13px;margin:0 0 4px 0;opacity:0.8;">${order.address}</p>
      <p style="color:#FBF6EE;font-size:13px;margin:0 0 4px 0;opacity:0.8;">Wilaya: ${order.wilaya}</p>
      <p style="color:#FBF6EE;font-size:13px;margin:0;opacity:0.8;">Tél: ${order.phone}</p>
    </div>

    ${order.notes ? `
    <div style="background:#0a0804;border-left:3px solid #C4A45C;padding:12px 16px;margin-top:16px;border-radius:0 6px 6px 0;">
      <p style="color:#C4A45C;font-size:12px;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px;">Note</p>
      <p style="color:#FBF6EE;font-size:13px;margin:0;opacity:0.8;">${order.notes}</p>
    </div>` : ''}

    <p style="color:#FBF6EE;font-size:13px;margin:28px 0 0 0;opacity:0.7;text-align:center;line-height:1.7;">
      Une question ? Contactez-nous sur WhatsApp ou Instagram <strong style="color:#C4A45C;">@nourya.dz</strong>
    </p>`

  return emailWrapper(content)
}

export function buildAdminEmailHtml(order: Order): string {
  const paymentMethodLabels: Record<string, string> = {
    cash: 'Paiement à la livraison (Espèces)',
    ccp: 'Virement CCP',
    baridimob: 'BaridiMob',
    cib: 'Virement CIB / Bancaire',
  }

  const createdAt = order.created_at
    ? new Date(order.created_at).toLocaleString('fr-DZ', {
        timeZone: 'Africa/Algiers',
        dateStyle: 'full',
        timeStyle: 'short',
      })
    : 'Maintenant'

  const content = `
    <!-- Alert badge -->
    <div style="background:#1a1409;border:1px solid #C4A45C;border-radius:8px;padding:16px 20px;margin:0 0 28px 0;text-align:center;">
      <p style="color:#C4A45C;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px 0;">Nouvelle commande reçue</p>
      <p style="color:#FBF6EE;font-size:26px;font-weight:bold;margin:0;letter-spacing:3px;">#${order.order_number}</p>
      <p style="color:#FBF6EE;font-size:12px;margin:6px 0 0 0;opacity:0.6;">${createdAt}</p>
    </div>

    <!-- Customer info -->
    <p style="color:#C4A45C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;">Informations client</p>
    <div style="background:#0a0804;border-radius:8px;padding:20px;margin:0 0 28px 0;">
      <table width="100%" style="border-collapse:collapse;">
        <tr>
          <td style="color:#FBF6EE;opacity:0.6;font-size:12px;padding:6px 0;width:130px;text-transform:uppercase;letter-spacing:0.5px;">Nom</td>
          <td style="color:#FBF6EE;font-size:14px;font-weight:bold;padding:6px 0;">${order.customer_name}</td>
        </tr>
        <tr>
          <td style="color:#FBF6EE;opacity:0.6;font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.5px;">Téléphone</td>
          <td style="padding:6px 0;"><a href="tel:${order.phone}" style="color:#C4A45C;font-size:14px;text-decoration:none;">${order.phone}</a></td>
        </tr>
        ${order.email ? `
        <tr>
          <td style="color:#FBF6EE;opacity:0.6;font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
          <td style="padding:6px 0;"><a href="mailto:${order.email}" style="color:#C4A45C;font-size:14px;text-decoration:none;">${order.email}</a></td>
        </tr>` : ''}
        <tr>
          <td style="color:#FBF6EE;opacity:0.6;font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.5px;">Adresse</td>
          <td style="color:#FBF6EE;font-size:14px;padding:6px 0;">${order.address}</td>
        </tr>
        <tr>
          <td style="color:#FBF6EE;opacity:0.6;font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.5px;">Wilaya</td>
          <td style="color:#FBF6EE;font-size:14px;padding:6px 0;">${order.wilaya}</td>
        </tr>
      </table>
    </div>

    <!-- Items -->
    <p style="color:#C4A45C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px 0;">Articles commandés</p>
    ${buildItemsTable(order.items)}

    <!-- Total & Payment -->
    <div style="background:#1a1409;border-radius:8px;padding:20px;margin:0 0 28px 0;">
      <table width="100%">
        <tr>
          <td style="color:#FBF6EE;opacity:0.7;font-size:13px;padding:4px 0;">Sous-total</td>
          <td style="color:#FBF6EE;font-size:13px;text-align:right;padding:4px 0;">${formatPrice(order.subtotal ?? order.total)}</td>
        </tr>
        <tr>
          <td style="color:#FBF6EE;opacity:0.7;font-size:13px;padding:4px 0;">Livraison</td>
          <td style="color:#C4A45C;font-size:13px;text-align:right;padding:4px 0;">Incluse</td>
        </tr>
        <tr>
          <td colspan="2" style="border-top:1px solid #2a2010;padding:4px 0;"></td>
        </tr>
        <tr>
          <td style="color:#FBF6EE;font-size:16px;font-weight:bold;padding:4px 0;">TOTAL</td>
          <td style="color:#C4A45C;font-size:20px;font-weight:bold;text-align:right;padding:4px 0;">${formatPrice(order.total)}</td>
        </tr>
        <tr>
          <td colspan="2" style="color:#FBF6EE;opacity:0.6;font-size:12px;padding:8px 0 0 0;">
            Mode de paiement: <strong style="color:#FBF6EE;">${paymentMethodLabels[order.payment_method] || order.payment_method}</strong>
          </td>
        </tr>
      </table>
    </div>

    ${order.notes ? `
    <div style="background:#0a0804;border-left:3px solid #C4A45C;padding:12px 16px;margin-bottom:20px;border-radius:0 6px 6px 0;">
      <p style="color:#C4A45C;font-size:12px;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px;">Note du client</p>
      <p style="color:#FBF6EE;font-size:13px;margin:0;">${order.notes}</p>
    </div>` : ''}

    <!-- Action reminder -->
    <div style="background:#1a1409;border:1px dashed #C4A45C;border-radius:8px;padding:16px 20px;text-align:center;">
      <p style="color:#C4A45C;font-size:13px;font-weight:bold;margin:0 0 6px 0;">Action requise</p>
      <p style="color:#FBF6EE;font-size:12px;margin:0;opacity:0.8;">
        Connectez-vous au panneau admin pour traiter cette commande et mettre à jour son statut.
      </p>
    </div>`

  return emailWrapper(content)
}
