import { profileApi } from "../apis.service";
import { apiConnector } from "../apiConnector.service";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profile.slice";
import { logout } from "./authAPI.service";
import { useSelector } from "react-redux";

export function updateDisplayPicture(formData, token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			const response = await apiConnector(
				"PUT",
				profileApi.UPDATE_PROFILE_PICTURE,
				formData,
				{
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				}
			);
			console.log(
				"UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
				response
			);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success("Display Picture Updated Successfully");
			dispatch(setUser(response.data.data));
		} catch (error) {
			console.log(
				"UPDATE_DISPLAY_PICTURE_API API ERROR............",
				error
			);
			toast.error("Could Not Update Display Picture");
		}
		toast.dismiss(toastId);
	};
}

export function updateProfile(formData, token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			const result = await apiConnector(
				"PUT",
				profileApi.UPDATE_PROFILE,
				formData,
				{
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				}
			);

			console.log("Result ", result.data.data);
			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			const userImage = result.data.data.image
				? result.data.data.image
				: `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.data.firstName} ${result.data.data.lastName}`;

			const updatedUser = {
				...result.data.data,
				image: userImage,
			};
			dispatch(setUser(updatedUser));
			// localStorage.setItem("user", JSON.stringify(updatedUser)); // Update local storage

			toast.success("Profile Updated Successfully");
		} catch (error) {
			console.log("Error in updating profile ", error);
			toast.error("Not able to update profile");
		}
		toast.dismiss(toastId);
	};
}

export function updatePassword(data, token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			const result = await apiConnector(
				"PUT",
				profileApi.UPDATE_PASSWORD,
				data,
				{
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				}
			);

			// console.log("Response ", result);
			if (!result.data.success) {
				toast.error(result.data.message);
				throw new Error(result.data.message);
			}
			toast.success("Password Updated successfully");
		} catch (error) {
			console.log("Error in updating password  ", error);
			toast.error("Not able to update password ");
		}
		toast.dismiss(toastId);
	};
}

export function deleteProfile(token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			const result = await apiConnector(
				"DELETE",
				profileApi.DELETE_PROFILE,
				null,
				{
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				}
			);

			// console.log("Response ", result);
			if (!result.data.success) {
				toast.error(result.data.message);
				throw new Error(result.data.message);
			}
			toast.success("Account deleted successfully");
			dispatch(logout(navigate));
		} catch (error) {
			console.log("Error in deleting account   ", error);
			toast.error("Not able to delete account  ");
		}
		toast.dismiss(toastId);
	};
}

export function getUserEnrolledCourses(token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		let resp = [];
		try {
			const result = await apiConnector(
				"GET",
				profileApi.GET_ENROLLED_COURSES,
				null,
				{
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				}
			);
			console.log(result);
			if (!result.data.success) {
				toast.error(result.data.message);
				throw new Error(result.data.message);
			}

			resp = result.data.data;
		} catch (error) {
			console.log("Not able to fetch enrolled courses data ", error);
			toast.error("Not able to fetch enrolled courses data  ");
		}
		toast.dismiss(toastId);
		return resp;
	};
}
