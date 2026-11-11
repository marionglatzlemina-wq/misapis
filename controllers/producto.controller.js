import mongoose from 'mongoose';
import Producto from '../models/producto.model.js';

// GET: Obtener todos los productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.find({}, { __v: 0 });

        return res.status(200).json({
            total: productos.length,
            productos
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// GET: Obtener un producto por su ID
export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                mensaje: 'El ID del producto no es válido'
            });
        }

        const producto = await Producto.findById(id, { __v: 0 });

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        return res.status(200).json(producto);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al consultar el producto',
            error: error.message
        });
    }
};

// POST: Registrar un nuevo producto
export const postProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);

        await producto.save();

        return res.status(201).json({
            mensaje: 'Producto registrado correctamente',
            producto
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                mensaje: 'Error de validación',
                error: error.message
            });
        }

        return res.status(500).json({
            mensaje: 'Error al registrar el producto',
            error: error.message
        });
    }
};

// PUT: Actualizar un producto por su ID
export const putProducto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                mensaje: 'El ID del producto no es válido'
            });
        }

        const producto = await Producto.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Producto actualizado correctamente',
            producto
        });

    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'No se pudo actualizar el producto',
                error: error.message
            });
        }

        return res.status(500).json({
            mensaje: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

// DELETE: Eliminar un producto por su ID
export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                mensaje: 'El ID del producto no es válido'
            });
        }

        const producto = await Producto.findByIdAndDelete(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Producto eliminado correctamente',
            producto
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al eliminar el producto',
            error: error.message
        });
    }
};