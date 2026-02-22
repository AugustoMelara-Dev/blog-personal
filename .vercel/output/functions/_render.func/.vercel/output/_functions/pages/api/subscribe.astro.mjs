import * as brevo from '@getbrevo/brevo';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const data = await request.json();
    const email = data.email;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const apiKey = undefined                             ;
    if (!apiKey) {
      console.error("BREVO_API_KEY no configurada");
      return new Response(JSON.stringify({ error: "Error de configuración del servidor" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const defaultClient = brevo.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications["api-key"];
    apiKeyAuth.apiKey = apiKey;
    const apiInstance = new brevo.ContactsApi();
    const createContact = new brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = [2];
    createContact.updateEnabled = true;
    await apiInstance.createContact(createContact);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    if (error.response?.body?.code === "duplicate_parameter") {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.error("Error suscribiendo email:", error);
    return new Response(JSON.stringify({ error: "Error al procesar la suscripción" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
