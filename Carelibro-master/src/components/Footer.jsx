import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="w3-container w3-theme-d3 w3-padding-16">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: '#fff' }}
          title="CareLibro - Ir al inicio"
          aria-label="Ir al inicio"
        >
          <h5 style={{ margin: 0, fontWeight: 700 }}>CareLibro</h5>
        </Link>
      </footer>

      <footer className="w3-container w3-theme-d5" style={{ padding: '20px 16px', textAlign: 'center' }}>
      
        <p style={{ margin: 0, fontSize: '11.5px', opacity: 0.75 }}>
          © {new Date().getFullYear()} CareLibro · Red Social en React
        </p>
      </footer>
    </>
  );
}
