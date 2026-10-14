import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';
import styles from '../../styles/adminGlobal.module.css';

const DEFAULT_PRODUCTOS = [
    {
        id: 1,
        codigo: "TC001",
        nombre: "Torta Cuadrada de Chocolate",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        precio: 45000,
        stock: 50,
        stockCritico: 10,
        categoria: "Tortas Cuadradas",
        imagen: "../../assets/img/torta-chocolate.jpg"
    },
    {
        id: 2,
        codigo: "TC002",
        nombre: "Torta Cuadrada de Frutas",
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
        precio: 50000,
        stock: 5,
        stockCritico: 10,
        categoria: "Tortas Cuadradas",
        imagen: "../../assets/img/torta-frutas.jpg"
    }
];

export default function Admin() {
    const navigate = useNavigate();

    const [adminUser, setAdminUser] = useState({
        nombre: 'Administrador',
        correo: 'admin@duoc.cl'
    });

    const [stats, setStats] = useState({
        totalProductos: 0,
        totalUsuarios: 0,
        totalPedidos: 0
    });

    useEffect(() => {
        // 1. Verificar acceso de administrador
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

        if (!usuarioLogueado || usuarioLogueado.rol !== 'administrador') {
            alert('Acceso restringido. Debes iniciar sesión como administrador.');
            navigate('/iniciar-sesion');
            return;
        }

        setAdminUser({
            nombre: usuarioLogueado.nombre || 'Administrador',
            correo: usuarioLogueado.correo || 'admin@duoc.cl'
        });

        // 2. Cargar o inicializar Productos
        let productosGuardados = JSON.parse(localStorage.getItem('productos'));
        if (!productosGuardados || productosGuardados.length === 0) {
            productosGuardados = DEFAULT_PRODUCTOS;
            localStorage.setItem('productos', JSON.stringify(DEFAULT_PRODUCTOS));
        }

        // 3. Cargar Usuarios
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

        // 4. Cargar Pedidos (si existen)
        const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];

        // 5. Actualizar estadísticas
        setStats({
            totalProductos: productosGuardados.length,
            totalUsuarios: usuariosGuardados.length,
            totalPedidos: pedidosGuardados.length
        });
    }, [navigate]);

    return (
        <>
            <AdminHeader/>
                <main className={styles['admin-main']}>
                    <header className={styles['admin-header']}>
                        <h1>
                            Bienvenido, <span>{adminUser.nombre}</span>
                        </h1>
                        <div className={styles['admin-user']}>
                            <span>{adminUser.correo}</span>
                        </div>
                    </header>

                    <section className={styles['admin-dashboard']}>
                        <div className={styles['dashboard-cards']}>
                            <div className={styles['card-stat']}>
                                <h3>📦 Productos</h3>
                                <p>{stats.totalProductos}</p>
                            </div>

                            <div className={styles['card-stat']}>
                                <h3>👤 Usuarios</h3>
                                <p>{stats.totalUsuarios}</p>
                            </div>

                            <div className={styles['card-stat']}>
                                <h3>🛒 Pedidos</h3>
                                <p>{stats.totalPedidos}</p>
                            </div>
                        </div>

                        <div className={styles['dashboard-welcome']}>
                            <h2>Panel de Control</h2>
                            <p>Desde aquí puedes gestionar los productos y usuarios de la pastelería.</p>
                            <p>Usa el menú lateral para navegar.</p>
                        </div>
                    </section>
                </main>
            <AdminFooter/>
        </>
    );
}
