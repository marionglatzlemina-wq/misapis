
/* =====================================
   NOVEDADES MARY
   CONSUMO DE API REST
===================================== */

// Dirección de nuestra API
const API_URL = '/api/productos';

// Elementos HTML
const listaProductos = document.getElementById('lista-productos');
const mensaje = document.getElementById('mensaje');
const buscador = document.getElementById('buscador');
const categoria = document.getElementById('categoria');

const formulario = document.getElementById('formulario');
const formProducto = document.getElementById('form-producto');

const btnNuevo = document.getElementById('btn-nuevo');
const btnCancelar = document.getElementById('btn-cancelar');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const btnGuardar = document.getElementById('btn-guardar');

const cantidadProductos = document.getElementById('cantidad-productos');

// Variables
let todosLosProductos = [];
let idProductoEditar = null;


/* =====================================
   GET: CONSULTAR PRODUCTOS
===================================== */

async function cargarProductos() {

    mensaje.textContent = 'Cargando productos...';

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error('No se pudieron consultar los productos.');
        }

        const datos = await respuesta.json();

        todosLosProductos = Array.isArray(datos)
            ? datos
            : (datos.productos || []);

        cargarCategorias(todosLosProductos);
        filtrarProductos();

        cantidadProductos.textContent = todosLosProductos.length;

        mensaje.textContent =
            `Se encontraron ${todosLosProductos.length} productos.`;

    } catch (error) {

        console.error(error);

        mensaje.textContent = 'No fue posible cargar los productos. Verifica que el servidor esté funcionando.';

        listaProductos.replaceChildren();

        cantidadProductos.textContent = '0';

    }

}


/* =====================================
   MOSTRAR PRODUCTOS
===================================== */

