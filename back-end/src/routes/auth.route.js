import { Router } from "express";
import {protectedRoute, verifyAdmin} from '../middlewares/procted.js';
import { check, login, logout, sign, verifyDashbord } from "../controllers/auth.controller.js";


const router = Router();


router.post('/sign',sign);
router.post('/login',login);
router.post('/logout',logout);
router.get('/check',protectedRoute,check);

router.use(protectedRoute,verifyAdmin);
router.get('/verifyAdmin',verifyDashbord)


export default router;






