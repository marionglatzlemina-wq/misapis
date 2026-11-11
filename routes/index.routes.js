import { Router } from 'express';

import ejemplo from './ejemplo.routes.js';
import producto from './producto.routes.js';

const indexRoutes = Router();

// Rutas de ejemplos
indexRoutes.use('/ejemplo', ejemplo);

// Rutas de productos de Novedades Mary
indexRoutes.use('/productos', producto);

export default indexRoutes;