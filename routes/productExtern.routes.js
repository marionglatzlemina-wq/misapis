
import { Router } from 'express';

import {
    getAllProductosExternos,
    getProductoExternoById,
    getProductosExternosPorCategoria,
    searchProductosExternos
} from '../controllers/productExtern.controller.js';

const productoExterno = Router();

// Obtener todos los productos externos
productoExterno.get('/', getAllProductosExternos);

// Buscar productos por nombre
productoExterno.get('/buscar', searchProductosExternos);

// Obtener productos por categoría
productoExterno.get('/categoria/:categoria', getProductosExternosPorCategoria);

// Obtener un producto por ID
productoExterno.get('/:id', getProductoExternoById);

export default productoExterno;
