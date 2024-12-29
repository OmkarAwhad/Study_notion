const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError.utils");
require("dotenv").config();
const User = require("../models/user.models");

//auth
exports.auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token ||
			req.headers.token ||
			req.header("Authorisation").replace("Bearer ", "");
		if (!token) {
			return res.json(new ApiError(401, "Token not found"));
		}

		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log("Decode ", decode);
			req.user = decode;
		} catch (error) {
			return res.json(new ApiError(401, "Invalid token"));
		}
		next();
	} catch (error) {
		console.log(
			"Something went wrong while validating the token ",
			error.message
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while validating the token"
			)
		);
	}
};

//isStudent
exports.isStudent = async (req, res, next) => {
	try {
		const { accountType } = req.user;
		if (accountType !== "Student") {
			return res.json(
				new ApiError(
					401,
					"This is a protected route for students only"
				)
			);
		}
		next();
	} catch (error) {
		console.log("Error in student auth ", error.message);
		return res.json(new ApiError(500, "Error in student auth"));
	}
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
	try {
		const { accountType } = req.user;
		if (accountType !== "Admin") {
			return res.json(
				new ApiError(
					401,
					"This is a protected route for Admins only"
				)
			);
		}
		next();
	} catch (error) {
		console.log("Error in Admin auth ", error.message);
		return res.json(new ApiError(500, "Error in Admin auth"));
	}
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
	try {
		const { accountType } = req.user;
		if (accountType !== "Instructor") {
			return res.json(
				new ApiError(
					401,
					"This is a protected route for Instructors only"
				)
			);
		}
		next();
	} catch (error) {
		console.log("Error in Instructor auth ", error.message);
		return res.json(new ApiError(500, "Error in Instructor auth"));
	}
};
