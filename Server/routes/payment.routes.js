const express = require("express");
const router = express.Router();
const {
	capturePayment,
	verifySignature,
} = require("../controllers/payments.controller");
const { auth, isStudent } = require("../middlewares/auth.middlewares");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifySignature);
// router.post("/sendPaymentSuccessEmail", authN, isStudent, sendPaymentSuccessEmail);

module.exports = router;

module.exports = router;
