import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    if (window.confirm("¿Deseas cerrar sesión?")) {
      localStorage.removeItem("usuarioLogueado");
      navigate("/iniciar-sesion");
    }
  };

  return (
    <aside className={styles['admin-sidebar']}>
      <div className={styles['sidebar-brand']}>
        <img 
          src="/imagenes/Poké Comelones (1) (1).png" 
          alt="Logo PokéComelones" 
          style={{ height: '50px' }} 
        />
        <h3>Panel Admin</h3>
      </div>
      
      <nav className={styles['sidebar-nav']}>
        <NavLink 
          to="/admin" 
          end
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <span className={styles.icon}>📊</span> Inicio
        </NavLink>

        <NavLink 
          to="/admin/productos" 
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <span className={styles.icon}>🍰</span> Productos
        </NavLink>

        <NavLink 
          to="/admin/usuarios" 
          id="linkUsuarios"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <span className={styles.icon}>👥</span> Usuarios
        </NavLink>

        <a 
          href="#logout" 
          id="btnLogout" 
          onClick={handleCerrarSesion}
          className={styles.link}
        >
          <span className={styles.icon}>🚪</span> Cerrar Sesión
        </a>
      </nav>
    </aside>
  );
}