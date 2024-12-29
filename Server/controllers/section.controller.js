const Section = require("../models/section.models");
const Course = require("../models/course.models");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");

module.exports.createSection = async (req, res) => {
	try {
		const { courseId, sectionName } = req.body;

		if (!courseId || !sectionName) {
			return res.json(new ApiError(401, "Every field is required"));
		}

		const response = (await Section.create({ sectionName: sectionName }))
			.populate("subSection")
			.exec();

		const courseExists = await Course.findById(courseId);
		if (!courseExists) {
			return res.json(new ApiError(401, "Course not found"));
		}

		await Course.findByIdAndUpdate(
			{ _id: courseId },
			{ $push: { courseContent: response._id } },
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		return res.json(
			new ApiResponse(201, response, "Section created successfully")
		);
	} catch (error) {
		console.log(
			"Something went wrong while creating the section ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while creating the section "
			)
		);
	}
};

module.exports.updateSection = async (req, res) => {
	try {
		const { sectionId, sectionName } = req.body;
		await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{ sectionName: sectionName },
			{ new: true }
		);

		return res.json(
			new ApiResponse(201, {}, "Section updated successfully")
		);
	} catch (error) {
		console.log(
			"Something went wrong while updating the section ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while updating the section "
			)
		);
	}
};

// TODO doubt - while testing
module.exports.deleteSection = async (req, res) => {
	try {
		const { courseId, sectionId } = req.body;
		if (!courseId || !sectionId) {
			return res.json(new ApiError(401, "Every field is required"));
		}

		await Section.findByIdAndDelete({ _id: sectionId });

		//delete entry from course db
		await Course.findByIdAndUpdate(
			{ _id: courseId },
			{ $pull: { courseContent: sectionId } },
			{ new: true }
		);

		return res.json(
			new ApiResponse(201, {}, "Section deleted successfully")
		);
	} catch (error) {
		console.log(
			"Something went wrong while deleting the section ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while deleting the section "
			)
		);
	}
};
