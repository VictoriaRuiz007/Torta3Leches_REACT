import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';
import styles from "./login.module.css";

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

export default function IniciarSesion() {
  const navigate = useNavigate();

  // Estados de los campos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Estados de los mensajes de error
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Funciones de validación individuales
  const validarEmail = (value) => {
    const email = value.trim().toLowerCase();
    if (!email) {
      return "El correo es obligatorio";
    }
    const dominioValido = DOMINIOS_PERMITIDOS.some((d) => email.endsWith(d));
    if (!dominioValido) {
      return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    }
    return "";
  };

  const validarPassword = (value) => {
    if (!value) {
      return "La contraseña es obligatoria";
    }
    if (value.length < 4 || value.length > 10) {
      return "Entre 4 y 10 caracteres";
    }
    return "";
  };

  // Manejador de cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el valor del input
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    // Validar el campo modificado
    const emailErr = name === 'email' ? validarEmail(value) : errors.email;
    const passErr = name === 'password' ? validarPassword(value) : errors.password;

    setErrors({
      email: emailErr,
      password: passErr
    });
  };

  // Determinar si el formulario es válido para habilitar/deshabilitar el botón
  const isEmailValid = formData.email !== '' && validarEmail(formData.email) === '';
  const isPasswordValid = formData.password !== '' && validarPassword(formData.password) === '';
  const isFormValid = isEmailValid && isPasswordValid;

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const emailBuscado = formData.email.trim().toLowerCase();
    const passwordBuscada = formData.password;

    // Obtener usuarios guardados en localStorage
    const guardados = localStorage.getItem("usuariosRegistrados");
    const usuarios = guardados ? JSON.parse(guardados) : [];

    const usuarioEncontrado = usuarios.find((u) => u.correo === emailBuscado);

    if (!usuarioEncontrado) {
      setErrors((prev) => ({
        ...prev,
        email: "❌ Usuario no registrado. Regístrate primero."
      }));
      return;
    }

    if (usuarioEncontrado.password !== passwordBuscada) {
      setErrors((prev) => ({
        ...prev,
        password: "❌ Contraseña incorrecta."
      }));
      return;
    }

    // Estructurar el objeto de usuario activo
    const usuario = {
      run: usuarioEncontrado.run || "",
      nombre: usuarioEncontrado.nombre || "",
      apellidos: usuarioEncontrado.apellidos || "",
      correo: usuarioEncontrado.correo,
      rol: usuarioEncontrado.tipoUsuario || "cliente",
      region: usuarioEncontrado.region || "",
      comuna: usuarioEncontrado.comuna || "",
      direccion: usuarioEncontrado.direccion || "",
      fechaIngreso: new Date().toISOString()
    };

    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

    alert("¡Inicio de sesión exitoso! Bienvenido " + (usuario.nombre || "a PokéComelones"));

    // Redireccionar al Inicio con React Router
    navigate("/");
  };

  // Clases dinámicas para bordes según validación
  const getFieldClass = (fieldName) => {
    if (!formData[fieldName]) return "";
    return errors[fieldName] ? styles.invalido : styles.valido;
  };

  return (
    <>
      <Header />
      <main className={styles['login-main']}>
        <div className={styles['login-container']}>
          <h2 className={styles['login-titulo']}>Inicio de Sesión</h2>
          <p className={styles['login-subtitulo']}>¡Bienvenido de vuelta a PokéComelones!</p>

          <form id="loginForm" noValidate onSubmit={handleSubmit}>
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
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Entre 4 y 10 caracteres"
                value={formData.password}
                onChange={handleChange}
                className={getFieldClass('password')}
                required
              />
              <small id="passwordError" className={styles['error-msg']}>
                {errors.password}
              </small>
            </div>

            <button
              type="submit"
              id="submitBtn"
              className={styles['btn-img']}
              disabled={!isFormValid}
            >
              Ingresar
            </button>
          </form>

          <p className={styles['login-link']}>
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}