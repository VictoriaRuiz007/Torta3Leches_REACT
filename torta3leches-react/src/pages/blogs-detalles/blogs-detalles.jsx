import React from 'react'

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import styles from './bdetalles.module.css';

// Datos de respaldo por si aún no existen en localStorage
const BLOGS_DEFAULT = [
  {
    id: 1,
    titulo: "La historia de la torta más grande del mundo",
    descripcionLarga: "En 1995, Pastelería 1000 Sabores se unió a un equipo de reposteros para crear la torta más grande del mundo, con más de 10 toneladas de ingredientes. Fue un desafío monumental que requirió semanas de planificación y trabajo en equipo. La torta, que medía más de 100 metros de largo, fue compartida con miles de personas en una celebración comunitaria. Este evento no solo nos dio un récord Guinness, sino que también consolidó nuestra pasión por la repostería y el trabajo colaborativo. Hoy, seguimos honrando ese espíritu en cada producto que creamos.",
    imagen: "/imagenes/torta-gigante.jpg"
  },
  {
    id: 2,
    titulo: "Consejos para decorar tortas como un profesional",
    descripcionLarga: "Decorar tortas puede parecer complicado, pero con algunos trucos puedes lograr resultados profesionales. Primero, asegúrate de que la torta esté fría antes de aplicar el frosting. Usa una espátula offset para alisar la crema y obtén bordes limpios. Para hacer diseños con manga pastelera, elige boquillas adecuadas y practica la presión. También puedes usar frutas frescas, flores comestibles o chocolate derretido para dar un toque especial. Recuerda que la práctica hace al maestro, así que no temas experimentar. En nuestros talleres, enseñamos estas técnicas a estudiantes de gastronomía, y ahora te las compartimos a ti.",
    imagen: "/imagenes/decoracion-tortas.jpg"
  }
];

export default function BlogDetalle() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const blogsGuardados = JSON.parse(localStorage.getItem('blogs')) || BLOGS_DEFAULT;
    const idNum = parseInt(id, 10);
    const encontrado = blogsGuardados.find((b) => b.id === idNum);

    setBlog(encontrado || null);
    setCargando(false);
  }, [id]);

  if (cargando) {
    return (
      <>
        <Header />
        <main className={styles['blog-detalle-main']}>
          <p>Cargando entrada...</p>
        </main>
        <Footer />
      </>
    );
  }

  // Si no se encuentra el artículo del blog
  if (!blog) {
    return (
      <>
        <Header />
        <main className={styles['blog-detalle-main']}>
          <div className={styles['blog-detalle-container']} style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ color: '#8B4513' }}>Blog no encontrado</h2>
            <Link to="/blogs" className={styles['btn-volver']} style={{ display: 'inline-block', marginTop: '15px' }}>
              ← Volver al blog
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

      <main className={styles['blog-detalle-main']}>
        <div className={styles['blog-detalle-container']}>
          <div className={styles['blog-detalle-imagen']}>
            <img
              src={blog.imagen}
              alt={blog.titulo}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Sin+Imagen';
              }}
            />
          </div>

          <div className={styles['blog-detalle-contenido']}>
            <h1 className={styles['blog-detalle-titulo']}>{blog.titulo}</h1>
            
            <p className={styles['blog-detalle-descripcion']}>
              {blog.descripcionLarga}
            </p>

            <Link to="/blogs" className={styles['btn-volver']}>
              ← Volver al blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}