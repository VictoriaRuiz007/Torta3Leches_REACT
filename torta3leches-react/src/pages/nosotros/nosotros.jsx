import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import styles from './nosotros.module.css';

export default function Nosotros() {
  return (
    <>
      <Header />
      <main className={styles['nosotros-main']}>
        <div className={styles['nosotros-container']}>
          <h2 className={styles['nosotros-titulo']}>Sobre Nosotros</h2>
          <p className={styles['nosotros-subtitulo']}>
            Conoce al equipo detrás de Pastelería 1000 Sabores
          </p>

          <div className={styles['mision-vision']}>
            <div className={styles['card-mv']}>
              <h4>🎯 Nuestra Misión</h4>
              <p>
                Ofrecer productos de pastelería de la más alta calidad, combinando recetas tradicionales con un toque moderno, brindando una experiencia de compra fácil y agradable a través de nuestra plataforma digital.
              </p>
              <p>
                Nuestros productos son de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la pasión por la repostería.
              </p>
            </div>

            <div className={styles['card-mv']}>
              <h4>👁️ Nuestra Visión</h4>
              <p>
                Ser la pastelería digital de referencia, reconocida por la excelencia de nuestros productos, la innovación en nuestro servicio y el compromiso con la satisfacción de nuestros clientes.
              </p>
              <p>Formamos nuevos talentos en la gastronomía.</p>
            </div>
          </div>

          <div className={styles['equipo-container']}>
            <div className={styles.miembro}>
              <h3>Agatha</h3>
              <p>
                Desarrolladora y Fundadora de PokéComelones. Apasionada por la repostería y la tecnología, hace que sus pasteles sean únicos, no hace que nadie se sienta indiferente después de probarlos.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}