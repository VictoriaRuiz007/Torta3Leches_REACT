document.addEventListener('DOMContentLoaded', function() {
    if (!verificarAccesoAdmin()) return;

    const tabla = document.getElementById('tablaUsuarios');
    const formContainer = document.getElementById('formUsuarioContainer');
    const form = document.getElementById('formUsuario');
    const tituloForm = document.getElementById('formUsuarioTitulo');
    const btnNuevo = document.getElementById('btnNuevoUsuario');
    const btnCancelar = document.getElementById('cancelarUsuarioBtn');
    const submitBtn = document.getElementById('submitUsuarioBtn');

    const runInput = document.getElementById('run');
    const nombreInput = document.getElementById('nombreUsuario');
    const apellidosInput = document.getElementById('apellidos');
    const emailInput = document.getElementById('emailUsuario');
    const passwordInput = document.getElementById('passwordUsuario');
    const fechaInput = document.getElementById('fechaNacimiento');
    const tipoInput = document.getElementById('tipoUsuario');
    const regionInput = document.getElementById('regionUsuario');
    const comunaInput = document.getElementById('comunaUsuario');
    const direccionInput = document.getElementById('direccion');

    const runError = document.getElementById('runError');
    const nombreError = document.getElementById('nombreUsuarioError');
    const apellidosError = document.getElementById('apellidosError');
    const emailError = document.getElementById('emailUsuarioError');
    const passwordError = document.getElementById('passwordUsuarioError');
    const fechaError = document.getElementById('fechaError');
    const tipoError = document.getElementById('tipoUsuarioError');
    const regionError = document.getElementById('regionUsuarioError');
    const comunaError = document.getElementById('comunaUsuarioError');
    const direccionError = document.getElementById('direccionError');

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

    let usuarios = obtenerUsuarios();
    let editandoRun = null;

    function cargarRegiones() {
        regionInput.innerHTML = '<option value="">Seleccionar</option>';
        for (let region in REGIONES_COMUNAS) {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionInput.appendChild(option);
        }
    }

    function cargarComunas(regionSeleccionada) {
        comunaInput.innerHTML = '<option value="">Seleccionar</option>';
        if (regionSeleccionada && REGIONES_COMUNAS[regionSeleccionada]) {
            REGIONES_COMUNAS[regionSeleccionada].forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                comunaInput.appendChild(option);
            });
        }
    }

    regionInput.addEventListener('change', function() {
        cargarComunas(this.value);
        validarFormularioUsuario();
    });

    function renderizarTablaUsuarios() {
        tabla.innerHTML = '';
        if (usuarios.length === 0) {
            tabla.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay usuarios registrados</td></tr>';
            return;
        }
        usuarios.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.run}</td>
                <td>${user.nombre} ${user.apellidos}</td>
                <td>${user.correo}</td>
                <td>${user.tipoUsuario || 'cliente'}</td>
                <td>${user.region || ''}</td>
                <td>
                    <button class="btn-accion btn-editar" data-run="${user.run}">✏️ Editar</button>
                    <button class="btn-accion btn-eliminar" data-run="${user.run}">🗑️ Eliminar</button>
                </td>
            `;
            tabla.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', function() {
                const run = this.dataset.run;
                editarUsuario(run);
            });
        });
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const run = this.dataset.run;
                if (confirm('¿Eliminar este usuario?')) {
                    eliminarUsuario(run);
                }
            });
        });
    }

    function mostrarFormularioUsuario(editar = false, usuario = null) {
        formContainer.style.display = 'block';
        if (editar && usuario) {
            tituloForm.textContent = 'Editar Usuario';
            runInput.value = usuario.run;
            runInput.disabled = true; 
            nombreInput.value = usuario.nombre;
            apellidosInput.value = usuario.apellidos;
            emailInput.value = usuario.correo;
            passwordInput.value = usuario.password;
            fechaInput.value = usuario.fechaNacimiento || '';
            tipoInput.value = usuario.tipoUsuario || 'cliente';
            regionInput.value = usuario.region || '';
            cargarComunas(usuario.region || '');
            comunaInput.value = usuario.comuna || '';
            direccionInput.value = usuario.direccion || '';
            editandoRun = usuario.run;
        } else {
            tituloForm.textContent = 'Nuevo Usuario';
            form.reset();
            runInput.disabled = false;
            cargarRegiones();
            cargarComunas('');
            editandoRun = null;
        }
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.querySelectorAll('.invalido').forEach(el => el.classList.remove('invalido'));
        document.querySelectorAll('.valido').forEach(el => el.classList.remove('valido'));
        submitBtn.disabled = true;
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function ocultarFormularioUsuario() {
        formContainer.style.display = 'none';
        editandoRun = null;
    }

    function validarRunUsuario() {
        const val = runInput.value.trim();
        const result = validarRun(val);
        if (!result.valido) {
            mostrarError(runInput, runError, result.mensaje);
            return false;
        }
        const duplicado = usuarios.find(u => u.run === val && u.run !== editandoRun);
        if (duplicado) {
            mostrarError(runInput, runError, 'RUN ya registrado');
            return false;
        }
        mostrarExito(runInput, runError);
        return true;
    }

    function validarNombreUsuario() {
        const val = nombreInput.value.trim();
        if (val === '') {
            mostrarError(nombreInput, nombreError, 'El nombre es obligatorio');
            return false;
        }
        if (val.length > 50) {
            mostrarError(nombreInput, nombreError, 'Máximo 50 caracteres');
            return false;
        }
        mostrarExito(nombreInput, nombreError);
        return true;
    }

    function validarApellidosUsuario() {
        const val = apellidosInput.value.trim();
        if (val === '') {
            mostrarError(apellidosInput, apellidosError, 'Los apellidos son obligatorios');
            return false;
        }
        if (val.length > 100) {
            mostrarError(apellidosInput, apellidosError, 'Máximo 100 caracteres');
            return false;
        }
        mostrarExito(apellidosInput, apellidosError);
        return true;
    }

    function validarEmailUsuario() {
        const val = emailInput.value.trim();
        const result = validarEmail(val);
        if (!result.valido) {
            mostrarError(emailInput, emailError, result.mensaje);
            return false;
        }
        const duplicado = usuarios.find(u => u.correo === val && u.run !== editandoRun);
        if (duplicado) {
            mostrarError(emailInput, emailError, 'Correo ya registrado');
            return false;
        }
        mostrarExito(emailInput, emailError);
        return true;
    }

    function validarPasswordUsuario() {
        const val = passwordInput.value;
        const result = validarPassword(val);
        if (!result.valido) {
            mostrarError(passwordInput, passwordError, result.mensaje);
            return false;
        }
        mostrarExito(passwordInput, passwordError);
        return true;
    }

    function validarTipoUsuario() {
        const val = tipoInput.value;
        if (val === '') {
            mostrarError(tipoInput, tipoError, 'Selecciona un tipo');
            return false;
        }
        mostrarExito(tipoInput, tipoError);
        return true;
    }

    function validarRegionUsuario() {
        const val = regionInput.value;
        if (val === '') {
            mostrarError(regionInput, regionError, 'Selecciona una región');
            return false;
        }
        mostrarExito(regionInput, regionError);
        return true;
    }

    function validarComunaUsuario() {
        const val = comunaInput.value;
        if (val === '') {
            mostrarError(comunaInput, comunaError, 'Selecciona una comuna');
            return false;
        }
        mostrarExito(comunaInput, comunaError);
        return true;
    }

    function validarDireccionUsuario() {
        const val = direccionInput.value.trim();
        if (val === '') {
            mostrarError(direccionInput, direccionError, 'La dirección es obligatoria');
            return false;
        }
        if (val.length > 300) {
            mostrarError(direccionInput, direccionError, 'Máximo 300 caracteres');
            return false;
        }
        mostrarExito(direccionInput, direccionError);
        return true;
    }

    function validarFormularioUsuario() {
        const valRun = validarRunUsuario();
        const valNombre = validarNombreUsuario();
        const valApellidos = validarApellidosUsuario();
        const valEmail = validarEmailUsuario();
        const valPassword = validarPasswordUsuario();
        const valTipo = validarTipoUsuario();
        const valRegion = validarRegionUsuario();
        const valComuna = validarComunaUsuario();
        const valDireccion = validarDireccionUsuario();

        const todoOk = valRun && valNombre && valApellidos && valEmail && valPassword && valTipo && valRegion && valComuna && valDireccion;
        submitBtn.disabled = !todoOk;
        return todoOk;
    }

    runInput.addEventListener('input', validarFormularioUsuario);
    nombreInput.addEventListener('input', validarFormularioUsuario);
    apellidosInput.addEventListener('input', validarFormularioUsuario);
    emailInput.addEventListener('input', validarFormularioUsuario);
    passwordInput.addEventListener('input', validarFormularioUsuario);
    tipoInput.addEventListener('change', validarFormularioUsuario);
    comunaInput.addEventListener('change', validarFormularioUsuario);
    direccionInput.addEventListener('input', validarFormularioUsuario);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validarFormularioUsuario()) return;

        const nuevoUsuario = {
            run: runInput.value.trim(),
            nombre: nombreInput.value.trim(),
            apellidos: apellidosInput.value.trim(),
            correo: emailInput.value.trim().toLowerCase(),
            password: passwordInput.value,
            fechaNacimiento: fechaInput.value || '',
            tipoUsuario: tipoInput.value,
            region: regionInput.value,
            comuna: comunaInput.value,
            direccion: direccionInput.value.trim()
        };

        if (editandoRun) {
            const index = usuarios.findIndex(u => u.run === editandoRun);
            if (index !== -1) {
                usuarios[index] = nuevoUsuario;
            }
        } else {
            usuarios.push(nuevoUsuario);
        }

        guardarUsuarios(usuarios);
        renderizarTablaUsuarios();
        ocultarFormularioUsuario();
        alert('Usuario guardado exitosamente.');
    });

    function editarUsuario(run) {
        const usuario = usuarios.find(u => u.run === run);
        if (usuario) {
            mostrarFormularioUsuario(true, usuario);
        }
    }

    function eliminarUsuario(run) {
        usuarios = usuarios.filter(u => u.run !== run);
        guardarUsuarios(usuarios);
        renderizarTablaUsuarios();
    }

    btnNuevo.addEventListener('click', function() {
        mostrarFormularioUsuario(false);
    });

    btnCancelar.addEventListener('click', ocultarFormularioUsuario);

    cargarRegiones();
    renderizarTablaUsuarios();
});

function validarRunUsuario() {
    const val = runInput.value.trim();
    if (val === '') {
        mostrarError(runInput, runError, 'El RUN es obligatorio');
        return false;
    }
    const result = validarRUT(val);
    if (!result.valido) {
        mostrarError(runInput, runError, result.mensaje);
        return false;
    }
    const duplicado = usuarios.find(u => u.run === val && u.run !== editandoRun);
    if (duplicado) {
        mostrarError(runInput, runError, 'RUN ya registrado');
        return false;
    }
    mostrarExito(runInput, runError);
    return true;
}