import sanitizeHtml from "sanitize-html";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+\-\s()]{7,}$/;
const submissions = new Map<string, number>();
const WINDOW_MS = 60_000;

export function cleanText(value: FormDataEntryValue | null) {
  return sanitizeHtml(String(value ?? "").trim(), {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export function validateRequired(value: string, field: string) {
  if (!value) {
    throw new Error(`El campo ${field} es obligatorio.`);
  }
}

export function validateEmail(value: string) {
  if (!emailRegex.test(value)) {
    throw new Error("Ingresa un correo valido.");
  }
}

export function validatePhone(value: string) {
  if (value && !phoneRegex.test(value)) {
    throw new Error("Ingresa un telefono valido.");
  }
}

export function checkHoneypot(value: FormDataEntryValue | null) {
  if (String(value ?? "").trim()) {
    throw new Error("Solicitud rechazada.");
  }
}

export function checkRateLimit(key: string) {
  const now = Date.now();
  const previous = submissions.get(key);

  if (previous && now - previous < WINDOW_MS) {
    throw new Error("Espera un momento antes de enviar otra solicitud.");
  }

  submissions.set(key, now);
}
