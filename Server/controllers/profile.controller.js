const Profile = require("../models/profile.models");
const User = require("../models/user.models");
const { ApiResponse } = require("../utils/ApiResponse.utils");
const { ApiError } = require("../utils/ApiError.utils");

module.exports.updateProfile = async (req, res) => {
	try {
		//get data
		//get userId
		//validate
		//find profile
		//update
		//return res

		const {
			gender,
			dateOfBirth = "",
			about = "",
			contactNumber,
		} = req.body;
		const userId = req.user.id;

		if (!gender || !contactNumber || !userId) {
			return res.json(
				new ApiError(
					401,
					"Gender, contact number, and user ID are required."
				)
			);
		}

		const userData = await User.findById(userId);

		const profileId = userData.additionalDetails;
		const profileData = await Profile.findById({ _id: profileId });

		//updating
		profileData.gender = gender;
		profileData.dateOfBirth = dateOfBirth;
		profileData.about = about;
		profileData.contactNumber = contactNumber;

		await profileData.save();

		return res.json(
			new ApiResponse(201, profileData, "Profile updated successfully")
		);
	} catch (error) {
		console.log(
			"Something went wrong while updating the profile ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while updating the profile "
			)
		);
	}
};

module.exports.deleteProfile = async (req, res) => {
	try {
		//get data n validate
		//delete profile
		//update in User db
		//return res

		const userId = req.user.id;

		const userDetails = await User.findById({ _id: userId });
		if (!userDetails) {
			return res.json(new ApiError(404, "User not found"));
		}

		await Profile.findByIdAndDelete({
			_id: userDetails.additionalDetails,
		});

		// TODO : Unenroll user from all enrolled courses

		await User.findByIdAndDelete({ _id: userId });

		return res.json(
			new ApiResponse(201, {}, "Profile deleted successfully")
		);
	} catch (error) {
		console.log(
			"Something went wrong while deleting the profile ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while deleting the profile "
			)
		);
	}
};

module.exports.getAllUserDetails = async (req, res) => {
	try {
		const userId = req.user.id;

		const userDetails = await User.findById(userId).populate("additionalDetails").exec();
		
		return res.json(
			new ApiResponse(201, userDetails, "Users all detail fetched")
		);
	} catch (error) {
		console.log(
			"Something went wrong while fetching all user details ",
			error
		);
		return res.json(
			new ApiError(
				500,
				"Something went wrong while fetching all user details "
			)
		);
	}
};
