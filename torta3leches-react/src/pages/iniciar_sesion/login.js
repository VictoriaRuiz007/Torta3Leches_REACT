const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const submitBtn = document.getElementById("submitBtn");
const loginForm = document.getElementById("loginForm");

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function obtenerUsuarios() {
    const guardados = localStorage.getItem("usuariosRegistrados");
    return guardados ? JSON.parse(guardados) : [];
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

function validarEmail() {
    const email = emailInput.value.trim().toLowerCase();
    
    if (email === "") {
        mostrarError(emailInput, emailError, "El correo es obligatorio");
        return false;
    }
    
    const dominioValido = DOMINIOS_PERMITIDOS.some(d => email.endsWith(d));
    if (!dominioValido) {
        mostrarError(emailInput, emailError, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
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
    
    if (pass.length < 4 || pass.length > 10) {
        mostrarError(passwordInput, passwordError, "Entre 4 y 10 caracteres");
        return false;
    }
    
    mostrarExito(passwordInput, passwordError);
    return true;
}

function validarFormulario() {
    submitBtn.disabled = !(validarEmail() && validarPassword());
    return validarEmail() && validarPassword();
}

emailInput.addEventListener("input", validarFormulario);
passwordInput.addEventListener("input", validarFormulario);

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (validarFormulario()) {
        const emailBuscado = emailInput.value.trim().toLowerCase();
        const passwordBuscada = passwordInput.value;
        
        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(u => u.correo === emailBuscado);
        
        if (!usuarioEncontrado) {
            mostrarError(emailInput, emailError, "❌ Usuario no registrado. Regístrate primero.");
            return;
        }
        
        if (usuarioEncontrado.password !== passwordBuscada) {
            mostrarError(passwordInput, passwordError, "❌ Contraseña incorrecta.");
            return;
        }
        
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
        window.location.href = "../inicio/PokeComelones.html";
    }
});