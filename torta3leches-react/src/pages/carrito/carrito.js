function renderizarCarrito() {
    const cuerpoTabla = document.getElementById("cuerpo-tabla");
    const totalSpan = document.getElementById("total-carrito");
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    cuerpoTabla.innerHTML = "";
    let totalGeneral = 0;

    if (carrito.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: #5D4037;">Tu carrito está vacío 🍰</td></tr>`;
        totalSpan.textContent = "$0";
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td style="color: #5D4037; font-weight: 600;">${item.nombre}</td>
            <td style="color: #5D4037;">$${item.precio.toLocaleString('es-CL')}</td>
            <td style="color: #5D4037;">
                <button onclick="cambiarCantidad(${index}, -1)" style="padding: 2px 8px; border-radius: 50%; border: 1px solid #a71c1c; background: white; cursor: pointer;">-</button>
                ${item.cantidad}
                <button onclick="cambiarCantidad(${index}, 1)" style="padding: 2px 8px; border-radius: 50%; border: 1px solid #a71c1c; background: white; cursor: pointer;">+</button>
            </td>
            <td style="color: #8B4513; font-weight: 700;">$${subtotal.toLocaleString('es-CL')}</td>
            <td>
                <button onclick="eliminarProducto(${index})" style="background: #a71c1c; color: white; border: none; padding: 5px 10px; border-radius: 15px; cursor: pointer;">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    totalSpan.textContent = "$" + totalGeneral.toLocaleString('es-CL');
}

function cambiarCantidad(index, delta) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad += delta;
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        renderizarCarrito();
    }
}

function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. ¡Agrega productos primero!");
        return;
    }
    alert("¡Gracias por tu compra! 🍰\nTu pedido ha sido procesado.");
    localStorage.removeItem("carrito");
    renderizarCarrito();
    window.location.href = "../PokeComelones.html";
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", renderizarCarrito);