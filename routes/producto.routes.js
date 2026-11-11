import { Router } from 'express';

import {
    getAllProductos,
    getProductoById,
    postProducto,
    putProducto,
    deleteProducto
} from '../controllers/producto.controller.js';

const producto = Router();

// Obtener todos los productos
producto.get('/', getAllProductos);

// Obtener un producto por ID
producto.get('/:id', getProductoById);

// Registrar un producto
producto.post('/', postProducto);

// Actualizar un producto
producto.put('/:id', putProducto);

// Eliminar un producto
producto.delete('/:id', deleteProducto);

export default producto;