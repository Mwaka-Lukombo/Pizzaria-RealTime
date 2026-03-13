import { Router } from "express";

import authRoutes from './auth.route.js';
import productRoutes from './product.route.js'
import adminRoute from './admin.route.js';
import orderRoute from './order.route.js'
import cartRoute from './cart.route.js';

const router = Router();




router.use('/api/auth',authRoutes);
router.use('/api/product',productRoutes);
router.use('/api/order',orderRoute);
router.use('/api/cart',cartRoute);
router.use('/api/admin',adminRoute);

export default router;
