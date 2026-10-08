import React from 'react'

function Header(){
    return(
        <div>
            <header class="header">
                <div class="logo">
                    <img src={"../imagenes/Poké Comelones (1) (1).png"} alt="Logo PokéComelones" class="img-fluid"/>;
                </div>
                <div class="header-spacer"></div>
                <nav class="nav">
                    <span id="usuarioSaludo" style="color: #FFF5E1; font-weight: 600; display: none; margin-right: 10px;"></span>

                    <a href="../iniciar_sesion/iniciarSesion.html" class="btn" id="btnLogin">Iniciar Sesión</a>
                    <a href="../registro/registro.html" class="btn" id="btnRegistro">Registro</a>
                    <a href="../blogs/blogs.html" class="btn" id="btnBlogs">Blogs</a>
                    <a href="../carrito/carrito.html" class="btn">🛒 Carrito</a>

                    <a href="../admin/admin.html" class="btn" id="btnAdmin" style="display: none;">🔧 Admin</a>
                </nav>
            </header>
        </div>
    )
}

export default Header
