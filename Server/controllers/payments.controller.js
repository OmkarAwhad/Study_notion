const { razorpay } = require("../config/razorpay");
const Course = require("../models/course.models");
const User = require("../models/user.models");
const { mailSender } = require("../utils/mailSender.utils");
const {
	courseEnrollmentEmail,
} = require("../mails/courseEnrollmentMail.templates");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");
const mongoose = require("mongoose");

module.exports.capturePayment = async (req, res) => {
	try {
		//get userId n courseId
		//get course details
		//validate
		//has user already paid for the same course?
		//order create
		//return res

		const userId = req.user.id;
		const { courseId } = req.body;
		if (!courseId) {
			return res.json(
				new ApiError(401, "Please provide valid course ID")
			);
		}

		let courseDetails;
		try {
			courseDetails = await Course.findById({ _id: courseId });
			if (!courseDetails) {
				return res.json(new ApiError(401, "Course not found"));
			}

			//check if student is already enrolled or not
			const uid = new mongoose.Types.ObjectId(userId);
			if (courseDetails.studentsEnrolled.includes(uid)) {
				return res.json(
					new ApiError(401, "Student is already enrolled")
				);
			}
		} catch (error) {
			console.log("Error fetching course details: ", error);
			return res.json(
				new ApiError(500, "Error fetching course details")
			);
		}

		//create order
		const amount = courseDetails.price;
		const currency = "INR";

		const options = {
			amount: amount * 100,
			currency: currency,
			receipt: Math.random(Date.now()).toString(),
			notes: {
				courseId: courseDetails._id,
				userId: userId,
			},
		};

		try {
			//initialize payment
			const paymentResponse = await razorpay.orders.create(options);
			console.log("Payment response ", paymentResponse);

			return res.json(
				new ApiResponse(
					201,
					{
						courseName: courseDetails.courseName,
						courseDescription:
							courseDetails.courseDescription,
						thumbNail: courseDetails.thumbNail,
						orderId: paymentResponse._id,
						currency: paymentResponse.currency,
						amount: paymentResponse.amount,
					},
					"Payment made"
				)
			);
		} catch (error) {
			console.log("Error creating payment order: ", error);
			return res.json(
				new ApiError(500, "Error creating payment order")
			);
		}
	} catch (error) {
		console.log("Something went wrong while capturing payment ", error);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while capturing payment "
			)
		);
	}
};

module.exports.verifySignature = async (req, res) => {
	try {
		const webhookSecret = "12345678";
		const signature = req.headers["x-ray-signature"];

		//signature is encrypted
		//we cannot decrypt it and compare it with our webhook
		//instead we will perform some steps on webhook to encrypt it and compare with signature

		const shasum = crypto.createHmac("sha256", webhookSecret);
		shasum.update(JSON.stringify(req.body));
		const digest = shasum.digest("hex");

		if (signature === digest) {
			console.log("Payment is Authorized");
			//bacche ko course mein enroll karao

			//capturePayment karte time notes mein paas kiye the na dono IDs , isikeliye
			const { courseId, userId } =
				req.body.payload.payment.entity.notes;

			try {
				const enrolledCourse = await Course.findByIdAndUpdate(
					{ _id: courseId },
					{ $push: { studentsEnrolled: userId } },
					{ new: true }
				);
				if (!enrolledCourse) {
					return res.json(new ApiError(401, "Course not found"));
				}

				const userEnrolled = await User.findByIdAndUpdate(
					{ _id: userId },
					{ $push: { courses: courseId } },
					{ new: true }
				);
				if (!userEnrolled) {
					return res.json(new ApiError(401, "User not found"));
				}

				//send confirmation mail
				const mailResponse = await mailSender(
					userEnrolled.email,
					"Payment Successful",
					courseEnrollmentEmail
				);

				return res.json(
					new ApiResponse(
						201,
						{},
						"Signature verified and course added"
					)
				);
			} catch (error) {
				console.log("Error enrolling user to course: ", error);
				return res.json(
					new ApiError(500, "Error enrolling user to course")
				);
			}
		} else {
			return res.json(new ApiError(400, "Invalid request"));
		}
	} catch (error) {
		console.log(
			"Something went wrong while verifying the signature ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while verifying the signature "
			)
		);
	}
};
