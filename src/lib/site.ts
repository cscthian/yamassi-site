/**
 * Configuración centralizada de dominios y URLs del ecosistema Yamassi.
 *
 * Utiliza automáticamente las variables de entorno de Astro / Vite:
 * - Durante `npm run dev`: toma los valores definidos en `.env.development`
 * - Durante `npm run build`: toma los valores definidos en `.env.production`
 * - Puede ser sobreescrito localmente con `.env.local`
 */

// Entorno activo
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
export const CURRENT_ENV =
  import.meta.env.PUBLIC_ENV || (IS_DEV ? "development" : "production");

// URL base del sitio web institucional
export const SITE_URL: string =
  import.meta.env.PUBLIC_SITE_URL ||
  (IS_DEV ? "http://localhost:4321" : "https://yamassi.com");

// URL de la plataforma Yamassi Tienda (Market / Retail)
export const TIENDA_URL: string =
  import.meta.env.PUBLIC_TIENDA_URL ||
  (IS_DEV ? "http://localhost:3000/" : "https://tienda.yamassi.com/");

// URL de la plataforma Yamassi Restobar (Restaurantes, Bares, Cafeterías)
export const RESTOBAR_URL: string =
  import.meta.env.PUBLIC_RESTOBAR_URL ||
  (IS_DEV ? "http://localhost:3002/" : "https://restobar.yamassi.com/");

// URL de la plataforma Yamassi Citas (Clínicas, Consultorios, Odontología)
export const CITAS_URL: string =
  import.meta.env.PUBLIC_CITAS_URL ||
  (IS_DEV ? "http://localhost:3003/" : "https://citas.yamassi.com/");

// URL de la API backend central
export const API_URL: string =
  import.meta.env.PUBLIC_API_URL ||
  (IS_DEV ? "http://localhost:8000/api" : "https://api.yamassi.com/api");

// Datos institucionales
export const SITE_NAME: string =
  import.meta.env.PUBLIC_SITE_NAME || "Yamassi";
export const SUPPORT_EMAIL: string =
  import.meta.env.PUBLIC_SUPPORT_EMAIL || "soporte@yamassi.com";
export const WHATSAPP_NUMBER: string =
  import.meta.env.PUBLIC_WHATSAPP_NUMBER || "+51900000000";

/**
 * Función utilitaria para extraer el nombre de dominio legible (ej: tienda.yamassi.com o localhost:3000)
 */
export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}
