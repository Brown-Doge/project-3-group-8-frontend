import React from 'react';

function LoginPage() {
  const handleGoogleLogin = () => {
    const backendUrl = process.env.REACT_APP_API_URL || '';
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Sign In to Get Your Tickets</h2>
        <p style={styles.subheading}>
          Buy tickets to exciting events and see which games your friends are attending.
        </p>
        <button style={styles.button} onClick={handleGoogleLogin}>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google Logo"
            style={styles.icon}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5',
  },
  box: {
    background: '#fff', borderRadius: 8, padding: '2.5rem 3.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center',
  },
  heading: {
    fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.8rem',
  },
  subheading: {
    color: '#666', marginBottom: '2rem', fontSize: '1rem',
  },
  button: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    background: '#4285F4', color: 'white', border: 'none',
    borderRadius: 4, padding: '0.8rem 2rem', fontSize: 18,
    cursor: 'pointer', fontWeight: 600, boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
  icon: {
    width: 28, height: 28, background: 'white', borderRadius: '50%',
  },
};

export default LoginPage;
