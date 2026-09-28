document.addEventListener("DOMContentLoaded", function() {
    const blogs = JSON.parse(localStorage.getItem('blogs'))
    const params = new URLSearchParams(window.location.search);
    const idBlog = parseInt(params.get('id'));

    const blog = blogs.find(b => b.id === idBlog);

    const contenedor = document.getElementById("blog-detalle");

    if (!blog) {
        contenedor.innerHTML = `
            <h2 style="color: #8B4513;">Blog no encontrado</h2>
            <a href="../blogs/blogs.html" class="btn-volver">← Volver al blog</a>
        `;
        return;
    }

    contenedor.innerHTML = `
        <div class="blog-detalle-imagen">
            <img src="${blog.imagen}" alt="${blog.titulo}" onerror="this.src='https://via.placeholder.com/800x400?text=Sin+Imagen'">
        </div>
        <div class="blog-detalle-contenido">
            <h1 class="blog-detalle-titulo">${blog.titulo}</h1>
            <p class="blog-detalle-descripcion">${blog.descripcionLarga}</p>
            <a href="../blogs/blogs.html" class="btn-volver">← Volver al blog</a>
        </div>
    `;

    const blogEl = document.getElementById('detalle-imagen');
    if(blogEl){
        blogEl.src = blog.imagen;
        bloEl.alt = blog.nombre;
        blogEl.onerror = function(){
            this.src ='https://via.placeholder.com/280x200?text=Sin+Imagen';
        }
    }
    document.getElementById('detalle-imagen').src = blog.imagen;
    document.getElementById('detalle-nombre').textContent = blog.titulo;
    document.getElementById('detalle-descripcion').textContent = blog.descripcionLarga;

});