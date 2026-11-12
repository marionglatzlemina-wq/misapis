
import { Router } from 'express';

import ejemplo from './ejemplo.routes.js';
import producto from './producto.routes.js';
import productoExterno from './productExtern.routes.js';

const indexRoutes = Router();

// Rutas de ejemplos
indexRoutes.use('/ejemplo', ejemplo);

// Rutas de productos de Novedades Mary (MongoDB)
indexRoutes.use('/productos', producto);

// Rutas de productos externos (DummyJSON)
indexRoutes.use('/productos-externos', productoExterno);

export default indexRoutes;
