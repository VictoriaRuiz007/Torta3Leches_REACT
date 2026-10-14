import React from 'react'
import { useState } from 'react';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import styles from './contacto.module.css';

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    comentario: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    comentario: ''
  });

  // Funciones de validación
  const validarNombre = (valor) => {
    const nombre = valor.trim();
    if (nombre === "") return "El nombre es obligatorio";
    if (nombre.length > 100) return "El nombre no puede superar los 100 caracteres";
    return "";
  };

  const validarEmail = (valor) => {
    const email = valor.trim().toLowerCase();
    if (email === "") return "El correo es obligatorio";
    if (email.length > 100) return "El correo no puede superar los 100 caracteres";
    if (!email.includes("@")) return "El correo debe contener @";

    const dominioValido = DOMINIOS_PERMITIDOS.some((d) => email.endsWith(d));
    if (!dominioValido) {
      return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    }
    return "";
  };

  const validarComentario = (valor) => {
    const comentario = valor.trim();
    if (comentario === "") return "El comentario es obligatorio";
    if (comentario.length > 500) return "El comentario no puede superar los 500 caracteres";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let errorMsg = '';
    if (name === 'nombre') errorMsg = validarNombre(value);
    if (name === 'email') errorMsg = validarEmail(value);
    if (name === 'comentario') errorMsg = validarComentario(value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Comprobar validez global para habilitar el botón
  const isFormValid =
    formData.nombre.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.comentario.trim() !== '' &&
    validarNombre(formData.nombre) === '' &&
    validarEmail(formData.email) === '' &&
    validarComentario(formData.comentario) === '';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const mensaje = {
      nombre: formData.nombre.trim(),
      correo: formData.email.trim().toLowerCase(),
      comentario: formData.comentario.trim(),
      fecha: new Date().toISOString()
    };

    let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
    mensajes.push(mensaje);
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

    alert("✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.");

    // Limpiar formulario y errores
    setFormData({ nombre: '', email: '', comentario: '' });
    setErrors({ nombre: '', email: '', comentario: '' });
  };

  // Asignar clases dinámicas del CSS Module
  const getFieldClass = (fieldName) => {
    if (!formData[fieldName]) return '';
    return errors[fieldName] ? styles.invalido : styles.valido;
  };

  return (
    <>
      <Header />

      <main className={styles['contacto-main']}>
        <div className={styles['contacto-container']}>
          <h2 className={styles['contacto-titulo']}>Contáctanos</h2>
          <p className={styles['contacto-subtitulo']}>
            ¿Tienes alguna duda o sugerencia? ¡Escríbenos!
          </p>

          <form id="contactoForm" noValidate onSubmit={handleSubmit}>
            <div className={styles['form-group']}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                maxLength="100"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                className={getFieldClass('nombre')}
                required
              />
              <small id="nombreError" className={styles['error-msg']}>
                {errors.nombre}
              </small>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength="100"
                placeholder="ejemplo@duoc.cl"
                value={formData.email}
                onChange={handleChange}
                className={getFieldClass('email')}
                required
              />
              <small id="emailError" className={styles['error-msg']}>
                {errors.email}
              </small>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="comentario">Comentario:</label>
              <textarea
                id="comentario"
                name="comentario"
                maxLength="500"
                rows="5"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.comentario}
                onChange={handleChange}
                className={getFieldClass('comentario')}
                required
              ></textarea>
              <small id="comentarioError" className={styles['error-msg']}>
                {errors.comentario}
              </small>
            </div>

            <button
              type="submit"
              id="submitBtn"
              className={styles['btn-login']}
              disabled={!isFormValid}
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}