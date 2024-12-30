const express = require('express');
const { login, SignUp, sendOtp, changePassword } = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth.middlewares');
const { resetPasswordToken, resetPassword } = require('../controllers/resetPassword.controller');
const router = express.Router()

router.post('/login',login)
router.post('/sign-up',SignUp)
router.post('/sendOtp',sendOtp)
router.post('/changePassword',auth,changePassword)

router.post('/reset-password-token',resetPasswordToken)
router.post('/reset-password',resetPassword)

module.exports = router;