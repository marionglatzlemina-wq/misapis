
const API_URL = 'https://dummyjson.com/products';

// Obtener todos los productos externos
export const obtenerProductosExternos = async () => {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error('Error al consultar los productos externos');
    }

    return await respuesta.json();
};

// Obtener un producto por su ID
export const obtenerProductoExternoPorId = async (id) => {
    const respuesta = await fetch(`${API_URL}/${id}`);

    if (!respuesta.ok) {
        throw new Error('No se pudo encontrar el producto externo');
    }

    return await respuesta.json();
};

// Obtener productos por categoría
export const obtenerProductosPorCategoria = async (categoria) => {
    const respuesta = await fetch(
        `${API_URL}/category/${encodeURIComponent(categoria)}`
    );

    if (!respuesta.ok) {
        throw new Error('Error al consultar la categoría');
    }

    return await respuesta.json();
};

// Buscar productos por nombre
export const buscarProductosExternos = async (nombre) => {
    const respuesta = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(nombre)}`
    );

    if (!respuesta.ok) {
        throw new Error('Error al buscar productos externos');
    }

    return await respuesta.json();
};
