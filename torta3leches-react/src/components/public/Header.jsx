import React from 'react'

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

export default function Header() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage al montar el componente
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
  }, []);

  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuario(null);
    navigate('/iniciar-sesion');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={logo}
            alt="Logo PokéComelones"
            className="img-fluid"
          />
        </Link>
      </div>

      <div className="header-spacer"></div>

      <nav className="nav">
        <Link to="/" className="btn">Inicio</Link>

        {usuario ? (
          <>
            <span
              className="usuario-saludo"
              style={{ color: '#FFF5E1', fontWeight: 600, marginRight: '10px' }}
            >
              👋 Hola, {usuario.nombre || 'Usuario'}
            </span>

            {usuario.rol === 'administrador' && (
              <Link to="/admin" className="btn" id="btnAdmin">
                🔧 Admin
              </Link>
            )}

            <button
              onClick={handleCerrarSesion}
              className="btn"
              style={{ cursor: 'pointer', border: 'none' }}
            >
              🚪 Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/iniciar-sesion" className="btn" id="btnLogin">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn" id="btnRegistro">
              Registro
            </Link>
          </>
        )}

        <Link to="/blogs" className="btn" id="btnBlogs">
          Blogs
        </Link>
        <Link to="/carrito" className="btn">
          🛒 Carrito
        </Link>
      </nav>
    </header>
  );
}