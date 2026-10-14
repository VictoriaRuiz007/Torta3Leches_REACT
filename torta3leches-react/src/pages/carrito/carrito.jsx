import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import styles from './carrito.module.css';

export default function Carrito() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const cambiarCantidad = (index, delta) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += delta;

    if (nuevoCarrito[index].cantidad <= 0) {
      nuevoCarrito.splice(index, 1);
    }

    guardarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    guardarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      guardarCarrito([]);
    }
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío. ¡Agrega productos primero!');
      return;
    }
    alert('¡Gracias por tu compra! 🍰\nTu pedido ha sido procesado.');
    guardarCarrito([]);
    navigate('/');
  };

  const totalGeneral = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <>
      <Header />

      <main className={styles.carritoMain}>
        <h2 className={styles.carritoTitulo}>Tu Carrito de Compras 🛒</h2>

        <div className={styles.carritoContainer}>
          <div className={styles.tablaWrapper}>
            <table className={styles.tablaCarrito}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.length === 0 ? (
                  <tr>
                    <td colSpan="5" className={styles.carritoVacio}>
                      Tu carrito está vacío 🍰
                    </td>
                  </tr>
                ) : (
                  carrito.map((item, index) => {
                    const subtotal = item.precio * item.cantidad;
                    return (
                      <tr key={item.id || index}>
                        <td className={styles.nombreProducto}>{item.nombre}</td>
                        <td>${item.precio ? item.precio.toLocaleString('es-CL') : 0}</td>
                        <td>
                          <button
                            onClick={() => cambiarCantidad(index, -1)}
                            className={styles.btnCantidad}
                            style={{ marginRight: '8px' }}
                          >
                            -
                          </button>
                          {item.cantidad}
                          <button
                            onClick={() => cambiarCantidad(index, 1)}
                            className={styles.btnCantidad}
                            style={{ marginLeft: '8px' }}
                          >
                            +
                          </button>
                        </td>
                        <td className={styles.subtotalProducto}>
                          ${subtotal.toLocaleString('es-CL')}
                        </td>
                        <td>
                          <button
                            onClick={() => eliminarProducto(index)}
                            className={styles.btnEliminar}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.resumenContainer}>
            <h3 className={styles.totalTexto}>
              Total: <span>${totalGeneral.toLocaleString('es-CL')}</span>
            </h3>
            <div className={styles.accionesBox}>
              <button
                className={`${styles.btnAccion} ${styles.btnVaciar}`}
                onClick={vaciarCarrito}
              >
                🗑️ Vaciar Carrito
              </button>
              <button
                className={`${styles.btnAccion} ${styles.btnComprar}`}
                onClick={finalizarCompra}
              >
                💳 Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}