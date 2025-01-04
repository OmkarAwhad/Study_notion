import React, { useState } from "react";
import CTAButton from "../HomePage/CTAButton";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex flex-col gap-5  ">
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
					className="px-4 py-2 bg-richblack-800 rounded outline-none border-b border-richblack-500 "
					placeholder="Enter email address"
					required
				/>
			</div>

			<div className="flex flex-col">
				<label
					htmlFor="password"
					className="text-sm pl-1 pb-1 text-richblack-300"
				>
					Password <span className=" text-red-500 ">*</span>
				</label>
				<div className="px-4 py-2 bg-richblack-800 rounded flex items-center  border-b border-richblack-500 ">
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						id="password"
						className="w-full bg-transparent outline-none "
						placeholder="Enter password"
						required
					/>
					<div
						onClick={() => setShowPassword(!showPassword)}
						className="cursor-pointer text-richblack-500 "
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</div>
				</div>
			</div>

			<button
				type="submit"
				className=" bg-yellow-50 w-full mt-5 py-2 rounded-md text-black font-semibold hover:bg-yellow-100 hover:font-bold hover:scale-95 transition-all duration-300 "
			>
				Sign in
			</button>
		</div>
	);
}

export default LoginForm;
