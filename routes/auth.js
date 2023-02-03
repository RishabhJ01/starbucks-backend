const router = require('express').Router();

const {registerUser, loginUser} = require('../controllers/authController.js')

router.post("/signup",registerUser);

router.post("/login", loginUser);

module.exports = router;