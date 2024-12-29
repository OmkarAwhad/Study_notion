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
		const { name, description, whatWillYouLearn, price, category } =
			req.body;

		const { thumbNailImage } = req.files;

		if (
			!name ||
			!description ||
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
