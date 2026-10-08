import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from './pages/inicio/inicio'
import Admin from './pages/admin/admin'
import AdminProductos from './pages/admin-productos/admin-productos'
import AdminUsuarios from './pages/admin-usuarios/admin-usuarios'
import Blogs from './pages/blogs/blogs'
import BlogsDetalles from './pages/blogs-detalles/blogs-detalles'
import Carrito from './pages/carrito/carrito'
import Contacto from './pages/contacto/contacto'
import DetalleProducto from './pages/detalle-producto/detalle-producto'
import IniciarSesion from './pages/iniciar-sesion/iniciar-sesion'
import Nosotros from './pages/nosotros/nosotros'
import Registro from './pages/registro/registro'
import Header from './components/Header'
import Footer from './components/Footer'


export default function App() {
  return (
    <>
    <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Inicio/>}/>
          <Route path='/admin' element = {<Admin/>}/>
          <Route path='/admin-productos' element = {<AdminProductos/>}/>
          <Route path='/admin-usuarios' element = {<AdminUsuarios/>}/>
          <Route path='/blogs' element = {<Blogs/>}/>
          <Route path='/blogs-detalles' element = {<BlogsDetalles/>}/>
          <Route path='/carrito' element = {<Carrito/>}/>
          <Route path='/contacto' element = {<Contacto/>}/>
          <Route path='/detalle-productos' element = {<DetalleProducto/>}/>
          <Route path='/iniciar-sesion' element = {<IniciarSesion/>}/>
          <Route path='/nosotros' element = {<Nosotros/>}/>
          <Route path='/registro' element = {<Registro/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

