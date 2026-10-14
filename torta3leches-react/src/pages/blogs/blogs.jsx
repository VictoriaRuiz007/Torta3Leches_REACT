import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import styles from './blogs.module.css';

const BLOGS_DATA = [
  {
    id: 1,
    titulo: "La historia de la torta más grande del mundo",
    descripcionCorta: "En 1995, Pastelería 1000 Sabores colaboró en la creación de la torta más grande del mundo, un récord Guinness que marcó nuestra historia.",
    imagen: "/imagenes/torta-gigante.jpg"
  },
  {
    id: 2,
    titulo: "Consejos para decorar tortas como un profesional",
    descripcionCorta: "Aprende técnicas sencillas para decorar tus tortas y sorprender a todos con presentaciones dignas de pastelería.",
    imagen: "/imagenes/decoracion-tortas.jpg"
  }
];

export default function Blogs() {
  return (
    <>
      <Header />

      <main className={styles['blogs-main']}>
        <div className={styles['blogs-container']}>
          <h2 className={styles['blogs-titulo']}>Nuestro Blog</h2>
          <p className={styles['blogs-subtitulo']}>
            Noticias, recetas y consejos de repostería
          </p>

          <section id={styles['lista-blogs']}>
            {BLOGS_DATA.map((blog) => (
              <article key={blog.id} className={styles['blog-card']}>
                <img
                  src={blog.imagen}
                  alt={blog.titulo}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/350x200?text=Sin+Imagen';
                  }}
                />
                <h3>{blog.titulo}</h3>
                <p>{blog.descripcionCorta}</p>
                <Link
                  to={`/blog-detalle/${blog.id}`}
                  className={styles['btn-ver-blog']}
                >
                  Leer más
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}