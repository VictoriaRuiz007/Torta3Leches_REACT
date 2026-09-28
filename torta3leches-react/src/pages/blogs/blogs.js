const blogs = [
    {
        id: 1,
        titulo: "La historia de la torta más grande del mundo",
        descripcionCorta: "En 1995, Pastelería 1000 Sabores colaboró en la creación de la torta más grande del mundo, un récord Guinness que marcó nuestra historia.",
        descripcionLarga: "En 1995, Pastelería 1000 Sabores se unió a un equipo de reposteros para crear la torta más grande del mundo, con más de 10 toneladas de ingredientes. Fue un desafío monumental que requirió semanas de planificación y trabajo en equipo. La torta, que medía más de 100 metros de largo, fue compartida con miles de personas en una celebración comunitaria. Este evento no solo nos dio un récord Guinness, sino que también consolidó nuestra pasión por la repostería y el trabajo colaborativo. Hoy, seguimos honrando ese espíritu en cada producto que creamos.",
        imagen: "../imagenes/torta-gigante.jpg" 
    },
    {
        id: 2,
        titulo: "Consejos para decorar tortas como un profesional",
        descripcionCorta: "Aprende técnicas sencillas para decorar tus tortas y sorprender a todos con presentaciones dignas de pastelería.",
        descripcionLarga: "Decorar tortas puede parecer complicado, pero con algunos trucos puedes lograr resultados profesionales. Primero, asegúrate de que la torta esté fría antes de aplicar el frosting. Usa una espátula offset para alisar la crema y obtén bordes limpios. Para hacer diseños con manga pastelera, elige boquillas adecuadas y practica la presión. También puedes usar frutas frescas, flores comestibles o chocolate derretido para dar un toque especial. Recuerda que la práctica hace al maestro, así que no temas experimentar. En nuestros talleres, enseñamos estas técnicas a estudiantes de gastronomía, y ahora te las compartimos a ti.",
        imagen: "../imagenes/decoracion-tortas.jpg"
    },
];

function mostrarBlogs() {
    const contenedor = document.getElementById("lista-blogs");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    blogs.forEach(blog => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("blog-card");
        tarjeta.innerHTML = `
            <img src="${blog.imagen}" alt="${blog.titulo}" onerror="this.src='https://via.placeholder.com/400x250?text=Sin+Imagen'">
            <h3>${blog.titulo}</h3>
            <p>${blog.descripcionCorta}</p>
            <a href="../blogs-detalles/blog_detalle.html?id=${blog.id}" class="btn-ver-blog">Leer más</a>
        `;
        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener("DOMContentLoaded", mostrarBlogs);