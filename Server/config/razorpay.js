const Razorpay = require('razorpay')

exports.razorpay = new Razorpay({
   key_id:process.env.RAZORPAY_KEY ,
   key_secret:process.env.RAZORPAY_SECRET,
})