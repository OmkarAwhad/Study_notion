const User = require("../models/user.models");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");
require("dotenv").config();
const { mailSender } = require("../utils/mailSender.utils");
const bcrypt = require("bcrypt");

//link banao
//mail send karo
//link open karke password reset karo

module.exports.resetPasswordToken = async (req, res) => {
	try {
		//get email from req
		//validate
		//user exists or not
		//generate token
		//add token and expiration time in User DB
		//create url
		//send mail containing url
		//return res

		const { email } = req.body;
		if (!email) {
			return res.json(new ApiError(401, "Email required"));
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.json(new ApiError(401, "User does not exist"));
		}

		const token = crypto.randomUUID();

		const updateUser = await User.findByIdAndUpdate(
			user._id,
			{
				token: token,
				resetPasswordExpires: Date.now() + 5 * 60 * 1000,
			},
			{ new: true }
		);

		const url = `http://localhost:5173/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset Link",
			`Password reset link : ${url}`
		);

		return res.json(
			new ApiResponse(
				201,
				updateUser,
				"Mail sent successfully, please check your mail box"
			)
		);
	} catch (error) {
		console.log("Error in reset password token");
		throw new ApiError(500, "Error in reset password token");
	}
};

module.exports.resetPassword = async (req, res) => {
	try {
		//data fetch
		//validate
		//get userdetails from db using token
		//if no entry - invalid token
		//check expired or not
		//hash pass
		//update in db
		//return res

		const { token, password, confirmPassword } = req.body;

		if (!token || !password || !confirmPassword) {
			return res.json(new ApiError(401, "Every field is required"));
		}

      if (password !== confirmPassword) {
         return res.json(new ApiError(401, "Passwords do not match"));
      }

		const user = await User.findOne({ token: token });
		if (!user) {
			return res.json(new ApiError(401, "Token not found"));
		}

		if (user.resetPasswordExpires < Date.now()) {
			return res.json(new ApiError(401, "Token expired, Time out"));
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const response = await User.findByIdAndUpdate(
			user._id,
			{ password: hashedPassword },
			{ new: true }
		);

		return res.json(
			new ApiResponse(201, response, "Password reset successful")
		);
	} catch (error) {
		console.log("Error in reset password");
		throw new ApiError(500, "Error in reset password");
	}
};