function mostrarProductos(productos) {

    listaProductos.replaceChildren();

    if (productos.length === 0) {

        const vacio = document.createElement('div');
        vacio.className = 'mensaje-vacio';

        vacio.textContent = 'No se encontraron productos. Intenta otra búsqueda o registra uno nuevo.';

        listaProductos.appendChild(vacio);

        return;

    }

    productos.forEach(producto => {

        const tarjeta = document.createElement('article');
        tarjeta.className = 'producto';

        // Imagen
        const contenedorImagen = document.createElement('div');
        contenedorImagen.className = 'producto-imagen';

        if (producto.imagen) {

            const imagen = document.createElement('img');

            imagen.src = producto.imagen;
            imagen.alt = producto.nombre || 'Imagen del producto';
            imagen.loading = 'lazy';

            imagen.onerror = function () {
                this.remove();

                const icono = document.createElement('span');
                icono.className = 'imagen-sin-foto';
                icono.textContent = '📦';

                contenedorImagen.appendChild(icono);
            };

            contenedorImagen.appendChild(imagen);

        } else {

            const icono = document.createElement('span');
            icono.className = 'imagen-sin-foto';
            icono.textContent = '📦';

            contenedorImagen.appendChild(icono);

        }

        // Información
        const informacion = document.createElement('div');
        informacion.className = 'informacion';

        const categoriaTexto = document.createElement('span');
        categoriaTexto.className = 'categoria';
        categoriaTexto.textContent = producto.categoria || 'Sin categoría';

        const nombre = document.createElement('h3');
        nombre.textContent = producto.nombre || 'Producto sin nombre';

        const descripcion = document.createElement('p');
        descripcion.className = 'descripcion';
        descripcion.textContent =
            producto.descripcion || 'Sin descripción disponible.';

        const precio = document.createElement('p');
        precio.className = 'precio';
        precio.textContent =
            '$' + Number(producto.precioVenta || 0).toFixed(2);

        // Detalles
        const detalles = document.createElement('div');
        detalles.className = 'detalles-producto';

        agregarDetalle(
            detalles,
            'Stock disponible',
            producto.stock ?? 0
        );

        agregarDetalle(
            detalles,
            'Marca',
            producto.marca || 'Sin marca'
        );

        // Estado
        const filaEstado = document.createElement('div');
        filaEstado.className = 'detalle';

        const etiquetaEstado = document.createElement('span');
        etiquetaEstado.textContent = 'Estado';

        const estado = document.createElement('span');

        if (producto.activo) {

            estado.className = 'estado estado-activo';
            estado.textContent = '● Activo';

        } else {

            estado.className = 'estado estado-inactivo';
            estado.textContent = '● Inactivo';

        }

        filaEstado.append(etiquetaEstado, estado);
        detalles.appendChild(filaEstado);

        // Alerta de stock bajo
        const stockMinimo = Number(producto.stockMinimo ?? 5);
        const stockActual = Number(producto.stock ?? 0);

        if (producto.activo && stockActual <= stockMinimo) {

            const alerta = document.createElement('span');

            alerta.className = 'estado estado-stock-bajo';
            alerta.textContent = 'Stock bajo';

            detalles.appendChild(alerta);

        }

        // Acciones
        const acciones = document.createElement('div');
        acciones.className = 'acciones';

        const btnEditar = document.createElement('button');
        btnEditar.className = 'btn-editar';
        btnEditar.textContent = '✎ Editar';

        btnEditar.addEventListener('click', () => {
            editarProducto(producto);
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.textContent = 'Eliminar';

        btnEliminar.addEventListener('click', () => {
            eliminarProducto(producto._id);
        });

        acciones.append(btnEditar, btnEliminar);

        // Construir tarjeta
        informacion.append(
            categoriaTexto,
            nombre,
            descripcion,
            precio,
            detalles,
            acciones
        );

        tarjeta.append(contenedorImagen, informacion);

        listaProductos.appendChild(tarjeta);

    });

}


// Crear filas de detalles
function agregarDetalle(contenedor, etiqueta, valor) {

    const fila = document.createElement('div');
    fila.className = 'detalle';

    const nombre = document.createElement('span');
    nombre.textContent = etiqueta;

    const contenido = document.createElement('strong');
    contenido.textContent = valor;

    fila.append(nombre, contenido);

    contenedor.appendChild(fila);

}


/* =====================================
   CARGAR CATEGORÍAS
===================================== */

function cargarCategorias(productos) {

    const categoriaActual = categoria.value;

    categoria.replaceChildren();

    const opcionTodas = document.createElement('option');

    opcionTodas.value = '';
    opcionTodas.textContent = 'Todas las categorías';

    categoria.appendChild(opcionTodas);

    const categorias = [
        ...new Set(
            productos
                .map(producto => producto.categoria)
                .filter(Boolean)
        )
    ];

    categorias.sort((a, b) => a.localeCompare(b));

    categorias.forEach(nombreCategoria => {

        const opcion = document.createElement('option');

        opcion.value = nombreCategoria;
        opcion.textContent = nombreCategoria;

        categoria.appendChild(opcion);

    });

    categoria.value = categorias.includes(categoriaActual)
        ? categoriaActual
        : '';

}


/* =====================================
   BUSCADOR Y FILTROS
===================================== */

function filtrarProductos() {

    const texto = buscador.value.trim().toLowerCase();

    const categoriaSeleccionada = categoria.value;

    const productosFiltrados = todosLosProductos.filter(producto => {

        const nombre = (producto.nombre || '').toLowerCase();
        const marca = (producto.marca || '').toLowerCase();
        const descripcion = (producto.descripcion || '').toLowerCase();

        const coincideTexto =
            nombre.includes(texto) ||
            marca.includes(texto) ||
            descripcion.includes(texto);

        const coincideCategoria =
            !categoriaSeleccionada ||
            producto.categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;

    });

    mostrarProductos(productosFiltrados);

}

buscador.addEventListener('input', filtrarProductos);

categoria.addEventListener('change', filtrarProductos);


/* =====================================
   ABRIR MODAL
===================================== */

function abrirFormulario() {

    formulario.classList.add('mostrar');

    formulario.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    document.getElementById('nombre').focus();

}


// Registrar nuevo producto
btnNuevo.addEventListener('click', () => {

    idProductoEditar = null;

    formProducto.reset();

    document.getElementById('titulo-formulario').textContent =
        'Registrar producto';

    btnGuardar.textContent = 'Guardar producto';

    document.getElementById('stockMinimo').value = 5;

    document.getElementById('activo').value = 'true';

    abrirFormulario();

});


/* =====================================
   CERRAR MODAL
===================================== */

function cerrarFormulario() {

    formulario.classList.remove('mostrar');

    formulario.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    formProducto.reset();

    idProductoEditar = null;

    btnGuardar.disabled = false;

    btnGuardar.textContent = 'Guardar producto';

}


// Botón cancelar
btnCancelar.addEventListener('click', cerrarFormulario);

// Botón X
btnCerrarModal.addEventListener('click', cerrarFormulario);

// Clic fuera de la ventana
formulario.addEventListener('click', (event) => {

    if (event.target === formulario) {
        cerrarFormulario();
    }

});

// Tecla Escape
document.addEventListener('keydown', (event) => {

    if (
        event.key === 'Escape' &&
        formulario.classList.contains('mostrar')
    ) {
        cerrarFormulario();
    }

});


/* =====================================
   POST Y PUT: GUARDAR PRODUCTO
===================================== */

formProducto.addEventListener('submit', async (event) => {

    event.preventDefault();

    const producto = {

        nombre: document.getElementById('nombre').value.trim(),

        categoria: document.getElementById('categoria-producto').value.trim(),

        precioVenta: Number(
            document.getElementById('precioVenta').value
        ),

        stock: Number(
            document.getElementById('stock').value
        ),

        marca: document.getElementById('marca').value.trim() || 'Sin marca',

        descripcion: document.getElementById('descripcion').value.trim(),

        stockMinimo: Number(
            document.getElementById('stockMinimo').value
        ),

        activo: document.getElementById('activo').value === 'true',

        imagen: document.getElementById('imagen').value.trim() || null

    };

    // Evitar envíos repetidos
    btnGuardar.disabled = true;
    btnGuardar.textContent = 'Guardando...';

    try {

        let respuesta;

        if (idProductoEditar) {

            // PUT: Actualizar producto
            respuesta = await fetch(`${API_URL}/${idProductoEditar}`, {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(producto)

            });

        } else {

            // POST: Registrar producto
            respuesta = await fetch(API_URL, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(producto)

            });

        }

        const resultado = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                resultado.error ||
                resultado.mensaje ||
                'No se pudo guardar el producto.'
            );

        }

        const operacion = idProductoEditar
            ? 'Producto actualizado correctamente.'
            : 'Producto registrado correctamente.';

        alert(resultado.mensaje || operacion);

        cerrarFormulario();

        await cargarProductos();

    } catch (error) {

        console.error(error);

        alert('Error: ' + error.message);

    } finally {

        btnGuardar.disabled = false;

        btnGuardar.textContent = idProductoEditar
            ? 'Actualizar producto'
            : 'Guardar producto';

    }

});


