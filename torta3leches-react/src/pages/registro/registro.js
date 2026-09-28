const runInput = document.getElementById("run");
const nombreInput = document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const fechaInput = document.getElementById("fechaNacimiento");
const tipoUsuarioInput = document.getElementById("tipoUsuario");
const regionInput = document.getElementById("region");
const comunaInput = document.getElementById("comuna");
const direccionInput = document.getElementById("direccion");
const submitBtn = document.getElementById("submitBtn");
const registroForm = document.getElementById("registroForm");

const runError = document.getElementById("runError");
const nombreError = document.getElementById("nombreError");
const apellidosError = document.getElementById("apellidosError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const fechaError = document.getElementById("fechaError");
const tipoUsuarioError = document.getElementById("tipoUsuarioError");
const regionError = document.getElementById("regionError");
const comunaError = document.getElementById("comunaError");
const direccionError = document.getElementById("direccionError");

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

function cargarRegiones() {
    for (let region in REGIONES_COMUNAS) {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionInput.appendChild(option);
    }
}

function cargarComunas(region) {
    comunaInput.innerHTML = '<option value="">Selecciona una comuna</option>';
    if (region && REGIONES_COMUNAS[region]) {
        REGIONES_COMUNAS[region].forEach(comuna => {
            const option = document.createElement("option");
            option.value = comuna;
            option.textContent = comuna;
            comunaInput.appendChild(option);
        });
    }
}

cargarRegiones();

regionInput.addEventListener("change", function() {
    cargarComunas(this.value);
    validarFormulario();
});

function obtenerUsuarios() {
    const guardados = localStorage.getItem("usuariosRegistrados");
    return guardados ? JSON.parse(guardados) : [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
}

function mostrarError(input, errorElement, mensaje) {
    errorElement.textContent = mensaje;
    errorElement.style.color = "#a71c1c";
    input.classList.remove("valido");
    input.classList.add("invalido");
}

function mostrarExito(input, errorElement) {
    errorElement.textContent = "";
    input.classList.remove("invalido");
    input.classList.add("valido");
}

// ========== VALIDACIONES ==========

function validarRun() {
    const run = runInput.value.trim();
    
    if (run === "") {
        mostrarError(runInput, runError, "El RUN es obligatorio");
        return false;
    }
    
    if (run.includes(".") || run.includes("-")) {
        mostrarError(runInput, runError, "El RUN no debe contener puntos ni guion");
        return false;
    }
    
    if (run.length < 7 || run.length > 9) {
        mostrarError(runInput, runError, "El RUN debe tener entre 7 y 9 caracteres");
        return false;
    }
    
    const usuarios = obtenerUsuarios();
    const runExiste = usuarios.find(u => u.run === run);
    if (runExiste) {
        mostrarError(runInput, runError, "Este RUN ya está registrado");
        return false;
    }
    
    mostrarExito(runInput, runError);
    return true;
}

function validarNombre() {
    const nombre = nombreInput.value.trim();
    
    if (nombre === "") {
        mostrarError(nombreInput, nombreError, "El nombre es obligatorio");
        return false;
    }
    
    if (nombre.length > 50) {
        mostrarError(nombreInput, nombreError, "El nombre no puede superar los 50 caracteres");
        return false;
    }
    
    mostrarExito(nombreInput, nombreError);
    return true;
}

function validarApellidos() {
    const apellidos = apellidosInput.value.trim();
    
    if (apellidos === "") {
        mostrarError(apellidosInput, apellidosError, "Los apellidos son obligatorios");
        return false;
    }
    
    if (apellidos.length > 100) {
        mostrarError(apellidosInput, apellidosError, "Los apellidos no pueden superar los 100 caracteres");
        return false;
    }
    
    mostrarExito(apellidosInput, apellidosError);
    return true;
}

function validarEmail() {
    const email = emailInput.value.trim().toLowerCase();
    
    if (email === "") {
        mostrarError(emailInput, emailError, "El correo es obligatorio");
        return false;
    }
    
    if (email.length > 100) {
        mostrarError(emailInput, emailError, "El correo no puede superar los 100 caracteres");
        return false;
    }
    
    if (!email.includes("@")) {
        mostrarError(emailInput, emailError, "El correo debe contener @");
        return false;
    }
    
    const dominioValido = DOMINIOS_PERMITIDOS.some(d => email.endsWith(d));
    if (!dominioValido) {
        mostrarError(emailInput, emailError, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
        return false;
    }
    
    const usuarios = obtenerUsuarios();
    const emailExiste = usuarios.find(u => u.correo === email);
    if (emailExiste) {
        mostrarError(emailInput, emailError, "Este correo ya está registrado");
        return false;
    }
    
    mostrarExito(emailInput, emailError);
    return true;
}

function validarPassword() {
    const pass = passwordInput.value;
    
    if (pass === "") {
        mostrarError(passwordInput, passwordError, "La contraseña es obligatoria");
        return false;
    }
    
    if (pass.length < 4) {
        mostrarError(passwordInput, passwordError, "La contraseña debe tener al menos 4 caracteres");
        return false;
    }
    
    if (pass.length > 10) {
        mostrarError(passwordInput, passwordError, "La contraseña no puede superar los 10 caracteres");
        return false;
    }
    
    mostrarExito(passwordInput, passwordError);
    return true;
}

function validarTipoUsuario() {
    const tipo = tipoUsuarioInput.value;
    
    if (tipo === "") {
        mostrarError(tipoUsuarioInput, tipoUsuarioError, "Debes seleccionar un tipo de usuario");
        return false;
    }
    
    mostrarExito(tipoUsuarioInput, tipoUsuarioError);
    return true;
}

function validarRegion() {
    const region = regionInput.value;
    
    if (region === "") {
        mostrarError(regionInput, regionError, "Debes seleccionar una región");
        return false;
    }
    
    mostrarExito(regionInput, regionError);
    return true;
}

function validarComuna() {
    const comuna = comunaInput.value;
    
    if (comuna === "") {
        mostrarError(comunaInput, comunaError, "Debes seleccionar una comuna");
        return false;
    }
    
    mostrarExito(comunaInput, comunaError);
    return true;
}

function validarDireccion() {
    const direccion = direccionInput.value.trim();
    
    if (direccion === "") {
        mostrarError(direccionInput, direccionError, "La dirección es obligatoria");
        return false;
    }
    
    if (direccion.length > 300) {
        mostrarError(direccionInput, direccionError, "La dirección no puede superar los 300 caracteres");
        return false;
    }
    
    mostrarExito(direccionInput, direccionError);
    return true;
}

function validarFormulario() {
    const runValido = validarRun();
    const nombreValido = validarNombre();
    const apellidosValidos = validarApellidos();
    const emailValido = validarEmail();
    const passwordValido = validarPassword();
    const tipoValido = validarTipoUsuario();
    const regionValida = validarRegion();
    const comunaValida = validarComuna();
    const direccionValida = validarDireccion();
    
    const todoValido = runValido && nombreValido && apellidosValidos && emailValido && 
                       passwordValido && tipoValido && regionValida && comunaValida && direccionValida;
    
    submitBtn.disabled = !todoValido;
    return todoValido;
}

// ========== EVENTOS ==========

runInput.addEventListener("input", validarFormulario);
nombreInput.addEventListener("input", validarFormulario);
apellidosInput.addEventListener("input", validarFormulario);
emailInput.addEventListener("input", validarFormulario);
passwordInput.addEventListener("input", validarFormulario);
tipoUsuarioInput.addEventListener("change", validarFormulario);
comunaInput.addEventListener("change", validarFormulario);
direccionInput.addEventListener("input", validarFormulario);

registroForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (validarFormulario()) {
        const nuevoUsuario = {
            run: runInput.value.trim(),
            nombre: nombreInput.value.trim(),
            apellidos: apellidosInput.value.trim(),
            correo: emailInput.value.trim().toLowerCase(),
            password: passwordInput.value,
            fechaNacimiento: fechaInput.value,
            tipoUsuario: tipoUsuarioInput.value,
            region: regionInput.value,
            comuna: comunaInput.value,
            direccion: direccionInput.value.trim(),
            fechaRegistro: new Date().toISOString()
        };
        
        const usuarios = obtenerUsuarios();
        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);
        
        alert("¡Registro exitoso! Bienvenido a PokéComelones 🍰");
        window.location.href = "../iniciar_sesion/iniciarSesion.html";
    }
});