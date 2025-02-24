const Category = require("../models/category.models");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");

module.exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			return res.json(new ApiError(401, "All fields are required"));
		}

		const response = await Category.create({ name, description });

		return res.json(
			new ApiResponse(201, response, "Category created successFully")
		);
	} catch (error) {
		console.log("Something went wrong while creating a category", error);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while creating a category"
			)
		);
	}
};

module.exports.showAllCategories = async (req, res) => {
	try {
		const response = await Category.find(
			{},
			{ name: true, description: true }
		);

		return res.json(
			new ApiResponse(201, response, "All categories fetched")
		);
	} catch (error) {
		console.log(
			"Something went wrong while fetching all categories ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while fetching all categories "
			)
		);
	}
};

module.exports.categoryPageDetails = async (req, res) => {
	try {
		//get category id from req
		//get courses for specified category
		//validate
		//get courses for different categories
		//get top selling courses
		//return res

		const { categoryId } = req.body;

		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();
		if (!selectedCategory) {
			return res.json(new ApiError(401, "Data not foung"));
		}

		const diffCategories = await Category.find({
			_id: { $ne: categoryId },
		})
			.populate("courses")
			.exec();

		// TODO : top selling

		return res.json(
			new ApiResponse(201, {selectedCategory,diffCategories}, "Details of category page fetched")
		);
	} catch (error) {
		console.log(
			"Something went wrong while fetching all categories ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while fetching all categories "
			)
		);
	}
};
