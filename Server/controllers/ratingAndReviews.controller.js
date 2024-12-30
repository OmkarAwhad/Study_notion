const RatingAndReviews = require("../models/ratingAndReviews.models");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");
const Course = require("../models/course.models");

module.exports.createRatingAndReviews = async (req, res) => {
	try {
		//get user id
		//get data from req body
		//check if user is enrolled or not
		//already reviewed or not
		//create entry
		//update in course model
		//return res
		const userId = req.user.id;
		const { courseId, rating, review } = req.body;

		if (!courseId || !review || !rating) {
			return res.json(new ApiError(401, "Each field is required"));
		}

		const courseDetails = await Course.findById(courseId);

		if (!courseDetails.studentsEnrolled.includes(userId)) {
			return res.json(
				new ApiError(401, "User not enrolled is this course")
			);
		}

		const alreadyReviewed = await RatingAndReviews.findOne({
			user: userId,
			course: courseId,
		});
		if (alreadyReviewed) {
			return res.json(
				new ApiError(401, "Already reviewed the course")
			);
		}

		const response = await RatingAndReviews.create({
			user: userId,
			rating: rating,
			review: review,
			course: courseId,
		});

		const updatedCourse = await Course.findByIdAndUpdate(
			{ _id: courseId },
			{ $push: { ratingAndReviews: response._id } },
			{ new: true }
		)
			.populate("ratingAndReviews")
			.exec();

		res.json(new ApiResponse(201, updatedCourse, "Rated and reviewed"));
	} catch (error) {
		console.log(
			"Something went wrong while creating rating and reviews ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while creating rating and reviews "
			)
		);
	}
};

module.exports.getAverageRating = async (req, res) => {
	try {
		const { courseId } = req.body;
		if (!courseId) {
			return res.json(new ApiError(401, "Course Id is required"));
		}

		const response = await Course.findById(courseId);

		let totalRating = 0;
		for (const item in response.ratingAndReviews) {
			totalRating =
				totalRating + response.ratingAndReviews[item].rating;
		}
		let avgRating;
		if (totalRating === 0) {
			avgRating = 0;
		} else {
			avgRating = totalRating / response.ratingAndReviews.length();
		}

		return res.json(
			new ApiResponse(201, avgRating, "Got average rating")
		);
	} catch (error) {
		console.log("Something went wrong while getting avg rating ", error);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while getting avg rating "
			)
		);
	}
};

module.exports.getAllRatingAndReviews = async (req, res) => {
	try {
		const response = await RatingAndReviews.find({})
			.sort({ rating: "desc" })
			.populate({
				path: "user",
				select: "firstName lastName email image",
			})
			.populate({
				path: "course",
				select: "courseName",
			})
			.exec();

		return res.json(
			new ApiResponse(201, response, "All ratings and reviews fetched")
		);
	} catch (error) {
		console.log(
			"Something went wrong while fetching all rating and reviews ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while fetching all rating and reviews "
			)
		);
	}
};

module.exports.getAllRatingAndReviewsForCourse = async (req, res) => {
	try {
		const { courseId } = req.body;
		if (!courseId) {
			return res.json(new ApiError(401, "Course Id is required"));
		}

		const response = await RatingAndReviews.find({ course: courseId })
			.populate("user")
			.populate("course")
			.exec();

		return res.json(
			new ApiResponse(201, response, "All ratings and reviews fetched")
		);
	} catch (error) {
		console.log(
			"Something went wrong while fetching all rating and reviews ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while fetching all rating and reviews "
			)
		);
	}
};
