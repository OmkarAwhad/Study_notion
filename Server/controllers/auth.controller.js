const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");
const User = require("../models/user.models");
const OTP = require("../models/OTP.models");
const Profile = require("../models/profile.models");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender.utils");
const { passwordUpdated } = require("../mails/passwordUpdated.template");

module.exports.login = async (req, res) => {
	try {
		//data from req
		//validate
		//check if user exists or not
		//verify password
		//generate token
		//return res

		const { email, password, accountType } = req.body;

		if (!email || !password) {
			throw new ApiError(401, "Each field if required");
		}

		const user = await User.findOne({ email: email }).populate(
			"additionalDetails"
		);
		if (!user) {
			throw new ApiError(401, "User does not exists");
		}

		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				id: user._id,
				email: user.email,
				accountType: user.accountType,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "24h",
			});

			user.token = token;
			user.password = undefined;

			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
				httpOnly: true,
			};
			return res.res
				.cookie("token", token, options)
				.json(
					new ApiResponse(
						200,
						{ token, user },
						"Logged in successfully"
					)
				);
		} else {
			throw new ApiError(401, "Invalid Password");
		}
	} catch (error) {
		console.log("Error while login in");
		throw new ApiError(500, "Error while login in");
	}
};

module.exports.SignUp = async (req, res) => {
	try {
		//data from req
		//validate
		//if user already exists or not
		//match both passwords
		//validate it
		//find most recent otp stored for the user
		//validate otp
		//hash password
		//create db entry
		//return res
		const {
			email,
			password,
			firstName,
			lastName,
			confirmPassword,
			contactNumber,
			accountType,
			otp,
		} = req.body;

		if (
			!email ||
			!password ||
			!firstName ||
			!lastName ||
			!confirmPassword ||
			!otp
		) {
			throw new ApiError(401, "All fields are required");
		}

		const userData = await User.findOne({ email: email });
		if (userData) {
			throw new ApiError(401, "User is already registered");
		}

		if (password !== confirmPassword) {
			throw new ApiError(
				401,
				"Password and confirmPassword does not match"
			);
		}

		const otpForUser = await OTP.find({ email: email })
			.sort({ createdAt: -1 })
			.limit(1);
		if (otpForUser.length == 0) {
			throw new ApiError(401, "OTP not found");
		} else if (otp !== otpForUser.otp) {
			throw new ApiError(401, "OTP does not match");
		}

		const hashedPassword = bcrypt.hash(password, 10);

		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const response = await User.create({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
			contactNumber: contactNumber,
			accountType: accountType,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return new ApiResponse(201, response, "User registered successfully");
	} catch (error) {
		console.log("Something went wrong while signing up");
		throw new ApiError(500, "Something went wrong while signing up");
	}
};

// TODO : right ya wrong
module.exports.changePassword = async (req, res) => {
	try {
		//fetch data from req
		//validate
		//check oldPass, newPass and confirmNewPass
		//update pass in db
		//send mail that password is updated
		//return resp

		const { email, password, confirmPassword } = rqe.body;

		if (!email || !password || !confirmPassword) {
			throw new ApiError(401, "Each field is required");
		}

		const userData = new User.findOne({ email: email });
		if (!userData) {
			throw new ApiError(401, "User does not exist");
		}

		if (password !== confirmPassword) {
			throw new ApiError(
				401,
				"Password and confirm password does not match"
			);
		}

		if (await bcrypt.compare(password, userData.password)) {
			const response = await User.findByIdAndUpdate(userData._id, {
				password: { password },
			});
			try {
				const mailResponse = await mailSender(
					email,
					"Your Password has been updated",
					passwordUpdated(email, userData.firstName)
				);
				console.log("Mail sent successfully ", mailResponse);
			} catch (error) {
				console.log("Error occured while sending email");
			}

			return res.json(new ApiResponse(201,{},"Password changed successfully"))
		}
	} catch (error) {
		console.log("Error in change password controller");
		throw new ApiError(500, "Error in change password controller");
	}
};

module.exports.sendOtp = async (req, res) => {
	try {
		const { email } = req.body;

		const userData = await User.findOne({ email: email });
		if (userData) {
			throw new ApiError(401, "User already exists");
		}

		//generate otp
		let otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

		//check unique or not
		const otpData = await OTP.findOne({ otp: otp });
		//if not then keep generating otp till unique otp is generated
		while (otpData) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
				lowerCaseAlphabets: false,
				specialChars: false,
			});
			otpData = await OTP.findOne({ otp: otp });
		}

		//db entry
		const response = await OTP.create({ otp, email });
		return new ApiResponse(201, otp, "OTP sent successfully");
	} catch (error) {
		console.log("Something went wrong while sending otp");
		throw new ApiError(500, "Something went wrong while sending otp");
	}
};
