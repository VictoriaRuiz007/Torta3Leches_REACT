import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';

// Importamos el archivo como CSS Module
import styles from './registro.module.css';

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

const REGIONES_COMUNAS = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Antofagasta": ["Antofagasta", "Mejillones", "Taltal", "Tocopilla", "Ollagüe", "Calama", "San Pedro de Atacama", "María Elena"],
  "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "San Pedro", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
  "Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Ñuble": ["Chillán", "Bulnes", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
  "La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

export default function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    tipoUsuario: '',
    region: '',
    comuna: '',
    direccion: ''
  });

  const [errors, setErrors] = useState({});

  const obtenerUsuarios = () => {
    const guardados = localStorage.getItem("usuariosRegistrados");
    return guardados ? JSON.parse(guardados) : [];
  };

  const validarRun = (run) => {
    const valor = run.trim();
    if (!valor) return "El RUN es obligatorio";
    if (valor.includes(".") || valor.includes("-")) return "El RUN no debe contener puntos ni guion";
    if (valor.length < 7 || valor.length > 9) return "El RUN debe tener entre 7 y 9 caracteres";
    
    const usuarios = obtenerUsuarios();
    if (usuarios.some(u => u.run === valor)) return "Este RUN ya está registrado";
    return "";
  };

  const validarNombre = (nombre) => {
    const valor = nombre.trim();
    if (!valor) return "El nombre es obligatorio";
    if (valor.length > 50) return "El nombre no puede superar los 50 caracteres";
    return "";
  };

  const validarApellidos = (apellidos) => {
    const valor = apellidos.trim();
    if (!valor) return "Los apellidos son obligatorios";
    if (valor.length > 100) return "Los apellidos no pueden superar los 100 caracteres";
    return "";
  };

  const validarEmail = (email) => {
    const valor = email.trim().toLowerCase();
    if (!valor) return "El correo es obligatorio";
    if (valor.length > 100) return "El correo no puede superar los 100 caracteres";
    if (!valor.includes("@")) return "El correo debe contener @";
    
    const dominioValido = DOMINIOS_PERMITIDOS.some(d => valor.endsWith(d));
    if (!dominioValido) return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    
    const usuarios = obtenerUsuarios();
    if (usuarios.some(u => u.correo === valor)) return "Este correo ya está registrado";
    return "";
  };

  const validarPassword = (pass) => {
    if (!pass) return "La contraseña es obligatoria";
    if (pass.length < 4) return "La contraseña debe tener al menos 4 caracteres";
    if (pass.length > 10) return "La contraseña no puede superar los 10 caracteres";
    return "";
  };

  const validarTipoUsuario = (tipo) => {
    if (!tipo) return "Debes seleccionar un tipo de usuario";
    return "";
  };

  const validarRegion = (region) => {
    if (!region) return "Debes seleccionar una región";
    return "";
  };

  const validarComuna = (comuna) => {
    if (!comuna) return "Debes seleccionar una comuna";
    return "";
  };

  const validarDireccion = (direccion) => {
    const valor = direccion.trim();
    if (!valor) return "La dirección es obligatoria";
    if (valor.length > 300) return "La dirección no puede superar los 300 caracteres";
    return "";
  };

  const validarCampo = (name, value) => {
    switch (name) {
      case 'run': return validarRun(value);
      case 'nombre': return validarNombre(value);
      case 'apellidos': return validarApellidos(value);
      case 'email': return validarEmail(value);
      case 'password': return validarPassword(value);
      case 'tipoUsuario': return validarTipoUsuario(value);
      case 'region': return validarRegion(value);
      case 'comuna': return validarComuna(value);
      case 'direccion': return validarDireccion(value);
      default: return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nextFormData = {
      ...formData,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {})
    };

    setFormData(nextFormData);

    const fieldError = validarCampo(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError,
      ...(name === 'region' ? { comuna: '' } : {})
    }));
  };

  const isFormValid = 
    validarRun(formData.run) === "" &&
    validarNombre(formData.nombre) === "" &&
    validarApellidos(formData.apellidos) === "" &&
    validarEmail(formData.email) === "" &&
    validarPassword(formData.password) === "" &&
    validarTipoUsuario(formData.tipoUsuario) === "" &&
    validarRegion(formData.region) === "" &&
    validarComuna(formData.comuna) === "" &&
    validarDireccion(formData.direccion) === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const nuevoUsuario = {
      run: formData.run.trim(),
      nombre: formData.nombre.trim(),
      apellidos: formData.apellidos.trim(),
      correo: formData.email.trim().toLowerCase(),
      password: formData.password,
      fechaNacimiento: formData.fechaNacimiento,
      tipoUsuario: formData.tipoUsuario,
      region: formData.region,
      comuna: formData.comuna,
      direccion: formData.direccion.trim(),
      fechaRegistro: new Date().toISOString()
    };

    const usuarios = obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

    alert("¡Registro exitoso! Bienvenido a PokéComelones 🍰");
    navigate("/iniciar-sesion");
  };

  // Asigna las clases del módulo dinámicamente
  const getFieldClass = (fieldName) => {
    if (!formData[fieldName]) return "";
    return errors[fieldName] ? styles.invalido : styles.valido;
  };

  return (
    <>
      <Header/>
      <main className={styles['login-main']}>
        <div className={`${styles['login-container']} ${styles['registro-container']}`}>
          <h2 className={styles['login-titulo']}>Registro de Usuario</h2>
          <p className={styles['login-subtitulo']}>¡Únete a la familia PokéComelones!</p>

          <form id="registroForm" noValidate onSubmit={handleSubmit}>
            <div className={styles['form-group']}>
              <label htmlFor="run">RUN:</label>
              <input
                type="text"
                id="run"
                name="run"
                maxLength="9"
                placeholder="Ej: 19011022K"
                value={formData.run}
                onChange={handleChange}
                className={getFieldClass('run')}
                required
              />
              <small id="runError" className={styles['error-msg']}>{errors.run}</small>
            </div>

            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  maxLength="50"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={getFieldClass('nombre')}
                  required
                />
                <small id="nombreError" className={styles['error-msg']}>{errors.nombre}</small>
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  maxLength="100"
                  placeholder="Tus apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className={getFieldClass('apellidos')}
                  required
                />
                <small id="apellidosError" className={styles['error-msg']}>{errors.apellidos}</small>
              </div>
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
              <small id="emailError" className={styles['error-msg']}>{errors.email}</small>
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
              <small id="passwordError" className={styles['error-msg']}>{errors.password}</small>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
              <small id="fechaError" className={styles['error-msg']}>{errors.fechaNacimiento}</small>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
                className={getFieldClass('tipoUsuario')}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="administrador">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="cliente">Cliente</option>
              </select>
              <small id="tipoUsuarioError" className={styles['error-msg']}>{errors.tipoUsuario}</small>
            </div>

            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="region">Región:</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={getFieldClass('region')}
                  required
                >
                  <option value="">Selecciona una región</option>
                  {Object.keys(REGIONES_COMUNAS).map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
                <small id="regionError" className={styles['error-msg']}>{errors.region}</small>
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="comuna">Comuna:</label>
                <select
                  id="comuna"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  className={getFieldClass('comuna')}
                  disabled={!formData.region}
                  required
                >
                  <option value="">Selecciona una comuna</option>
                  {formData.region && REGIONES_COMUNAS[formData.region]?.map((com) => (
                    <option key={com} value={com}>{com}</option>
                  ))}
                </select>
                <small id="comunaError" className={styles['error-msg']}>{errors.comuna}</small>
              </div>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                maxLength="300"
                placeholder="Calle, número, depto..."
                value={formData.direccion}
                onChange={handleChange}
                className={getFieldClass('direccion')}
                required
              />
              <small id="direccionError" className={styles['error-msg']}>{errors.direccion}</small>
            </div>

            <button
              type="submit"
              id="submitBtn"
              className={styles['btn-login']}
              disabled={!isFormValid}
            >
              Registrarme
            </button>
          </form>

          <p className={styles['login-link']}>
            ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia sesión aquí</Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}