import styles from "./inicio.module.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import img1 from '../../assets/img/torta-chocolate.jpg';
import img2 from "../../assets/img/torta-frutas.jpg";
import img3 from "../../assets/img/torta-vainilla.jpg";
import img4 from "../../assets/img/torta-manjar.webp";
import img5 from "../../assets/img/mousse-chocolate.jpg";
import img6 from "../../assets/img/tiramisu.jpg";
import img7 from "../../assets/img/torta-naranja.jpg";
import img8 from "../../assets/img/cheesecake.avif";
import img9 from "../../assets/img/empanada-manzana.jpg";
import img10 from "../../assets/img/tarta-santiago.jpg";
import img11 from "../../assets/img/brownie.jpg";
import img12 from  "../../assets/img/pan.jpg";
import img13 from "../../assets/img/tortav-chocolate.jpg";
import img14 from "../../assets/img/galletav-avena.jpg";
import img15 from "../../assets/img/torta-cumpleanios.jpg";
import img16 from "../../assets/img/torta-boda.jpg";

const PRODUCTOS_INICIALES = [
  {
    id: 1,
    codigo: "TC001",
    nombre: "Torta Cuadrada de Chocolate",
    descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
    precio: 45000,
    stock: 50,
    stockCritico: 10,
    categoria: "Tortas Cuadradas",
    imagen: img1
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
    imagen: img2
  },
  {
    id: 3,
    codigo: "TT001",
    nombre: "Torta Circular de Vainilla",
    descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
    precio: 40000,
    stock: 20,
    stockCritico: 10,
    categoria: "Tortas Circulares",
    imagen: img3
  },
  {
    id: 4,
    codigo: "TT002",
    nombre: "Torta Circular de Manjar",
    descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
    precio: 42000,
    stock: 8,
    stockCritico: 10,
    categoria: "Tortas Circulares",
    imagen: img4
  },
  {
    id: 5,
    codigo: "PI001",
    nombre: "Mousse de Chocolate",
    descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
    precio: 5000,
    stock: 20,
    stockCritico: 30,
    categoria: "Postres Individuales",
    imagen: img5
  },
  {
    id: 6,
    codigo: "PI002",
    nombre: "Tiramisú Clásico",
    descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
    precio: 5500,
    stock: 20,
    stockCritico: 10,
    categoria: "Postres Individuales",
    imagen: img6
  },
  {
    id: 7,
    codigo: "PSA001",
    nombre: "Torta Sin Azucar de Naranja",
    descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
    precio: 48000,
    stock: 32,
    stockCritico: 3,
    categoria: "Productos Sin Azúcar",
    imagen: img7
  },
  {
    id: 8,
    codigo: "PSA002",
    nombre: "Cheesecake sin Azúcar",
    descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
    precio: 47000,
    stock: 17,
    stockCritico: 3,
    categoria: "Productos Sin Azúcar",
    imagen: img8
  },
  {
    id: 9,
    codigo: "PT001",
    nombre: "Empanada de Manzana",
    descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
    precio: 3000,
    stock: 13,
    stockCritico: 3,
    categoria: "Pasteleria Tradicional",
    imagen: img9
  },
  {
    id: 10,
    codigo: "PT002",
    nombre: "Tarta de Santiago",
    descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
    precio: 6000,
    stock: 15,
    stockCritico: 3,
    categoria: "Pasteleria Tradicional",
    imagen: img10
  },
  {
    id: 11,
    codigo: "PG001",
    nombre: "Brownie Sin Glúten",
    descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
    precio: 4000,
    stock: 40,
    stockCritico: 3,
    categoria: "Productos Sin Glúten",
    imagen: img11
  },
  {
    id: 12,
    codigo: "PG002",
    nombre: "Pan Sin Glúten",
    descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
    precio: 3500,
    stock: 40,
    stockCritico: 3,
    categoria: "Productos Sin Glúten",
    imagen: img12
  },
  {
    id: 13,
    codigo: "PV001",
    nombre: "Torta Vegana de Chocolate",
    descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
    precio: 50000,
    stock: 7,
    stockCritico: 3,
    categoria: "Productos Vegano",
    imagen: img13
  },
  {
    id: 14,
    codigo: "PV002",
    nombre: "Galletas Veganas de Avena",
    descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
    precio: 4500,
    stock: 32,
    stockCritico: 3,
    categoria: "Productos Vegano",
    imagen: img14
  },
  {
    id: 15,
    codigo: "TE001",
    nombre: "Torta Especial de Cumpleaños",
    descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
    precio: 55000,
    stock: 8,
    stockCritico: 3,
    categoria: "Tortas Especiales",
    imagen: img15
  },
  {
    id: 16,
    codigo: "TE002",
    nombre: "Torta Especial de Boda",
    descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
    precio: 60000,
    stock: 2,
    stockCritico: 3,
    categoria: "Tortas Especiales",
    imagen: img16
  }
];

