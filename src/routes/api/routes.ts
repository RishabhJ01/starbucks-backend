import {Router} from "express";
import {register, login} from "../../controllers/authController";
import {getUserDetails} from "../../controllers/userController";
import {handleJwt} from "../../middlewares/jwtHandler"

const router = Router();

// auth routes
router.post('/register', register);
router.post('/login', login);

//user routes
router.get('/getuserdetails', handleJwt, getUserDetails)

export default router;