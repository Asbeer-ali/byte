// userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/useroCntroller/usercontroller');
const userotpController = require('../controller/otpController')
// router.route('/user/signup')
//     .get
router.get('/',userController.guestUser)
router.get('/toSignup', userController.home);
router.get('/login',userController.loginPost)
router.post('/log',userController.userLogin)
router.post('/userSignup',userController.Signup)
router.get('/sendOtp',userController.sendOtp)
router.post('/otp',userController.verifyOtp)
router.get('/home',userController.tohome)
router.get('/forget-pass',userController.forgotPassword)
router.post('/forgotpassword',userController.forgotPost)
router.post('/forgototp',userController.verifyForgetOtp)
router.post('/reset_password',userController.resetPassword)




module.exports = router;