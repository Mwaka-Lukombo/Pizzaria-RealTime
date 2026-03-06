import Router from 'express';
import { deleteUser, getAllProducts, getAllStats, getAllUsers } from '../controllers/admin.controller.js';
import { protectedRoute, verifyAdmin } from '../middlewares/procted.js';



const router = Router();

router.use(protectedRoute);

router.get('/stats',verifyAdmin,getAllStats);
router.get('/users',verifyAdmin,getAllUsers);
router.get('/products',verifyAdmin,getAllProducts);
router.delete('/user/:id',verifyAdmin,deleteUser);


export default router;