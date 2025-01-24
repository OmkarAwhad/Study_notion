import { profileApi } from "../apis.service";
import { apiConnector } from "../apiConnector.service";
import toast from "react-hot-toast";

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
			// console.log(result);
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
