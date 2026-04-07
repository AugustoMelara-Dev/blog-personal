import type { APIRoute } from "astro";
import { Resend } from "resend";
import { checkHoneypot, checkRateLimit, cleanText, validateEmail, validateRequired } from "../../lib/forms";

function redirectTo(request: Request, status: "success" | "error") {
  const referer = request.headers.get("referer") ?? "/oracion";
  return Response.redirect(`${referer}${referer.includes("?") ? "&" : "?"}status=${status}`, 303);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const form = await request.formData();
    checkHoneypot(form.get("website"));
    checkRateLimit(`${clientAddress}:prayer`);

    const name = cleanText(form.get("name"));
    const email = cleanText(form.get("email"));
    const message = cleanText(form.get("message"));
    const privateRequest = cleanText(form.get("private"));

    validateRequired(name, "nombre");
    validateRequired(message, "peticion");
    validateEmail(email);

    if (import.meta.env.RESEND_API_KEY && import.meta.env.CONTACT_TO_EMAIL) {
      const resend = new Resend(import.meta.env.RESEND_API_KEY);
      await resend.emails.send({
        from: import.meta.env.CONTACT_FROM_EMAIL ?? "web@iasdlocal.org",
        to: import.meta.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `[Oracion web] ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nPrivada: ${privateRequest ? "Si" : "No"}\n\n${message}`,
      });
    }

    return redirectTo(request, "success");
  } catch {
    return redirectTo(request, "error");
  }
};

export const GET: APIRoute = async () =>
  new Response("Method Not Allowed", { status: 405 });
