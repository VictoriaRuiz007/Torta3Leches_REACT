function verificarAccesoAdmin() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado || usuarioLogueado.rol !== 'administrador') {
        alert('Acceso restringido. Debes iniciar sesión como administrador.');
        window.location.href = '../iniciar_sesion/iniciarSesion.html';
        return false;
    }
    return true;
}

function obtenerProductos() {
    const productos = localStorage.getItem('productos');
    if (productos) {
        return JSON.parse(productos);
    } else {
        const defaultProductos = [
            {
                id: 1,
                codigo: "BER01",
                nombre: "Berlín de Crema Pastelera",
                descripcion: "Delicioso berlín relleno de crema pastelera y cubierto con azúcar flor.",
                precio: 1000,
                stock: 50,
                stockCritico: 10,
                categoria: "Panes Dulces",
                imagen: "../imagenes/berlines-horneados-receta-lo-mismo-pero-sano.jpg"
            },
            {
                id: 2,
                codigo: "TOR01",
                nombre: "Torta de Chocolate",
                descripcion: "Torta húmeda de chocolate con ganache y frutos rojos.",
                precio: 15000,
                stock: 5,
                stockCritico: 2,
                categoria: "Tortas",
                imagen: "../imagenes/torta-chocolate.jpg"
            },
        ];
        localStorage.setItem('productos', JSON.stringify(defaultProductos));
        return defaultProductos;
    }
}

function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerUsuarios() {
    const usuarios = localStorage.getItem('usuariosRegistrados');
    return usuarios ? JSON.parse(usuarios) : [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
}

function generarNuevoId(array) {
    if (array.length === 0) return 1;
    const maxId = Math.max(...array.map(item => item.id));
    return maxId + 1;
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

function validarRun(run) {
    const runLimpio = run.trim();
    if (runLimpio === '') return { valido: false, mensaje: 'El RUN es obligatorio' };
    if (runLimpio.includes('.') || runLimpio.includes('-')) {
        return { valido: false, mensaje: 'No debe contener puntos ni guion' };
    }
    if (runLimpio.length < 7 || runLimpio.length > 9) {
        return { valido: false, mensaje: 'Debe tener entre 7 y 9 caracteres' };
    }
    const ultimo = runLimpio.charAt(runLimpio.length - 1).toUpperCase();
    if (!/^[0-9K]$/.test(ultimo)) {
        return { valido: false, mensaje: 'El último carácter debe ser número o K' };
    }
    return { valido: true };
}

function validarEmail(email) {
    const emailLimpio = email.trim().toLowerCase();
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    if (emailLimpio === '') return { valido: false, mensaje: 'El correo es obligatorio' };
    if (emailLimpio.length > 100) return { valido: false, mensaje: 'Máximo 100 caracteres' };
    if (!dominiosPermitidos.some(d => emailLimpio.endsWith(d))) {
        return { valido: false, mensaje: 'Solo @duoc.cl, @profesor.duoc.cl o @gmail.com' };
    }
    return { valido: true };
}

function validarPassword(pass) {
    if (pass === '') return { valido: false, mensaje: 'La contraseña es obligatoria' };
    if (pass.length < 4 || pass.length > 10) {
        return { valido: false, mensaje: 'Entre 4 y 10 caracteres' };
    }
    return { valido: true };
}

function logout() {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = '../iniciar_sesion/iniciarSesion.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
             const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
            const linkUsuarios = document.getElementById('linkUsuarios');

             if (usuarioLogueado && usuarioLogueado.rol === 'vendedor') {
             if (linkUsuarios) linkUsuarios.style.display = 'none';
    }
        });
    }
});

function validarRUT(run) {
    const rutLimpio = run.trim().replace(/[.-]/g, '');
    if (!/^[0-9]+[0-9Kk]$/.test(rutLimpio)) {
        return { valido: false, mensaje: 'Formato inválido (ej: 12345678K)' };
    }
    const cuerpo = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = (multiplo + 1) % 8 || 2;
    }
    const dvCalculado = 11 - (suma % 11);
    let dvCalculadoStr = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString();

    if (dvIngresado !== dvCalculadoStr) {
        return { valido: false, mensaje: `Dígito verificador incorrecto (debe ser ${dvCalculadoStr})` };
    }
    return { valido: true };
}

function validarRun() {
    const run = runInput.value.trim();
    if (run === '') {
        mostrarError(runInput, runError, 'El RUN es obligatorio');
        return false;
    }
    const result = validarRUT(run);
    if (!result.valido) {
        mostrarError(runInput, runError, result.mensaje);
        return false;
    }
    const usuarios = obtenerUsuarios();
    const duplicado = usuarios.find(u => u.run === runInput.value.trim());
    if (duplicado) {
        mostrarError(runInput, runError, 'Este RUN ya está registrado');
        return false;
    }
    mostrarExito(runInput, runError);
    return true;
}