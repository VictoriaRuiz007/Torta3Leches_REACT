import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import styles from './detalle.module.css';

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [agregadoText, setAgregadoText] = useState("Añadir al Carrito");
  const [btnColor, setBtnColor] = useState("#a71c1c");

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const idNum = parseInt(id, 10);
    const encontrado = productosGuardados.find((p) => p.id === idNum);

    setProducto(encontrado || null);
    setCargando(false);
  }, [id]);

  const agregarAlCarrito = () => {
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Feedback visual en el botón
    setAgregadoText("✅ ¡Añadido!");
    setBtnColor("#4CAF50");

    setTimeout(() => {
      setAgregadoText("Añadir al Carrito");
      setBtnColor("#a71c1c");
    }, 2000);
  };

  if (cargando) {
    return (
      <>
        <Header />
        <main className={styles['detalle-main']}>
          <p>Cargando producto...</p>
        </main>
        <Footer />
      </>
    );
  }

  // Si no se encuentra el producto
  if (!producto) {
    return (
      <>
        <Header />
        <main className={styles['detalle-main']}>
          <div className={styles['detalle-container']} style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ color: '#8B4513' }}>Producto no encontrado</h2>
            <Link to="/" className={styles['btn-volver']} style={{ marginTop: '15px' }}>
              ← Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles['detalle-main']}>
        <div className={styles['detalle-container']}>
          <div className={styles['detalle-imagen-box']}>
            <img
              id="detalle-imagen"
              src={producto.imagen}
              alt={producto.nombre}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/280x200?text=Sin+Imagen';
              }}
            />
          </div>

          <div className={styles['detalle-info-box']}>
            <span id="detalle-categoria" className={styles['badge-categoria']}>
              {producto.categoria}
            </span>

            <h1 id="detalle-nombre" className={styles['detalle-titulo']}>
              {producto.nombre}
            </h1>

            <p id="detalle-precio" className={styles['detalle-precio']}>
              ${producto.precio ? producto.precio.toLocaleString('es-CL') : 0}
            </p>

            <p id="detalle-descripcion" className={styles['detalle-desc']}>
              {producto.descripcion}
            </p>

            <div className={styles['detalle-stock-info']}>
              <span>
                Stock disponible: <strong id="detalle-stock">{producto.stock}</strong> unidades
              </span>
            </div>

            <button
              id="btn-agregar-carrito"
              className={styles['btn-comprar-grande']}
              onClick={agregarAlCarrito}
              style={{ backgroundColor: btnColor, transition: 'background-color 0.3s ease' }}
            >
              {agregadoText}
            </button>

            <Link to="/" className={styles['btn-volver']}>
              ← Volver a la tienda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}