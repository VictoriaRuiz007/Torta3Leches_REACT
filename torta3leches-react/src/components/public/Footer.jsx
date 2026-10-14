import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        <p className="footer-text">
          &copy; Sitio web de Agatha. Todos los derechos reservados 2026
        </p>
        <nav className="footer-btn">
          <Link to="/contacto">Contacto</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/blogs">Blogs</Link>
        </nav>
      </div>
    </footer>
  );
}