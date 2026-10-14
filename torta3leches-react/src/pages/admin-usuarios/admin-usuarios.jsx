import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

// Importación CSS Module usando el objeto 'styles'
import styles from '../../styles/adminGlobal.module.css';

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

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

export default function AdminUsuarios() {
    const navigate = useNavigate();
    const formRef = useRef(null);

    const [usuarios, setUsuarios] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoRun, setEditandoRun] = useState(null);

    const [formData, setFormData] = useState({
        run: '',
        nombre: '',
        apellidos: '',
        correo: '',
        password: '',
        fechaNacimiento: '',
        tipoUsuario: '',
        region: '',
        comuna: '',
        direccion: ''
    });

    const [errors, setErrors] = useState({});

    // 1. Verificar Acceso y Cargar Usuarios
    useEffect(() => {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (!usuarioLogueado || usuarioLogueado.rol !== 'administrador') {
            alert('Acceso restringido. Debes iniciar sesión como administrador.');
            navigate('/iniciar-sesion');
            return;
        }

        const guardados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
        setUsuarios(guardados);
    }, [navigate]);

    const guardarEnLocalStorage = (nuevosUsuarios) => {
        setUsuarios(nuevosUsuarios);
        localStorage.setItem('usuariosRegistrados', JSON.stringify(nuevosUsuarios));
    };

    // 2. Funciones de Validación
    const validarRUT = (runStr) => {
        const rutLimpio = runStr.trim().replace(/[.-]/g, '');
        if (!/^[0-9]+[0-9Kk]$/.test(rutLimpio)) {
            return { valido: false, mensaje: 'Formato inválido (ej: 19011022K)' };
        }
        const cuerpo = rutLimpio.slice(0, -1);
        const dvIngresado = rutLimpio.slice(-1).toUpperCase();

        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
            multiplo = (multiplo + 1) % 8 || 2;
        }
        const dvCalculado = 11 - (suma % 11);
        const dvCalculadoStr = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString();

        if (dvIngresado !== dvCalculadoStr) {
            return { valido: false, mensaje: `Dígito verificador incorrecto (debe ser ${dvCalculadoStr})` };
        }
        return { valido: true };
    };

    const validarCampo = (name, value, currentData = formData) => {
        let error = '';
        const val = value.toString().trim();

        switch (name) {
            case 'run':
                if (!val) {
                    error = 'El RUN es obligatorio';
                } else {
                    const resRut = validarRUT(val);
                    if (!resRut.valido) {
                        error = resRut.mensaje;
                    } else {
                        const duplicado = usuarios.find(u => u.run === val && u.run !== editandoRun);
                        if (duplicado) error = 'RUN ya registrado';
                    }
                }
                break;

            case 'nombre':
                if (!val) error = 'El nombre es obligatorio';
                else if (val.length > 50) error = 'Máximo 50 caracteres';
                break;

            case 'apellidos':
                if (!val) error = 'Los apellidos son obligatorios';
                else if (val.length > 100) error = 'Máximo 100 caracteres';
                break;

            case 'correo':
                if (!val) {
                    error = 'El correo es obligatorio';
                } else if (val.length > 100) {
                    error = 'Máximo 100 caracteres';
                } else if (!DOMINIOS_PERMITIDOS.some(d => val.toLowerCase().endsWith(d))) {
                    error = 'Solo @duoc.cl, @profesor.duoc.cl o @gmail.com';
                } else {
                    const duplicado = usuarios.find(u => u.correo.toLowerCase() === val.toLowerCase() && u.run !== editandoRun);
                    if (duplicado) error = 'Correo ya registrado';
                }
                break;

            case 'password':
                if (!value) error = 'La contraseña es obligatoria';
                else if (value.length < 4 || value.length > 10) error = 'Entre 4 y 10 caracteres';
                break;

            case 'tipoUsuario':
                if (!val) error = 'Selecciona un tipo';
                break;

            case 'region':
                if (!val) error = 'Selecciona una región';
                break;

            case 'comuna':
                if (!val) error = 'Selecciona una comuna';
                break;

            case 'direccion':
                if (!val) error = 'La dirección es obligatoria';
                else if (val.length > 300) error = 'Máximo 300 caracteres';
                break;

            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        let updatedData = { ...formData, [id]: value };

        // Si cambia la región, reiniciamos la comuna seleccionada
        if (id === 'region') {
            updatedData.comuna = '';
        }

        setFormData(updatedData);

        const fieldError = validarCampo(id, value, updatedData);
        setErrors(prev => ({
            ...prev,
            [id]: fieldError,
            ...(id === 'region' ? { comuna: 'Selecciona una comuna' } : {})
        }));
    };

    const isFormValid = () => {
        const obligatorios = ['run', 'nombre', 'apellidos', 'correo', 'password', 'tipoUsuario', 'region', 'comuna', 'direccion'];
        for (const campo of obligatorios) {
            if (!formData[campo] || validarCampo(campo, formData[campo]) !== '') {
                return false;
            }
        }
        return !Object.values(errors).some(err => err !== '');
    };

    // 3. Control del Formulario
    const handleNuevoUsuario = () => {
        setEditandoRun(null);
        setFormData({
            run: '',
            nombre: '',
            apellidos: '',
            correo: '',
            password: '',
            fechaNacimiento: '',
            tipoUsuario: '',
            region: '',
            comuna: '',
            direccion: ''
        });
        setErrors({});
        setMostrarForm(true);
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const handleEditar = (user) => {
        setEditandoRun(user.run);
        setFormData({
            run: user.run || '',
            nombre: user.nombre || '',
            apellidos: user.apellidos || '',
            correo: user.correo || '',
            password: user.password || '',
            fechaNacimiento: user.fechaNacimiento || '',
            tipoUsuario: user.tipoUsuario || 'cliente',
            region: user.region || '',
            comuna: user.comuna || '',
            direccion: user.direccion || ''
        });
        setErrors({});
        setMostrarForm(true);
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const handleCancelar = () => {
        setMostrarForm(false);
        setEditandoRun(null);
        setErrors({});
    };

    const handleEliminar = (run) => {
        if (window.confirm('¿Eliminar este usuario?')) {
            const nuevos = usuarios.filter(u => u.run !== run);
            guardarEnLocalStorage(nuevos);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        const nuevoUsuario = {
            run: formData.run.trim(),
            nombre: formData.nombre.trim(),
            apellidos: formData.apellidos.trim(),
            correo: formData.correo.trim().toLowerCase(),
            password: formData.password,
            fechaNacimiento: formData.fechaNacimiento || '',
            tipoUsuario: formData.tipoUsuario,
            region: formData.region,
            comuna: formData.comuna,
            direccion: formData.direccion.trim()
        };

        let listaActualizada = [];
        if (editandoRun) {
            listaActualizada = usuarios.map(u => (u.run === editandoRun ? nuevoUsuario : u));
        } else {
            listaActualizada = [...usuarios, nuevoUsuario];
        }

        guardarEnLocalStorage(listaActualizada);
        handleCancelar();
        alert('Usuario guardado exitosamente.');
    };

    return (
        <div className={styles['admin-wrapper']}>
            <AdminHeader />

            <main className={styles['admin-main']}>
                <header className={styles['admin-header']}>
                    <h1>Gestión de Usuarios</h1>
                    <button
                        className={styles['btn-submit']}
                        id="btnNuevoUsuario"
                        style={{ width: 'auto', padding: '8px 25px' }}
                        onClick={handleNuevoUsuario}
                    >
                        + Nuevo Usuario
                    </button>
                </header>

                {/* Tabla de Usuarios */}
                <div className={styles['admin-table-container']}>
                    <table className={styles['admin-table']}>
                        <thead>
                            <tr>
                                <th>RUN</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Tipo</th>
                                <th>Región</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        No hay usuarios registrados
                                    </td>
                                </tr>
                            ) : (
                                usuarios.map((user) => (
                                    <tr key={user.run}>
                                        <td>{user.run}</td>
                                        <td>{user.nombre} {user.apellidos}</td>
                                        <td>{user.correo}</td>
                                        <td>{user.tipoUsuario || 'cliente'}</td>
                                        <td>{user.region || ''}</td>
                                        <td>
                                            <button
                                                className={`${styles['btn-accion']} ${styles['btn-editar']}`}
                                                onClick={() => handleEditar(user)}
                                                style={{ marginRight: '8px' }}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button
                                                className={`${styles['btn-accion']} ${styles['btn-eliminar']}`}
                                                onClick={() => handleEliminar(user.run)}
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

                {/* Formulario de Crear / Editar */}
                {mostrarForm && (
                    <div id="formUsuarioContainer" ref={formRef}>
                        <h3 style={{ fontFamily: "'Pacifico', cursive", color: '#8B4513', fontSize: '24px', marginBottom: '15px' }}>
                            {editandoRun ? 'Editar Usuario' : 'Nuevo Usuario'}
                        </h3>
                        <form className={styles['admin-form']} noValidate onSubmit={handleSubmit}>
                            <div className={styles['form-row']}>
                                <div className={styles['form-group']}>
                                    <label htmlFor="run">RUN (sin puntos ni guion):</label>
                                    <input
                                        type="text"
                                        id="run"
                                        placeholder="Ej: 19011022K"
                                        maxLength="9"
                                        required
                                        disabled={!!editandoRun}
                                        value={formData.run}
                                        onChange={handleChange}
                                    />
                                    <small className={styles['error-msg']}>{errors.run}</small>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        maxLength="50"
                                        required
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                    <small className={styles['error-msg']}>{errors.nombre}</small>
                                </div>
                            </div>

                            <div className={styles['form-row']}>
                                <div className={styles['form-group']}>
                                    <label htmlFor="apellidos">Apellidos:</label>
                                    <input
                                        type="text"
                                        id="apellidos"
                                        maxLength="100"
                                        required
                                        value={formData.apellidos}
                                        onChange={handleChange}
                                    />
                                    <small className={styles['error-msg']}>{errors.apellidos}</small>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="correo">Correo:</label>
                                    <input
                                        type="email"
                                        id="correo"
                                        maxLength="100"
                                        required
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                    <small className={styles['error-msg']}>{errors.correo}</small>
                                </div>
                            </div>

                            <div className={styles['form-row']}>
                                <div className={styles['form-group']}>
                                    <label htmlFor="password">Contraseña (4-10 caracteres):</label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <small className={styles['error-msg']}>{errors.password}</small>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                                    <input
                                        type="date"
                                        id="fechaNacimiento"
                                        value={formData.fechaNacimiento}
                                        onChange={handleChange}
                                    />
                                    <small className={styles['error-msg']}>{errors.fechaNacimiento}</small>
                                </div>
                            </div>

                            <div className={styles['form-row']}>
                                <div className={styles['form-group']}>
                                    <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
                                    <select
                                        id="tipoUsuario"
                                        required
                                        value={formData.tipoUsuario}
                                        onChange={handleChange}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="vendedor">Vendedor</option>
                                        <option value="cliente">Cliente</option>
                                    </select>
                                    <small className={styles['error-msg']}>{errors.tipoUsuario}</small>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="region">Región:</label>
                                    <select
                                        id="region"
                                        required
                                        value={formData.region}
                                        onChange={handleChange}
                                    >
                                        <option value="">Seleccionar</option>
                                        {Object.keys(REGIONES_COMUNAS).map((regionName) => (
                                            <option key={regionName} value={regionName}>
                                                {regionName}
                                            </option>
                                        ))}
                                    </select>
                                    <small className={styles['error-msg']}>{errors.region}</small>
                                </div>

                                <div className={styles['form-group']}>
                                    <label htmlFor="comuna">Comuna:</label>
                                    <select
                                        id="comuna"
                                        required
                                        value={formData.comuna}
                                        onChange={handleChange}
                                        disabled={!formData.region}
                                    >
                                        <option value="">Seleccionar</option>
                                        {formData.region &&
                                            REGIONES_COMUNAS[formData.region]?.map((comunaName) => (
                                                <option key={comunaName} value={comunaName}>
                                                    {comunaName}
                                                </option>
                                            ))}
                                    </select>
                                    <small className={styles['error-msg']}>{errors.comuna}</small>
                                </div>
                            </div>

                            <div className={styles['form-group']}>
                                <label htmlFor="direccion">Dirección:</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    maxLength="300"
                                    required
                                    value={formData.direccion}
                                    onChange={handleChange}
                                />
                                <small className={styles['error-msg']}>{errors.direccion}</small>
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
            <AdminFooter />
        </div>
    );
}