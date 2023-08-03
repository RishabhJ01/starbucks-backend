import {Router} from "express";
import {register} from "../../controllers/authController"

const router = Router();

// auth routes
router.post('/register', register);

export default router;