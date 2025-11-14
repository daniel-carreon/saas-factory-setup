/**
 * Representa el perfil de un usuario
 */
export interface UserProfile {
  user_id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;

  // Suscripción (opcional, adaptar según necesidades)
  subscription_tier?: string; // 'free' | 'pro_monthly' | 'pro_annual'
  subscription_status?: string; // 'active' | 'inactive' | 'canceled'
  current_period_ends_at?: string | null;

  created_at: string;
  updated_at: string;
}
