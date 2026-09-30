import { createBrowserRouter } from "react-router-dom";
import Admin from "./pages/admin/admin.jsx"
import AdminProductos from "./pages/admin-productos/admin-productos.jsx"
import AdminUsuarios from "./pages/admin-usuarios/admin-usuarios.jsx"
import Blogs from "./pages/blogs/blogs.jsx"
import BlogsDetalles from "./pages/blogs-detalles/blogs-detalles.jsx"
import Carrito from "./pages/carrito/carrito.jsx"
import Contacto from "./pages/contacto/contacto.jsx"
import DetalleProductos from "./pages/detalle-producto/detalle-producto.jsx"
import IniciarSesion from "./pages/iniciar-sesion/iniciar-sesion.jsx"
import Inicio from "./pages/inicio/inicio.jsx"
import Nosotros from "./pages/nosotros/nosotros.jsx"
import Registro from "./pages/registro/registro.jsx"


export const routes = createBrowserRouter([
    {
        path : '/admin',
        element: <Admin/>
    },
    {
        path: '/admin-productos',
        element: <AdminProductos/>
    },
    {
        path: '/admin-usuarios',
        element: <AdminUsuarios/>
    },
    {
        path: '/blogs',
        element: <Blogs/>
    },
    {
        path: '/blogs-detalles',
        element: <BlogsDetalles/>
    },
    {
        path: '/carrito',
        element: <Carrito/>
    },
    {
        path: '/contacto',
        element: <Contacto/>
    },
    {
        path: '/detalle-productos',
        element: <DetalleProductos/>
    },
    {
        path: '/iniciar-sesion',
        element: <IniciarSesion/>
    },
    {
        path: '/inicio',
        element: <Inicio/>
    },
    {
        path: '/nosotros',
        element: <Nosotros/>
    },
    {
        path: '/registro',
        element: <Registro/>
    }
])