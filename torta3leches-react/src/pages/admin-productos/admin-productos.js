document.addEventListener('DOMContentLoaded', function() {
    if (!verificarAccesoAdmin()) return;

    const tabla = document.getElementById('tablaProductos');
    const formContainer = document.getElementById('formProductoContainer');
    const form = document.getElementById('formProducto');
    const tituloForm = document.getElementById('formProductoTitulo');
    const btnNuevo = document.getElementById('btnNuevoProducto');
    const btnCancelar = document.getElementById('cancelarProductoBtn');
    const submitBtn = document.getElementById('submitProductoBtn');

    const codigoInput = document.getElementById('codigo');
    const nombreInput = document.getElementById('nombreProducto');
    const descripcionInput = document.getElementById('descripcion');
    const precioInput = document.getElementById('precio');
    const stockInput = document.getElementById('stock');
    const stockCriticoInput = document.getElementById('stockCritico');
    const categoriaInput = document.getElementById('categoria');
    const imagenInput = document.getElementById('imagen');

    const codigoError = document.getElementById('codigoError');
    const nombreError = document.getElementById('nombreProductoError');
    const descripcionError = document.getElementById('descripcionError');
    const precioError = document.getElementById('precioError');
    const stockError = document.getElementById('stockError');
    const stockCriticoError = document.getElementById('stockCriticoError');
    const categoriaError = document.getElementById('categoriaError');
    const imagenError = document.getElementById('imagenError');

    let productos = obtenerProductos();
    let editandoId = null;

    function renderizarTabla() {
        tabla.innerHTML = '';
        if (productos.length === 0) {
            tabla.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay productos registrados</td></tr>';
            return;
        }
        productos.forEach(prod => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${prod.codigo}</td>
                <td>${prod.nombre}</td>
                <td>$${prod.precio.toLocaleString('es-CL')}</td>
                <td>${prod.stock}</td>
                <td>${prod.categoria}</td>
                <td>
                    <button class="btn-accion btn-editar" data-id="${prod.id}">✏️ Editar</button>
                    <button class="btn-accion btn-eliminar" data-id="${prod.id}">🗑️ Eliminar</button>
                </td>
            `;
            tabla.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                editarProducto(id);
            });
        });
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                if (confirm('¿Eliminar este producto?')) {
                    eliminarProducto(id);
                }
            });
        });
    }

    function mostrarFormulario(editar = false, producto = null) {
        formContainer.style.display = 'block';
        if (editar && producto) {
            tituloForm.textContent = 'Editar Producto';
            codigoInput.value = producto.codigo;
            nombreInput.value = producto.nombre;
            descripcionInput.value = producto.descripcion || '';
            precioInput.value = producto.precio;
            stockInput.value = producto.stock;
            stockCriticoInput.value = producto.stockCritico || '';
            categoriaInput.value = producto.categoria;
            imagenInput.value = producto.imagen || '';
            editandoId = producto.id;
        } else {
            tituloForm.textContent = 'Nuevo Producto';
            form.reset();
            editandoId = null;
        }
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.querySelectorAll('.invalido').forEach(el => el.classList.remove('invalido'));
        document.querySelectorAll('.valido').forEach(el => el.classList.remove('valido'));
        submitBtn.disabled = true;
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function ocultarFormulario() {
        formContainer.style.display = 'none';
        editandoId = null;
    }

    function validarCodigo() {
        const val = codigoInput.value.trim();
        if (val === '') {
            mostrarError(codigoInput, codigoError, 'El código es obligatorio');
            return false;
        }
        if (val.length < 3) {
            mostrarError(codigoInput, codigoError, 'Mínimo 3 caracteres');
            return false;
        }
        const duplicado = productos.find(p => p.codigo === val && p.id !== editandoId);
        if (duplicado) {
            mostrarError(codigoInput, codigoError, 'Código ya existe');
            return false;
        }
        mostrarExito(codigoInput, codigoError);
        return true;
    }

    function validarNombreProducto() {
        const val = nombreInput.value.trim();
        if (val === '') {
            mostrarError(nombreInput, nombreError, 'El nombre es obligatorio');
            return false;
        }
        if (val.length > 100) {
            mostrarError(nombreInput, nombreError, 'Máximo 100 caracteres');
            return false;
        }
        mostrarExito(nombreInput, nombreError);
        return true;
    }

    function validarDescripcion() {
        const val = descripcionInput.value.trim();
        if (val.length > 500) {
            mostrarError(descripcionInput, descripcionError, 'Máximo 500 caracteres');
            return false;
        }
        mostrarExito(descripcionInput, descripcionError);
        return true;
    }

    function validarPrecio() {
        const val = parseFloat(precioInput.value);
        if (isNaN(val) || val < 0) {
            mostrarError(precioInput, precioError, 'Debe ser número >= 0');
            return false;
        }
        mostrarExito(precioInput, precioError);
        return true;
    }

    function validarStock() {
        const val = parseInt(stockInput.value);
        if (isNaN(val) || val < 0 || !Number.isInteger(val)) {
            mostrarError(stockInput, stockError, 'Debe ser entero >= 0');
            return false;
        }
        mostrarExito(stockInput, stockError);
        return true;
    }

    function validarStockCritico() {
        const val = stockCriticoInput.value.trim();
        if (val === '') {
            mostrarExito(stockCriticoInput, stockCriticoError);
            return true;
        }
        const num = parseInt(val);
        if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
            mostrarError(stockCriticoInput, stockCriticoError, 'Debe ser entero >= 0');
            return false;
        }
        mostrarExito(stockCriticoInput, stockCriticoError);
        return true;
    }

    function validarCategoria() {
        const val = categoriaInput.value;
        if (val === '') {
            mostrarError(categoriaInput, categoriaError, 'Selecciona una categoría');
            return false;
        }
        mostrarExito(categoriaInput, categoriaError);
        return true;
    }

    function validarImagen() {
        const val = imagenInput.value.trim();
        if (val.length > 500) {
            mostrarError(imagenInput, imagenError, 'Máximo 500 caracteres');
            return false;
        }
        mostrarExito(imagenInput, imagenError);
        return true;
    }

    function validarFormularioProducto() {
        const valCodigo = validarCodigo();
        const valNombre = validarNombreProducto();
        const valDesc = validarDescripcion();
        const valPrecio = validarPrecio();
        const valStock = validarStock();
        const valStockCrit = validarStockCritico();
        const valCategoria = validarCategoria();
        const valImagen = validarImagen();

        const todoOk = valCodigo && valNombre && valDesc && valPrecio && valStock && valStockCrit && valCategoria && valImagen;
        submitBtn.disabled = !todoOk;
        return todoOk;
    }

    codigoInput.addEventListener('input', validarFormularioProducto);
    nombreInput.addEventListener('input', validarFormularioProducto);
    descripcionInput.addEventListener('input', validarFormularioProducto);
    precioInput.addEventListener('input', validarFormularioProducto);
    stockInput.addEventListener('input', validarFormularioProducto);
    stockCriticoInput.addEventListener('input', validarFormularioProducto);
    categoriaInput.addEventListener('change', validarFormularioProducto);
    imagenInput.addEventListener('input', validarFormularioProducto);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validarFormularioProducto()) return;

        const nuevoProducto = {
            id: editandoId || generarNuevoId(productos),
            codigo: codigoInput.value.trim(),
            nombre: nombreInput.value.trim(),
            descripcion: descripcionInput.value.trim(),
            precio: parseFloat(precioInput.value),
            stock: parseInt(stockInput.value),
            stockCritico: stockCriticoInput.value.trim() === '' ? null : parseInt(stockCriticoInput.value),
            categoria: categoriaInput.value,
            imagen: imagenInput.value.trim() || '../imagenes/default.jpg'
        };

        if (editandoId) {
            const index = productos.findIndex(p => p.id === editandoId);
            if (index !== -1) {
                productos[index] = nuevoProducto;
            }
        } else {
            productos.push(nuevoProducto);
        }

        guardarProductos(productos);
        renderizarTabla();
        ocultarFormulario();
        alert('Producto guardado exitosamente.');
    });

    function editarProducto(id) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            mostrarFormulario(true, producto);
        }
    }

    function eliminarProducto(id) {
        productos = productos.filter(p => p.id !== id);
        guardarProductos(productos);
        renderizarTabla();
    }

    btnNuevo.addEventListener('click', function() {
        mostrarFormulario(false);
    });

    btnCancelar.addEventListener('click', ocultarFormulario);

    renderizarTabla();
});