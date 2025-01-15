import React, { useState } from "react";
import CTAButton from "../HomePage/CTAButton";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constants.utils";
import { setSignupData } from "../../../slices/auth.slice";
import { sendOtp } from '../../../services/operations/authAPI.service'
import Tab from "../../common/Tab";
import { signUp } from "../../../services/operations/authAPI.service";

function SignupForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { firstName, lastName, email, password, confirmPassword } = formData;

	const handleOnChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
		// console.log(formData);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		// if (!isPasswordValid(password)) {
		//   toast.error(
		// 	 "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
		//   );
		//   return;
		// }

		const signupData = {
			...formData,
			accountType,
		};
		// console.log(signupData)

		// Setting signup data to state
		// To be used after otp verification
		dispatch(setSignupData(signupData));

		// Send OTP to user for verification
		dispatch(sendOtp(formData.email, navigate));

		// Reset
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setAccountType(ACCOUNT_TYPE.STUDENT);
	};

	const tabData = [
		{
			id: 1,
			tabName: "Student",
			type: ACCOUNT_TYPE.STUDENT,
		},
		{
			id: 2,
			tabName: "Instructor",
			type: ACCOUNT_TYPE.INSTRUCTOR,
		},
	];

	return (
		<div>
			<Tab
				tabData={tabData}
				field={accountType}
				setField={setAccountType}
			/>
			<form
				onSubmit={handleOnSubmit}
				className="flex flex-col gap-5 w-full "
			>
				<div className="flex w-[100%] gap-4 ">
					<div className="flex flex-col w-[50%]">
						<label
							htmlFor="firstName"
							className="text-sm pl-1 pb-1 text-richblack-300"
						>
							First Name{" "}
							<span className=" text-red-500 ">*</span>
						</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={firstName}
							onChange={handleOnChange}
							className="px-4 py-2 bg-richblack-800 rounded  border-b border-richblack-500 outline-none "
							placeholder="Enter first name "
							required
						/>
					</div>
					<div className="flex flex-col w-[50%]">
						<label
							htmlFor="lastName"
							className="text-sm pl-1 pb-1 text-richblack-300"
						>
							Last Name{" "}
							<span className=" text-red-500 ">*</span>
						</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={lastName}
							onChange={handleOnChange}
							className="px-4 py-2 bg-richblack-800 rounded  border-b border-richblack-500 outline-none "
							placeholder="Enter last name "
							required
						/>
					</div>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="email"
						className="text-sm pl-1 pb-1 text-richblack-300"
					>
						Email Address{" "}
						<span className=" text-red-500 ">*</span>
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={handleOnChange}
						className="px-4 py-2 bg-richblack-800 rounded  border-b border-richblack-500 outline-none "
						placeholder="Enter email address"
						required
					/>
				</div>

				<div className="flex w-[100%] sm:flex-row flex-col gap-4 ">
					<div className="flex flex-col sm:w-[49%] ">
						<label
							htmlFor="password"
							className="text-sm pl-1 pb-1 text-richblack-300"
						>
							Password{" "}
							<span className=" text-red-500 ">*</span>
						</label>
						<div className="px-4 py-2 bg-richblack-800 border-b border-richblack-500 rounded flex items-center ">
							<input
								type={
									showPassword ? "text" : "password"
								}
								name="password"
								id="password"
								value={password}
								onChange={handleOnChange}
								className="w-full bg-transparent outline-none "
								placeholder="Enter password"
								required
							/>
							<div
								onClick={() =>
									setShowPassword(!showPassword)
								}
								className="cursor-pointer text-richblack-500 "
							>
								{showPassword ? (
									<FaEyeSlash />
								) : (
									<FaEye />
								)}
							</div>
						</div>
					</div>
					<div className="flex flex-col sm:w-[49%] ">
						<label
							htmlFor="confirmPassword"
							className="text-sm pl-1 pb-1 text-richblack-300"
						>
							Confirm Password{" "}
							<span className=" text-red-500 ">*</span>
						</label>
						<div className="px-4 py-2 bg-richblack-800 border-b border-richblack-500 rounded flex items-center ">
							<input
								type={
									showConfirmPassword
										? "text"
										: "password"
								}
								name="confirmPassword"
								id="confirmPassword"
								value={confirmPassword}
								onChange={handleOnChange}
								className="w-full bg-transparent outline-none "
								placeholder="Enter Password"
								required
							/>
							<div
								onClick={() =>
									setShowConfirmPassword(
										!showConfirmPassword
									)
								}
								className="cursor-pointer text-richblack-500 "
							>
								{showConfirmPassword ? (
									<FaEyeSlash />
								) : (
									<FaEye />
								)}
							</div>
						</div>
					</div>
				</div>

				<button
					type="submit"
					className=" bg-yellow-50 w-full mt-5 py-2 rounded-md text-black font-semibold hover:bg-yellow-100 hover:font-bold hover:scale-95 transition-all duration-300 "
				>
					Create Account
				</button>
			</form>
		</div>
	);
}

export default SignupForm;
