document.addEventListener("DOMContentLoaded", function() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get('id'));

    const producto = productos.find(p => p.id === idProducto);

    if (!producto) {
        const contenedor = document.querySelector('.detalle-container')|| document.body;
        contenedor.innerHTML = `    
            <h2 style="color: #8B4513;">Producto no encontrado</h2>
            <a href="PokeComelones.html" class="btn-volver">Volver al inicio</a>
        `;
        return;
    }

    const imgEl = document.getElementById('detalle-imagen');
    if(imgEl){
        imgEl.src = producto.imagen;
        imgEl.alt = producto.nombre;
        imgEl.onerror = function(){
            this.src ='https://via.placeholder.com/280x200?text=Sin+Imagen';
        }
    }

    document.getElementById('detalle-imagen').src = producto.imagen;
    document.getElementById('detalle-imagen').alt = producto.nombre;
    document.getElementById('detalle-nombre').textContent = producto.nombre;
    document.getElementById('detalle-precio').textContent = '$' + producto.precio.toLocaleString('es-CL');
    document.getElementById('detalle-descripcion').textContent = producto.descripcion;
    document.getElementById('detalle-categoria').textContent = producto.categoria;
    document.getElementById('detalle-stock').textContent = producto.stock;

    const btnAgregar = document.getElementById('btn-agregar-carrito');
    
    btnAgregar.addEventListener('click', function() {
        agregarAlCarrito(producto.id);
        
        const textoOriginal = btnAgregar.textContent;
        btnAgregar.textContent = "✅ ¡Añadido!";
        btnAgregar.style.backgroundColor = "#4CAF50"; 
        
        setTimeout(() => {
            btnAgregar.textContent = textoOriginal;
            btnAgregar.style.backgroundColor = "#a71c1c"; 
        }, 2000);
    });
});