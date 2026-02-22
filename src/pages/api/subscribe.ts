import type { APIRoute } from 'astro'
import { Resend } from 'resend'

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY)
  const { email } = await request.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Email inválido' }), {
      status: 400,
    })
  }

  try {
    await resend.contacts.create({
      email,
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al suscribir' }), {
      status: 500,
    })
  }
}
