import { Router } from "express";
import { protectedRoute, verifyAdmin } from "../middlewares/procted.js";
import { bestRatings, createProduct, deleteProduct, getProducts, getSingleProduct, updateRating } from "../controllers/product.controller.js";
import {createCart, getSingleCart } from '../controllers/order.controller.js'


const router = Router();


router.use(protectedRoute)
router.get('/',getProducts);
router.get('/bests',bestRatings);
router.get('/:id',getSingleProduct);
router.patch('/:id',updateRating)

//cart router
router.post('/cart',createCart);
router.get('/cart',getSingleCart)


router.use(verifyAdmin);
router.delete('/:id',deleteProduct);
router.post('/create',createProduct);




export default router;

