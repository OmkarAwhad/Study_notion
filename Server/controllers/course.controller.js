const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");
const Course = require("../models/course.models");
const Category = require("../models/category.models");
const User = require("../models/user.models");
const { imageUploader } = require("../utils/imageUploader.utils");

module.exports.createCourse = async (req, res) => {
	//fetch data and validate
	//check if category exists or not
	//upload image to cloudinary
	//create db entry
	//update course db
	//update category db
	//return res

	try {
		const {
			name,
			description,
			whatWillYouLearn,
			price,
			category,
			tag: _tag,
			instructions: _instructions,
		} = req.body;

		const { thumbNailImage } = req.files;

		const tag = JSON.parse(_tag);
		const instructions = JSON.parse(_instructions);

		if (
			!name ||
			!description ||
			!tag.length ||
			!instructions.length ||
			!whatWillYouLearn ||
			!price ||
			!category
		) {
			return res.json(new ApiError(401, "All fields are required"));
		}

		// TODO
		const instructorId = req.user.id;
		const instructorData = await User.findById({ _id: instructorId });
		if (!instructorData) {
			return res.json(new ApiError(401, "Instructor not found"));
		}

		console.log(
			`${
				instructorData._id === instructorId
					? "Same IDs"
					: "Not same"
			}`
		);
		// TODO

		const categoryData = await Category.findOne({ name: category });
		if (!categoryData) {
			return res.json(new ApiError(401, "Category not found"));
		}

		const imageToCloudinary = await imageUploader(
			thumbNailImage,
			process.env.CLOUDINARY_FOLDER
		);

		const response = await Course.create({
			courseName,
			courseDescription,
			whatWillYouLearn,
			instructor: instructorData._id,
			price,
			tags: tag,
			instructions: instructions,
			thumbNail: imageToCloudinary.secure_url,
			category: categoryData._id,
		});

		await Category.findByIdAndUpdate(
			{ _id: categoryData._id },
			{ $push: { courses: response._id } },
			{ new: true }
		);

		await User.findByIdAndUpdate(
			{ _id: instructorData._id },
			{ $push: { courses: response._id } },
			{ new: true }
		);

		return res.json(
			new ApiResponse(201, response, "Course created successfully")
		);
	} catch (error) {
		console.log("Something went wrong while creating the course ", error);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while creating the course "
			)
		);
	}
};

module.exports.showAllCourses = async (req, res) => {
	try {
		const response = await Course.find(
			{},
			{
				courseName: true,
				courseDescription: true,
				whatWillYouLearn: true,
				instructor: true,
				price: true,
				thumbNail: true,
				category: true,
				ratingAndReviews: true,
				studentsEnrolled: true,
			}
		)
			.populate("instructor")
			.populate("ratingAndReviews")
			.exec();

		return res.json(
			new ApiResponse(201, response, "All courses fetched")
		);
	} catch (error) {
		console.log(
			"Something went wrong while fetching all courses ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while fetching all courses "
			)
		);
	}
};

module.exports.getCourseDetail = async (req, res) => {
	try {
		const { courseId } = req.body;
		if (!courseId) {
			return res.json(new ApiError(401, "Course ID is required"));
		}

		const response = await Course.findById(courseId)
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
					select: "-videoUrl",
				},
			})
			.populate({
				path: "studentsEnrolled",
				populate: {
					path: "additionalDetails",
				},
			})
			.exec();

		if (!response) {
			return res.json(new ApiError(404, "Course not found"));
		}

		return res.json(
			new ApiResponse(201, response, "Data fetched successfully")
		);
	} catch (error) {
		console.log(
			"Something went wrong while fetching course detail ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while fetching course detail "
			)
		);
	}
};
