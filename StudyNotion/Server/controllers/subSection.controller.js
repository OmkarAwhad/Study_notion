const Section = require("../models/section.models");
const SubSection = require("../models/subSection.models");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");
const { imageUploader } = require("../utils/imageUploader.utils");
require("dotenv").config();

module.exports.createSubSection = async (req, res) => {
	try {
		const { title, timeDuration, description, sectionId } = req.body;

		const { lecVideo } = req.files;

		if (
			!title ||
			!timeDuration ||
			!description ||
			!lecVideo ||
			!sectionId
		) {
			return res.json(new ApiError(400, "All fields are required"));
		}

		const sectionData = await Section.findById({ _id: sectionId });
		if (!sectionData) {
			return res.json(new ApiError(404, "Section not found"));
		}

		const uploadVideo = await imageUploader(
			lecVideo,
			process.env.CLOUDINARY_FOLDER
		);

		const response = await SubSection.create({
			title,
			description,
			timeDuration,
			videoUrl: uploadVideo.secure_url,
		});

		const updatedSection = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{ $push: { subSection: response._id } },
			{ new: true }
		)
			.populate("subSection")
			.exec();

		return res.json(
			new ApiResponse(
				201,
				updatedSection,
				"Sub section created successfully"
			)
		);
	} catch (error) {
		console.log(
			"Something went wrong while creating the sub section ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while creating the sub section "
			)
		);
	}
};

//TODO doubt
module.exports.updateSubSection = async (req, res) => {
	try {
		const { title, timeDuration, description, sectionId, subSectionId } =
			req.body;

		const subSection = await SubSection.findById(subSectionId);

		if (!subSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			});
		}

		if (title !== undefined) {
			subSection.title = title;
		}

		if (description !== undefined) {
			subSection.description = description;
		}
		if (timeDuration !== undefined) {
			subSection.timeDuration = timeDuration;
		}
		if (req.files && req.files.video !== undefined) {
			const video = req.files.video;
			const uploadDetails = await uploadImageToCloudinary(
				video,
				process.env.CLOUDINARY_FOLDER
			);
			subSection.videoUrl = uploadDetails.secure_url;
		}

		await subSection.save();

		// find updated section and return it
		const updatedSection = await Section.findById(sectionId).populate(
			"subSection"
		);

		return res.json(
			new ApiResponse(
				201,
				updatedSection,
				"Sub section updated successfully"
			)
		);
	} catch (error) {
		console.log(
			"Something went wrong while updating the sub section ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while updating the sub section "
			)
		);
	}
};

//TODO doubt
module.exports.deleteSubSection = async (req, res) => {
	try {
		const { sectionId, subSectionId } = req.body;

		if (!subSectionId || !sectionId) {
			return res.json(new ApiError(401, "Every field is required"));
		}

		await SubSection.findByIdAndDelete({
			_id: subSectionId,
		});

		const updatedSection = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{ $pull: { subSection: subSectionId } },
			{ new: true }
		)
			.populate("subSection")
			.exec();

		return res.json(
			new ApiResponse(
				201,
				updatedSection,
				"Sub section deleted successfully"
			)
		);
	} catch (error) {
		console.log(
			"Something went wrong while deleting the sub section ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while deleting the sub section "
			)
		);
	}
};
