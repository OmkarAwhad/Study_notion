import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector.service";
import { setToken, setLoading } from "../../slices/auth.slice";
import { setUser } from "../../slices/profile.slice";
import { authApi } from "../apis.service";
import { resetCart } from "../../slices/cart.slice";

export function sendOtp(email, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const result = await apiConnector("POST", authApi.SEND_OTP, {
				email,
				checkUserPresent: true,
			});
			console.log("SENDOTP API result............", result);

			console.log(result.data.success);

			if (!result.data.success) {
				toast.error(result.data.message);
				throw new Error(result.data.message);
			}

			toast.success("OTP Sent Successfully");
			navigate("/verify-email");
		} catch (error) {
			console.log("Error in sending otp");
			toast.error("OTP not sent");
		}
		dispatch(setLoading(false));
		toast.remove(toastId);
	};
}

export function signUp(
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
	accountType,
	otp,
	navigate
) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const result = await apiConnector("POST", authApi.SIGNUP_API, {
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				accountType,
				otp,
			});
			console.log(result);
			if (!result.data.success) {
				toast.error(result.data.message);
				throw new Error(result.data.message);
			}
			toast.success("Registered successfully");
			navigate("/login");
		} catch (error) {
			console.log("Sign up failed");
			toast.error("Registeration failed");
			navigate("/sign-up");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function login(email, password, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const result = await apiConnector("POST", authApi.LOGIN_API, {
				email,
				password,
			});
			// console.log(result.data?.data?.user?.image);
			if (result.data.success) {
				toast.success("Login Successful");
				dispatch(setToken(result.data.data.token));
				localStorage.setItem(
					"token",
					JSON.stringify(result.data.data.token)
				);
				localStorage.setItem(
					"user",
					JSON.stringify(result.data.data.user)
				);

				const userImage = result.data?.data?.user?.image
					? result.data?.data?.user?.image
					: `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.data.firstName} ${result.data.data.lastName}`;

				dispatch(
					setUser({ ...result.data.data.user, image: userImage })
				);
				navigate("/dashboard/my-profile");
			} else {
				toast.error(result.data.message);
				throw new Error(result.data.message);
			}
		} catch (error) {
			console.log("LOGIN API ERROR............", error);
			toast.error("Failed to login");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function getPasswordResetToken(email, setEmailSent) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading ...");
		dispatch(setLoading(true));
		try {
			const result = await apiConnector(
				"POST",
				authApi.RESETPASSTOKEN_API,
				{ email }
			);
			// console.log("result " ,result)
			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			toast.success("Reset password email sent");
			setEmailSent(true);
		} catch (error) {
			console.log("Error in getpassword");
			toast.error("Error occurred");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function resetPassword(token, password, confirmPassword) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading ...");
		dispatch(setLoading(true));
		try {
			const result = await apiConnector(
				"POST",
				authApi.RESETPASS_API,
				{ token, password, confirmPassword }
			);
			console.log(result);
			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			if (result.data.message === "Token expired, Time out") {
				toast.error("Time out, resend mail again");
			}
			toast.success("Password reset successful");
		} catch (error) {
			toast.error("Error in resetting password");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function logout(navigate) {
	return (dispatch) => {
		dispatch(setToken(null));
		dispatch(setUser(null));
		dispatch(resetCart());
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		toast.success("Logged Out");
		navigate("/");
	};
}
