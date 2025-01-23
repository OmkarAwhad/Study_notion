const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
	CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const authApi = {
	LOGIN_API: BASE_URL + "/user/login",
	SIGNUP_API: BASE_URL + "/user/sign-up",
	SEND_OTP: BASE_URL + "/user/sendOtp",
	RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
	RESETPASS_API: BASE_URL + "/user/reset-password",
};

export const contactApi = {
	CONTACT_API: BASE_URL + "/contact",
};

export const profileApi = {
	UPDATE_PROFILE_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
	UPDATE_PROFILE: BASE_URL + "/profile/updateProfile",
	UPDATE_PASSWORD: BASE_URL + "/profile/updatePassword",
	DELETE_PROFILE: BASE_URL + "/profile/deleteProfile",
};
