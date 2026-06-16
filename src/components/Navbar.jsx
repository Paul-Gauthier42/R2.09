// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Navbar({ session }) {
  const location = useLocation(); // URL courante, ex: '/dashboard'

  async function handleLogout() {
    await supabase.auth.signOut();
    // App.jsx détecte session = null puis redirige vers /login
  }

  function linkStyle(path) {
    const isActive = location.pathname === path;

    return {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: isActive ? 700 : 400,
      background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      color: 'white',
    };
  }

  return (
    <nav
      style={{
        background: '#1A8C82',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/dashboard" style={linkStyle('/dashboard')}>
          Dashboard
        </Link>

        <Link to="/profile" style={linkStyle('/profile')}>
          Profil
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: 'white', fontSize: '0.9rem' }}>
          {session?.user?.email}
        </span>

        <button
          onClick={handleLogout}
          style={{
            padding: '0.45rem 0.9rem',
            borderRadius: '6px',
            border: 'none',
            background: 'white',
            color: '#1A8C82',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}