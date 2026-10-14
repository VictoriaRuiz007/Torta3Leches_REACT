import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';
import styles from "../../styles/adminGlobal.module.css";

const PRODUCTOS_DEFAULT = [
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

export default function AdminProductos() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [productos, setProductos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stockCritico: '',
    categoria: '',
    imagen: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado || usuarioLogueado.rol !== 'administrador') {
      alert('Acceso restringido. Debes iniciar sesión como administrador.');
      navigate('/iniciar-sesion');
      return;
    }

    const guardados = JSON.parse(localStorage.getItem('productos'));
    if (guardados && guardados.length > 0) {
      setProductos(guardados);
    } else {
      setProductos(PRODUCTOS_DEFAULT);
      localStorage.setItem('productos', JSON.stringify(PRODUCTOS_DEFAULT));
    }
  }, [navigate]);

  const guardarEnLocalStorage = (nuevosProductos) => {
    setProductos(nuevosProductos);
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
  };

  const validarCampo = (name, value, currentFormData = formData) => {
    let error = '';
    const val = value.toString().trim();

    switch (name) {
      case 'codigo':
        if (!val) error = 'El código es obligatorio';
        else if (val.length < 3) error = 'Mínimo 3 caracteres';
        else {
          const duplicado = productos.find(
            (p) => p.codigo.toLowerCase() === val.toLowerCase() && p.id !== editandoId
          );
          if (duplicado) error = 'Código ya existe';
        }
        break;

      case 'nombre':
        if (!val) error = 'El nombre es obligatorio';
        else if (val.length > 100) error = 'Máximo 100 caracteres';
        break;

      case 'descripcion':
        if (val.length > 500) error = 'Máximo 500 caracteres';
        break;

      case 'precio':
        if (val === '' || isNaN(val) || Number(val) < 0) {
          error = 'Debe ser número >= 0';
        }
        break;

      case 'stock':
        if (val === '' || isNaN(val) || Number(val) < 0 || !Number.isInteger(Number(val))) {
          error = 'Debe ser entero >= 0';
        }
        break;

      case 'stockCritico':
        if (val !== '' && (isNaN(val) || Number(val) < 0 || !Number.isInteger(Number(val)))) {
          error = 'Debe ser entero >= 0';
        }
        break;

      case 'categoria':
        if (!val) error = 'Selecciona una categoría';
        break;

      case 'imagen':
        if (val.length > 500) error = 'Máximo 500 caracteres';
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newFormData = { ...formData, [id]: value };
    setFormData(newFormData);

    const fieldError = validarCampo(id, value, newFormData);
    setErrors((prev) => ({ ...prev, [id]: fieldError }));
  };

  const isFormValid = () => {
    const camposObligatorios = ['codigo', 'nombre', 'precio', 'stock', 'categoria'];
    for (const campo of camposObligatorios) {
      if (!formData[campo] || validarCampo(campo, formData[campo]) !== '') {
        return false;
      }
    }
    return !Object.values(errors).some((err) => err !== '');
  };

  const handleNuevoProducto = () => {
    setEditandoId(null);
    setFormData({
      codigo: '',
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      stockCritico: '',
      categoria: '',
      imagen: ''
    });
    setErrors({});
    setMostrarForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleEditar = (producto) => {
    setEditandoId(producto.id);
    setFormData({
      codigo: producto.codigo || '',
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio: producto.precio ?? '',
      stock: producto.stock ?? '',
      stockCritico: producto.stockCritico ?? '',
      categoria: producto.categoria || '',
      imagen: producto.imagen || ''
    });
    setErrors({});
    setMostrarForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setErrors({});
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      const nuevos = productos.filter((p) => p.id !== id);
      guardarEnLocalStorage(nuevos);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const nuevoProducto = {
      id: editandoId || (productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1),
      codigo: formData.codigo.trim(),
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock, 10),
      stockCritico: formData.stockCritico !== '' ? parseInt(formData.stockCritico, 10) : null,
      categoria: formData.categoria,
      imagen: formData.imagen.trim() || '/imagenes/default.jpg'
    };

    let listaActualizada = [];
    if (editandoId) {
      listaActualizada = productos.map((p) => (p.id === editandoId ? nuevoProducto : p));
    } else {
      listaActualizada = [...productos, nuevoProducto];
    }

    guardarEnLocalStorage(listaActualizada);
    handleCancelar();
    alert('Producto guardado exitosamente.');
  };

  return (
    <div className={styles['admin-wrapper']}>
      <AdminHeader />

      <main className={styles['admin-main']}>
        <header className={styles['admin-header']}>
          <h1>Gestión de Productos</h1>
          <button
            className={styles['btn-submit']}
            id="btnNuevoProducto"
            style={{ width: 'auto', padding: '8px 25px' }}
            onClick={handleNuevoProducto}
          >
            + Nuevo Producto
          </button>
        </header>

        
        <div className={styles['admin-table-container']}>
          <table className={styles['admin-table']}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.codigo}</td>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio ? prod.precio.toLocaleString('es-CL') : 0}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.categoria}</td>
                    <td>
                      <button
                        className={`${styles['btn-accion']} ${styles['btn-editar']}`}
                        onClick={() => handleEditar(prod)}
                        style={{ marginRight: '8px' }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className={`${styles['btn-accion']} ${styles['btn-eliminar']}`}
                        onClick={() => handleEliminar(prod.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

   
        {mostrarForm && (
          <div id="formProductoContainer" ref={formRef}>
            <h3 style={{ fontFamily: "'Pacifico', cursive", color: '#8B4513', fontSize: '24px', marginBottom: '15px' }}>
              {editandoId ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <form className={styles['admin-form']} noValidate onSubmit={handleSubmit}>
              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label htmlFor="codigo">Código:</label>
                  <input
                    type="text"
                    id="codigo"
                    required
                    minLength="3"
                    value={formData.codigo}
                    onChange={handleChange}
                  />
                  <small className={styles['error-msg']}>{errors.codigo}</small>
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    maxLength="100"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <small className={styles['error-msg']}>{errors.nombre}</small>
                </div>
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  maxLength="500"
                  rows="3"
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
                <small className={styles['error-msg']}>{errors.descripcion}</small>
              </div>

              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label htmlFor="precio">Precio (CLP):</label>
                  <input
                    type="number"
                    id="precio"
                    step="0.01"
                    min="0"
                    required
                    value={formData.precio}
                    onChange={handleChange}
                  />
                  <small className={styles['error-msg']}>{errors.precio}</small>
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="stock">Stock:</label>
                  <input
                    type="number"
                    id="stock"
                    min="0"
                    step="1"
                    required
                    value={formData.stock}
                    onChange={handleChange}
                  />
                  <small className={styles['error-msg']}>{errors.stock}</small>
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="stockCritico">Stock Crítico:</label>
                  <input
                    type="number"
                    id="stockCritico"
                    min="0"
                    step="1"
                    value={formData.stockCritico}
                    onChange={handleChange}
                  />
                  <small className={styles['error-msg']}>{errors.stockCritico}</small>
                </div>
              </div>

              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label htmlFor="categoria">Categoría:</label>
                  <select
                    id="categoria"
                    required
                    value={formData.categoria}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Tortas Cuadradas">Tortas Cuadradas</option>
                    <option value="Tortas Circulares">Tortas Circulares</option>
                    <option value="Postres Individuales">Postres Individuales</option>
                    <option value="Productos Sin Azúcar">Productos Sin Azúcar</option>
                    <option value="Pastelería Tradicional">Pastelería Tradicional</option>
                    <option value="Productos Sin Gluten">Productos Sin Gluten</option>
                    <option value="Productos Vegana">Productos Vegana</option>
                    <option value="Tortas Especiales">Tortas Especiales</option>
                  </select>
                  <small className={styles['error-msg']}>{errors.categoria}</small>
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="imagen">URL Imagen:</label>
                  <input
                    type="text"
                    id="imagen"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={formData.imagen}
                    onChange={handleChange}
                  />
                  <small className={styles['error-msg']}>{errors.imagen}</small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  className={styles['btn-submit']}
                  disabled={!isFormValid()}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className={styles['btn-submit']}
                  style={{ backgroundColor: '#B0BEC5' }}
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <AdminFooter/>
    </div>
  );
}