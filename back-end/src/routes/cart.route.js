import Router from 'express';
import { createCart, deleteCart, deleteManyCart, getCart } from '../controllers/cart.controller.js';
import {protectedRoute} from '../middlewares/procted.js';

const router = Router();


router.use(protectedRoute);

router.post('/',createCart);
router.get('/',getCart);
router.delete('/',deleteManyCart);
router.delete('/:id',deleteCart);



export default router;


