import React from 'react';

function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Discover Events & Buy Tickets</h1>
      <p style={styles.description}>
        Browse upcoming games and events. See which events your friends are going to and never miss out on the fun!
      </p>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3>Buy Tickets Easily</h3>
          <p>Secure your seat with a few clicks and manage your orders smoothly.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>Friends & Social</h3>
          <p>Know what events your friends plan to attend and join them for a great time.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'Arial, sans-serif', textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem',
  },
  description: {
    fontSize: '1.25rem', color: '#555', marginBottom: '3rem',
  },
  features: {
    display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap',
  },
  featureCard: {
    flex: '1 1 300px', background: '#fafafa', borderRadius: 8,
    padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
};

export default HomePage;
