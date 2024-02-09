// userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/useroCntroller/usercontroller');
// router.route('/user/signup')
//     .get
router.get('/',userController.guestUser)
router.get('/user/toSignup', userController.home);
router.post('/user/userSignup',userController.Signup)

router.get('/user/user/sendOtp',userController.sendOtp)
  
router.post('/user/otp',userController.verifyOtp)
router.get('/user/login',userController.loginPost)
router.post('/user/log',userController.userLogin)












module.exports = router;
