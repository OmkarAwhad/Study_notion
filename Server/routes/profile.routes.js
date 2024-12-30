const express = require("express");
const { auth } = require("../middlewares/auth.middlewares");
const {
	updateProfile,
	deleteProfile,
	getAllUserDetails,
} = require("../controllers/profile.controller");
const router = express.Router();

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
// router.put('/updateDisplayPicture' , auth , updateDisplayPicture)

module.exports = router;

module.exports = router;
