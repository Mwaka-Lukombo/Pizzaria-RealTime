import Router from 'express'
import {  acceptOrder, createOder, finishOrder, getOrders, getSingleOrder, paidOrder } from '../controllers/order.controller.js';
import { protectedRoute } from '../middlewares/procted.js';


const router = Router();




router.use(protectedRoute);

router.post('/',createOder);
router.get('/',getOrders);
router.get('/Single',getSingleOrder);
router.patch(`/finish/:id`,finishOrder)
router.patch('/:id',acceptOrder);
router.patch('/payment/:id',paidOrder);





export default router;


