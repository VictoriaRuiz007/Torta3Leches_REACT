function obtenerProductosDesdeLocalStorage() {
    const stored = localStorage.getItem('productos');
    if (stored) {
        return JSON.parse(stored);
    } else {
        const defaultProductos = [
            {
                id: 1,
                codigo: "TC001",
                nombre: "Torta Cuadrada de Chocolate",
                descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
                precio: 45000,
                stock: 50,
                stockCritico: 10,
                categoria: "Tortas Cuadradas",
                imagen: "../imagenes/torta-chocolate.jpg"
            },
            {
                id: 2,
                codigo: "TC002",
                nombre: "Torta Cuadrada de Frutas",
                descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
                precio: 50000,
                stock: 5,
                stockCritico: 10,
                categoria: "Tortas Cuadradas",
                imagen: "../imagenes/torta-frutas.jpg"
            },
            {
                id: 3,
                codigo: "TT001",
                nombre: "Torta Circular de Vainilla",
                descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
                precio: 40000,
                stock: 20,
                stockCritico: 10,
                categoria: "Tortas Circulares",
                imagen: "../imagenes/torta-vainilla.jpg"
            },
            {
                id: 4,
                codigo: "TT002",
                nombre: "Torta Circular de Manjar",
                descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
                precio: 42000,
                stock: 8,
                stockCritico: 10,
                categoria: "Tortas Circulares",
                imagen: "../imagenes/torta-manjar.webp"
            },
            {
                id: 5,
                codigo: "PI001",
                nombre: "Mousse de Chocolate",
                descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
                precio: 5000,
                stock: 20,
                stockCritico: 30,
                categoria: "Postres Individuales",
                imagen: "../imagenes/mousse-chocolate.jpg"
            },
            {
                id: 6,
                codigo: "PI002",
                nombre: "Tiramisú Clásico",
                descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
                precio: 5500,
                stock: 20,
                stockCritico: 10,
                categoria: "Postres Individuales",
                imagen: "../imagenes/tiramisu.jpg"
            },
            {
                id: 7,
                codigo: "PSA001",
                nombre: "Torta Sin Azucar de Naranja",
                descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
                precio: 48000,
                stock: 32,
                stockCritico: 3,
                categoria: "Productos Sin Azúcar",
                imagen: "../imagenes/torta-naranja.jpg"
            },
            {
                id: 8,
                codigo: "PSA002",
                nombre: "Cheesecake sin Azúcar",
                descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
                precio: 47000,
                stock: 17,
                stockCritico: 3,
                categoria: "Productos Sin Azúcar",
                imagen: "../imagenes/cheesecake.avif"
            },
            {
                id: 9,
                codigo: "PT001",
                nombre: "Empanada de Manzana",
                descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
                precio: 3000,
                stock: 13,
                stockCritico: 3,
                categoria: "Pasteleria Tradicional",
                imagen: "../imagenes/empanada-manzana.jpg"
            },
            {
                id: 10,
                codigo: "PT002",
                nombre: "Tarta de Santiago",
                descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
                precio: 6000,
                stock: 15,
                stockCritico: 3,
                categoria: "Pasteleria Tradicional",
                imagen: "../imagenes/tarta-santiago.jpg"
            },
            {
                id: 11,
                codigo: "PG001",
                nombre: "Brownie Sin Glúten",
                descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
                precio: 4000,
                stock: 40,
                stockCritico: 3,
                categoria: "Productos Sin Glúten",
                imagen: "../imagenes/brownie.jpg"
            },
            {
                id: 12,
                codigo: "PG002",
                nombre: "Pan Sin Glúten",
                descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
                precio: 3500,
                stock: 40,
                stockCritico: 3,
                categoria: "Productos Sin Glúten",
                imagen: "../imagenes/pan.jpg"
            },
            {
                id: 13,
                codigo: "PV001",
                nombre: "Torta Vegana de Chocolate",
                descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
                precio: 50000,
                stock: 7,
                stockCritico: 3,
                categoria: "Productos Vegano",
                imagen: "../imagenes/tortav-chocolate.jpg"
            },
            {
                id: 14,
                codigo: "PV002",
                nombre: "Galletas Veganas de Avena",
                descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
                precio: 4500,
                stock: 32,
                stockCritico: 3,
                categoria: "Productos Vegano",
                imagen: "../imagenes/galletav-avena.jpg"
            },
            {
                id: 15,
                codigo: "TE001",
                nombre: "Torta Especial de Cumpleaños",
                descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
                precio: 55000,
                stock: 8,
                stockCritico: 3,
                categoria: "Tortas Especiales",
                imagen: "../imagenes/torta-cumpleanios.jpg"
            },
            {
                id: 16,
                codigo: "TE002",
                nombre: "Torta Especial de Boda",
                descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
                precio: 60000,
                stock: 2,
                stockCritico: 3,
                categoria: "Tortas Especiales",
                imagen: "../imagenes/torta-boda.jpg"
            }
        ];
        localStorage.setItem('productos', JSON.stringify(defaultProductos));
        return defaultProductos;
    }
}

// Exportar para que otros archivos lo usen
window.productos = obtenerProductosDesdeLocalStorage();

// Función para mostrar productos en el home
function mostrarProductos(listaProductos = window.productos) {
    const contenedor = document.getElementById("recursos-multimedia");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";
    
    listaProductos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto");
        if (producto.stock <= producto.stockCritico) {
            tarjeta.classList.add("stock-critico");
        }
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/280x200?text=Sin+Imagen'">
            <h3>${producto.nombre}</h3>
            <small>$${producto.precio.toLocaleString('es-CL')}</small>
            <p style="font-size: 14px; color: #5D4037; margin: 5px 0;">
                📦 Stock: ${producto.stock} unidades
            </p>
            <div class="contenedor-btn">
                <button class="btnVer" onclick="verDetalle(${producto.id})">Ver</button>
                <button class="btnComprar" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

const btnsFiltros = document.querySelectorAll("#filtro-categorias .btn-filtro");

btnsFiltros.forEach(boton => { boton.addEventListener("click", (e)=>{
    btnsFiltros.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    const categoriaSeleccionada = e.target.getAttribute("data-categoria");

    if(categoriaSeleccionada === "Todos"){
        mostrarProductos(window.productos);
    }
    else{
        const filtrados = window.productos.filter(p => p.categoria === categoriaSeleccionada);
        mostrarProductos(filtrados);
    }
})})

function verDetalle(id) {
    window.location.href = "../detalle-producto/detalle_producto.html?id=" + id;
}

function agregarAlCarrito(id) {
    const productos = window.productos;
    const producto = productos.find(p => p.id === id);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✅ " + producto.nombre + " añadido al carrito");
}

document.addEventListener("DOMContentLoaded", function() {
    mostrarProductos();
});