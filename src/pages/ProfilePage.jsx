// src/pages/ProfilePage.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function ProfilePage({ session }) {
  const user = session.user;

  const [fullName, setFullName] = useState(
    user.user_metadata?.full_name || ''
  );
  const [infoMsg, setInfoMsg] = useState('');
  const [infoErr, setInfoErr] = useState('');

  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');

  const [avatarUrl, setAvatarUrl] = useState(
    user.user_metadata?.avatar_url || ''
  );
  const [uploading, setUploading] = useState(false);

  async function handleSaveInfo(e) {
    e.preventDefault();
    setInfoErr('');
    setInfoMsg('');

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (error) {
      setInfoErr(error.message);
    } else {
      setInfoMsg('✅ Profil mis à jour !');
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPassErr('');
    setPassMsg('');

    const { error } = await supabase.auth.updateUser({
      password: newPass,
    });

    if (error) {
      setPassErr(error.message);
    } else {
      setPassMsg('✅ Mot de passe mis à jour !');
      setNewPass('');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <Navbar session={session} />

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ marginBottom: '2rem', color: '#1E293B' }}>Mon profil</h1>

        <section
          style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Informations générales</h2>

          <form onSubmit={handleSaveInfo}>
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#F1F5F9',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}
              >
                Nom complet
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Votre nom complet"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                }}
              />
            </div>

            {infoErr && <p style={{ color: '#DC2626' }}>{infoErr}</p>}
            {infoMsg && <p style={{ color: '#16A34A' }}>{infoMsg}</p>}

            <button
              type="submit"
              style={{
                marginTop: '1rem',
                background: '#1A8C82',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Enregistrer
            </button>
          </form>
        </section>

        <section
          style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Mot de passe</h2>

          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}
              >
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Nouveau mot de passe"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                }}
              />
            </div>

            {passErr && <p style={{ color: '#DC2626' }}>{passErr}</p>}
            {passMsg && <p style={{ color: '#16A34A' }}>{passMsg}</p>}

            <button
              type="submit"
              style={{
                marginTop: '1rem',
                background: '#1A8C82',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Changer le mot de passe
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}