/* =====================================
   PREPARAR EDICIÓN DE PRODUCTO
===================================== */

function editarProducto(producto) {

    idProductoEditar = producto._id;

    document.getElementById('titulo-formulario').textContent =
        'Editar producto';

    btnGuardar.textContent = 'Actualizar producto';

    document.getElementById('nombre').value =
        producto.nombre || '';

    document.getElementById('categoria-producto').value =
        producto.categoria || '';

    document.getElementById('precioVenta').value =
        producto.precioVenta ?? 0;

    document.getElementById('stock').value =
        producto.stock ?? 0;

    document.getElementById('marca').value =
        producto.marca || '';

    document.getElementById('descripcion').value =
        producto.descripcion || '';

    document.getElementById('stockMinimo').value =
        producto.stockMinimo ?? 5;

    document.getElementById('activo').value =
        String(producto.activo);

    document.getElementById('imagen').value =
        producto.imagen || '';

    abrirFormulario();

}


/* =====================================
   DELETE: ELIMINAR PRODUCTO
===================================== */

async function eliminarProducto(id) {

    const confirmar = confirm(
        '¿Estás seguro de que deseas eliminar este producto?'
    );

    if (!confirmar) {
        return;
    }

    try {

        const respuesta = await fetch(`${API_URL}/${id}`, {

            method: 'DELETE'

        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                resultado.error ||
                resultado.mensaje ||
                'No se pudo eliminar el producto.'
            );

        }

        alert(
            resultado.mensaje ||
            'Producto eliminado correctamente.'
        );

        await cargarProductos();

    } catch (error) {

        console.error(error);

        alert('Error: ' + error.message);

    }

}


/* =====================================
   INICIAR APLICACIÓN
===================================== */

cargarProductos();
