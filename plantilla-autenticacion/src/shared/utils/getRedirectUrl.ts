/**
 * Helper para obtener la URL de redirección correcta según el entorno
 * Evita problemas de redirección entre localhost y producción
 */
export function getRedirectUrl(): string {
  // 1. Prioridad: Variable de entorno configurada
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // 2. Fallback: Detectar automáticamente basado en window.location
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;

    // Si estamos en localhost, usar el puerto actual
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:${port}`;
    }

    // En producción, usar el origin completo
    return window.location.origin;
  }

  // 3. Fallback final para SSR
  return 'http://localhost:3000';
}

/**
 * Obtiene la URL de callback para OAuth
 */
export function getAuthCallbackUrl(): string {
  const baseUrl = getRedirectUrl();
  return baseUrl;
}
