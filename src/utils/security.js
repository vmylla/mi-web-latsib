/**
 * ------------------------------------------------------------------
 * UTILIDADES DE SEGURIDAD Y ENCRIPTACIÓN (SHA-256 & TOKENS)
 * ------------------------------------------------------------------
 */

export async function hashPassword(password) {
  if (!password) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "_latsib_salt_2026");
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    console.error('Error al generar hash SHA-256:', err);
    // Fallback simple si SubtleCrypto no estuviera disponible
    return btoa(password);
  }
}

export function generateToken(prefix = 'tok') {
  const randomPart = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
  const timestamp = Date.now().toString(36);
  return `${prefix}_${timestamp}_${randomPart}`;
}

export function generate2FACode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
