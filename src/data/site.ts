import { SITE } from "../config";
import siteSettings from "../content/settings/site.json";

export const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/horarios", label: "Horarios" },
  { href: "/ubicacion", label: "Ubicacion" },
  { href: "/creemos", label: "Creemos" },
  { href: "/ministerios", label: "Ministerios" },
  { href: "/sermones", label: "Sermones" },
  { href: "/estudios-biblicos", label: "Estudios biblicos" },
  { href: "/articulos", label: "Articulos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contacto", label: "Contacto" },
];

export const utilityNavigation = [
  { href: "/visitanos", label: "Visitanos" },
  { href: "/oracion", label: "Pide oracion" },
  { href: "/buscar", label: "Buscar" },
];

export const churchInfo = {
  ...SITE,
  name: siteSettings.churchName,
  legalName: siteSettings.legalName,
  localIdentifier: siteSettings.localIdentifier,
  tagline: siteSettings.tagline,
  description: siteSettings.description,
  mission: siteSettings.mission,
  vision: siteSettings.vision,
  heroTitle: siteSettings.heroTitle,
  heroScripture: siteSettings.heroScripture,
  establishedNote: siteSettings.establishedNote,
  address: siteSettings.address,
  addressLine2: siteSettings.addressLine2,
  reference: siteSettings.reference,
  mapQuery: siteSettings.mapQuery,
  mapUrl: siteSettings.mapUrl,
  email: siteSettings.email,
  phone: siteSettings.phone,
  whatsappUrl: siteSettings.whatsapp,
  city: siteSettings.city,
  region: siteSettings.region,
  countryCode: siteSettings.countryCode,
  canonicalUrl: siteSettings.canonicalUrl,
  logo: siteSettings.logo,
  social: siteSettings.social,
  contactPerson: siteSettings.contactPerson,
  visitNote:
    "Nos encantara recibirte para adorar a Dios, estudiar la Biblia y compartir esperanza juntos.",
  serviceTimes: siteSettings.serviceTimes,
};

export const homeHighlights = [
  {
    title: "Una esperanza para este tiempo",
    description:
      "La Iglesia Adventista del Septimo Dia lleva esperanza al mundo para que las personas vivan con la certeza de que su historia no termina aqui.",
  },
  {
    title: "Mision centrada en Cristo",
    description: siteSettings.mission,
  },
  {
    title: "Fe practica y compasion",
    description:
      "Vivimos la fe a traves de la adoracion, la ensenanza biblica, el servicio a la comunidad y la proclamacion de esperanza.",
  },
];

export const visitExpectations = [
  "Un programa reverente, ordenado y amable para toda la familia.",
  "Servicio de cantos el sabado desde las 8:45 a. m. y programacion general hasta alrededor de las 11:30 a. m. o 11:45 a. m.",
  "Indicaciones claras para nuevos asistentes, ninos y visitas primerizas.",
];

export const contactReasons = [
  "Informacion general sobre la iglesia",
  "Solicitud de visita o acompanamiento pastoral",
  "Peticion de oracion",
  "Interes en estudios biblicos",
];

export function isPendingValue(value?: string | null) {
  return !value || value.includes("[PENDIENTE");
}

export function isExternalUrl(value?: string | null) {
  return Boolean(value && /^https?:\/\//.test(value));
}
