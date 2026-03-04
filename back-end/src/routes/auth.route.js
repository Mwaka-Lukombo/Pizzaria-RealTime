import { Router } from "express";
import {protectedRoute, verifyAdmin, verifyKitchen} from '../middlewares/procted.js';
import { check, login, logout, sign, verifyDashbord } from "../controllers/auth.controller.js";


const router = Router();


router.post('/sign',sign);
router.post('/login',login);
router.post('/logout',logout);
router.get('/check',protectedRoute,check);

router.get('/verifyAdmin',protectedRoute,verifyAdmin,verifyDashbord);
router.get('/verifyKitchen',protectedRoute,verifyKitchen,verifyDashbord);


export default router;






