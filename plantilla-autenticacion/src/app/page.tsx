'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';

export default function HomePage() {
  const { user, userProfile, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div style={styles.container}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>¡Bienvenido! 🎉</h1>

        <div style={styles.infoSection}>
          <h2 style={styles.subtitle}>Información de tu cuenta:</h2>
          <div style={styles.info}>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Nombre:</strong> {userProfile?.full_name || 'No disponible'}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Plan:</strong> {userProfile?.subscription_tier || 'Free'}</p>
          </div>
        </div>

        {userProfile?.avatar_url && (
          <div style={styles.avatarContainer}>
            <img
              src={userProfile.avatar_url}
              alt="Avatar"
              style={styles.avatar}
            />
          </div>
        )}

        <button
          onClick={signOut}
          style={styles.logoutButton}
        >
          Cerrar Sesión
        </button>

        <div style={styles.successMessage}>
          <p>✅ Autenticación exitosa</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Ahora puedes ver tu sesión en Supabase Dashboard → Authentication → Users
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '48px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold' as const,
    marginBottom: '24px',
    textAlign: 'center' as const,
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '600' as const,
    marginBottom: '16px',
    color: '#555',
  },
  infoSection: {
    marginBottom: '24px',
  },
  info: {
    backgroundColor: '#f5f5f5',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1.8',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '4px solid #667eea',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#dc3545',
    color: 'white',
    fontWeight: '600' as const,
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '16px',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    color: '#155724',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center' as const,
  },
};
