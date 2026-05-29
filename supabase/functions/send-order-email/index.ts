import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { buildOrderEmailHtml, buildAdminEmailHtml } from "./email-template.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { order, customerEmail, adminEmail } = await req.json()
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const results = []

    // Send confirmation to customer
    if (customerEmail) {
      const customerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'NOURYA <commandes@nourya.dz>',
          to: [customerEmail],
          subject: `✨ Confirmation de commande #${order.order_number} — NOURYA`,
          html: buildOrderEmailHtml(order),
        }),
      })
      results.push({ type: 'customer', status: customerRes.status })
    }

    // Send notification to admin
    if (adminEmail) {
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'NOURYA Boutique <commandes@nourya.dz>',
          to: [adminEmail],
          subject: `🛍️ Nouvelle commande #${order.order_number} — ${order.customer_name}`,
          html: buildAdminEmailHtml(order),
        }),
      })
      results.push({ type: 'admin', status: adminRes.status })
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
