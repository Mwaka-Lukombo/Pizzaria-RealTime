import Router from 'express'
import { createCart, createOder, getOrders, getSingleCart, getSingleOrder } from '../controllers/order.controller.js';
import { protectedRoute } from '../middlewares/procted.js';


const router = Router();




router.use(protectedRoute);

router.post('/',createOder);
router.get('/',getOrders);
router.get('/Single',getSingleOrder);






export default router;


