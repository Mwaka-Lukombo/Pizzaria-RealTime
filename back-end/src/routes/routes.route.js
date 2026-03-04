import { Router } from "express";

import authRoutes from './auth.route.js';
import productRoutes from './product.route.js'


const router = Router();




router.use('/api/auth',authRoutes);
router.use('/api/product',productRoutes);

export default router;