const CATEGORIAS = [
  { label: "Todos", value: "Todos" },
  { label: "Tortas Cuadradas", value: "Tortas Cuadradas" },
  { label: "Tortas Circulares", value: "Tortas Circulares" },
  { label: "Postres Individuales", value: "Postres Individuales" },
  { label: "Sin Azúcar", value: "Productos Sin Azúcar" },
  { label: "Tradicional", value: "Pasteleria Tradicional" },
  { label: "Sin Glúten", value: "Productos Sin Glúten" },
  { label: "Veganos", value: "Productos Vegano" },
  { label: "Especiales", value: "Tortas Especiales" }
];

export default function Inicio() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [usuario, setUsuario] = useState(null);


  useEffect(() => {
    const storedProductos = localStorage.getItem('productos');
    if (storedProductos) {
      setProductos(JSON.parse(storedProductos));
    } else {
      localStorage.setItem('productos', JSON.stringify(PRODUCTOS_INICIALES));
      setProductos(PRODUCTOS_INICIALES);
    }

    const storedUsuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (storedUsuario) {
      setUsuario(storedUsuario);
    }
  }, []);

  const productosFiltrados = categoriaSeleccionada === "Todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  const verDetalle = (id) => {
    navigate(`/detalle-producto/${id}`);
  };

  const agregarAlCarrito = (producto) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`✅ ${producto.nombre} añadido al carrito`);
  };

  return (
    <>
      <Header usuario={usuario} />

      <main className={styles.main}>
        <div style={{ textAlign: 'center', marginBottom: '30px', width: '100%' }}>
          <h2 style={{ fontFamily: "'Pacifico', cursive", color: '#8B4513', fontSize: '36px' }}>
            Nuestros Productos
          </h2>
          <p style={{ color: '#5D4037', fontFamily: "'Lato', sans-serif" }}>
            Descubre los sabores más dulces de nuestra pastelería
          </p>
        </div>

        <div className={styles['btns-filtros']} id="filtro-categorias">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.value}
              className={`${styles['btn-filtro']} ${categoriaSeleccionada === cat.value ? 'active' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <section className={styles['recursos-multimedia']}>
          {productosFiltrados.map((producto) => {
            const esStockCritico = producto.stock <= producto.stockCritico;
            return (
              <div 
                key={producto.id} 
                className={`${styles.producto} ${esStockCritico ? styles['stock-critico'] : ''}`}
              >
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/280x200?text=Sin+Imagen';
                  }}
                />
                <h3>{producto.nombre}</h3>
                <small>${producto.precio.toLocaleString('es-CL')}</small>
                <p style={{ fontSize: '14px', color: '#5D4037', margin: '5px 0' }}>
                  📦 Stock: {producto.stock} unidades
                </p>
                <div className={styles['contenedor-btn']}>
                  <button className={styles.btnVer} onClick={() => verDetalle(producto.id)}>
                    Ver
                  </button>
                  <button className={styles.btnComprar} onClick={() => agregarAlCarrito(producto)}>
                    Comprar
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <Footer/>
    </>
  );
}