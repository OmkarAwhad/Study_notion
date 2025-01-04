import React, { useState } from "react";
import CTAButton from "../HomePage/CTAButton";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

function SignupForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
		console.log(formData);
	};

	return (
		<div className="flex flex-col gap-5 w-full ">
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
					Email Address <span className=" text-red-500 ">*</span>
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
						Password <span className=" text-red-500 ">*</span>
					</label>
					<div className="px-4 py-2 bg-richblack-800 border-b border-richblack-500 rounded flex items-center ">
						<input
							type={showPassword ? "text" : "password"}
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
							{showPassword ? <FaEyeSlash /> : <FaEye />}
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
		</div>
	);
}

export default SignupForm;
