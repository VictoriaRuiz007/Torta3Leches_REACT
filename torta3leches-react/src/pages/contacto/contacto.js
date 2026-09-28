const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const comentarioInput = document.getElementById("comentario");
const submitBtn = document.getElementById("submitBtn");
const contactoForm = document.getElementById("contactoForm");

const nombreError = document.getElementById("nombreError");
const emailError = document.getElementById("emailError");
const comentarioError = document.getElementById("comentarioError");

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function validarNombre() {
    const nombre = nombreInput.value.trim();
    
    if (nombre === "") {
        mostrarError(nombreInput, nombreError, "El nombre es obligatorio");
        return false;
    }
    
    if (nombre.length > 100) {
        mostrarError(nombreInput, nombreError, "El nombre no puede superar los 100 caracteres");
        return false;
    }
    
    mostrarExito(nombreInput, nombreError);
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
    
    mostrarExito(emailInput, emailError);
    return true;
}

function validarComentario() {
    const comentario = comentarioInput.value.trim();
    
    if (comentario === "") {
        mostrarError(comentarioInput, comentarioError, "El comentario es obligatorio");
        return false;
    }
    
    if (comentario.length > 500) {
        mostrarError(comentarioInput, comentarioError, "El comentario no puede superar los 500 caracteres");
        return false;
    }
    
    mostrarExito(comentarioInput, comentarioError);
    return true;
}

function validarFormulario() {
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const comentarioValido = validarComentario();
    
    submitBtn.disabled = !(nombreValido && emailValido && comentarioValido);
    return nombreValido && emailValido && comentarioValido;
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

nombreInput.addEventListener("input", validarFormulario);
emailInput.addEventListener("input", validarFormulario);
comentarioInput.addEventListener("input", validarFormulario);

contactoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (validarFormulario()) {
        const mensaje = {
            nombre: nombreInput.value.trim(),
            correo: emailInput.value.trim().toLowerCase(),
            comentario: comentarioInput.value.trim(),
            fecha: new Date().toISOString()
        };
        
        let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
        mensajes.push(mensaje);
        localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));
        
        alert("✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.");
        
        nombreInput.value = "";
        emailInput.value = "";
        comentarioInput.value = "";
        nombreInput.classList.remove("valido");
        emailInput.classList.remove("valido");
        comentarioInput.classList.remove("valido");
        submitBtn.disabled = true;
    }
});