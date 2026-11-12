
import {
    obtenerProductosExternos,
    obtenerProductoExternoPorId,
    obtenerProductosPorCategoria,
    buscarProductosExternos
} from '../services/productExtern.service.js';

// Obtener todos los productos externos
export const getAllProductosExternos = async (req, res) => {
    try {
        const productos = await obtenerProductosExternos();

        res.status(200).json({
            mensaje: 'Productos externos obtenidos correctamente',
            productos: productos.products,
            total: productos.total
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos externos',
            error: error.message
        });
    }
};

// Obtener un producto externo por ID
export const getProductoExternoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await obtenerProductoExternoPorId(id);

        res.status(200).json({
            mensaje: 'Producto externo encontrado',
            producto
        });

    } catch (error) {
        res.status(404).json({
            mensaje: 'No se pudo encontrar el producto externo',
            error: error.message
        });
    }
};

// Obtener productos por categoría
export const getProductosExternosPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        const resultado = await obtenerProductosPorCategoria(categoria);

        res.status(200).json({
            mensaje: 'Productos de la categoría obtenidos correctamente',
            categoria,
            productos: resultado.products,
            total: resultado.total
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar la categoría',
            error: error.message
        });
    }
};

// Buscar productos por nombre
export const searchProductosExternos = async (req, res) => {
    try {
        const { nombre } = req.query;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'Debes proporcionar un nombre para buscar'
            });
        }

        const resultado = await buscarProductosExternos(nombre);

        res.status(200).json({
            mensaje: 'Búsqueda realizada correctamente',
            productos: resultado.products,
            total: resultado.total
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar productos externos',
            error: error.message
        });
    }
};
