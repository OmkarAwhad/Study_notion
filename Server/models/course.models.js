const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	courseName: {
		type: String,
	},
	courseDescription: {
		type: String,
	},
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	whatWillYouLearn: {
		type: String,
	},
	courseContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReviews",
		},
	],
	price: {
		type: Number,
	},
	thumbNail: {
		type: String,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
	tags: {
		type: [String],
		required: true,
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
});

module.exports = mongoose.model("Course", courseSchema);
