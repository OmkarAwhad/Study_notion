import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector.service";
import { courseApi } from "../apis.service";

export const fetchCourseCategories = async () => {
	let response = [];
	const toastId = toast.loading("Fetching course categories...");
	try {
		const result = await apiConnector(
			"GET",
			courseApi.GET_COURSE_CATEGORIES
		);
		// console.log(result);
		if (!result?.data?.success) {
			toast.error(result?.data?.message);
			throw new Error("Failed to fetch course categories");
		}
		response = result?.data?.data;
	} catch (error) {
		console.log("Failed to fetch course categories", error);
		toast.error("Failed to fetch course categories");
	}
	toast.dismiss(toastId);
	return response;
};

export const editCourseDetails = async (data, token) => {
	let result = null;
	const toastId = toast.loading("Loading...");
	try {
		const response = await apiConnector(
			"POST",
			courseApi.EDIT_COURSE_API,
			data,
			{
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("EDIT COURSE API RESPONSE............", response);
		if (!response?.data?.success) {
			throw new Error("Could Not Update Course Details");
		}
		toast.success("Course Details Updated Successfully");
		result = response?.data?.data;
	} catch (error) {
		console.log("EDIT COURSE API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
};

export const addCourseDetails = async (data, token) => {
	let result = null;
	const toastId = toast.loading("Loading...");
	try {
      console.log("Token", token)
		const response = await apiConnector(
			"POST",
			courseApi.CREATE_COURSE_API,
			data,
			{
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("CREATE COURSE API RESPONSE............", response);
		if (!response?.data?.success) {
			throw new Error("Could Not Add Course Details");
		}
		toast.success("Course Details Added Successfully");
		result = response?.data?.data;
	} catch (error) {
		console.log("CREATE COURSE API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
};
