const express = require("express");
const router = express.Router();
const {
	auth,
	isInstructor,
	isStudent,
	isAdmin,
} = require("../middlewares/auth.middlewares");
const {
	createCourse,
	showAllCourses,
	getCourseDetail,
	deleteCourse,
	getFullCourseDetails,
	editCourse,
	getInstructorCourses,
} = require("../controllers/course.controller");
const {
	createSection,
	updateSection,
	deleteSection,
} = require("../controllers/section.controller");
const {
	updateSubSection,
	deleteSubSection,
	createSubSection,
} = require("../controllers/subsection.controller");
const {
	createCategory,
	showAllCategories,
	categoryPageDetails,
} = require("../controllers/category.controller");
const {
	createRatingAndReviews,
	getAverageRating,
	getAllRatingAndReviews,
	getAllRatingAndReviewsForCourse,
} = require("../controllers/ratingAndReviews.controller");



router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetail", getCourseDetail);
// router.delete("/deleteCourse", deleteCourse);
// router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// router.post("/editCourse", auth, isInstructor, editCourse);
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/categoryPageDetails", categoryPageDetails);

router.post(
	"/createRatingsAndReviews",
	auth,
	isStudent,
	createRatingAndReviews
);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews);
router.get("/getReviewsCourse", getAllRatingAndReviewsForCourse);

module.exports = router;
