const Section = require("../models/section.models");
const Course = require("../models/course.models");
const SubSection = require("../models/subSection.models");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");

module.exports.createSection = async (req, res) => {
	try {
		const { courseId, sectionName } = req.body;

		if (!courseId || !sectionName) {
			return res.json(new ApiError(401, "Every field is required"));
		}

		const response = await Section.create({ sectionName: sectionName });

		const courseExists = await Course.findById(courseId);
		if (!courseExists) {
			return res.json(new ApiError(401, "Course not found"));
		}

		const updatedCourse = await Course.findByIdAndUpdate(
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
			new ApiResponse(
				201,
				updatedCourse,
				"Section created successfully"
			)
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
		const { sectionId, sectionName, courseId } = req.body;
		await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{ sectionName: sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		return res.json(
			new ApiResponse(201, course, "Section updated successfully")
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

		//delete all subsections
		const sectionDetails = await Section.findById(sectionId);
		await SubSection.deleteMany({
			_id: { $in: sectionDetails.subSection },
		});

		await Section.findByIdAndDelete({ _id: sectionId });

		//delete entry from course db
		const updatedCourse = await Course.findByIdAndUpdate(
			{ _id: courseId },
			{ $pull: { courseContent: sectionId } },
			{ new: true }
		).populate("courseContent").exec();

		return res.json(
			new ApiResponse(
				201,
				updatedCourse,
				"Section deleted successfully"
			)
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
