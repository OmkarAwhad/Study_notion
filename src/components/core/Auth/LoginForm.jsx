import React, { useState } from "react";
import CTAButton from "../HomePage/CTAButton";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI.service";

function LoginForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

	const handleOnChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};
	
	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(login(email, password, navigate));
	};

	return (
		<form onSubmit={handleOnSubmit} className="flex flex-col gap-5  ">
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
						value={password}
						onChange={handleOnChange}
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
				<Link to="/forgot-password">
					<p className="mt-2 ml-auto max-w-max text-xs cursor-pointer text-blue-100">
						Forgot Password
					</p>
				</Link>
			</div>

			<button
				type="submit"
				className=" bg-yellow-50 w-full mt-5 py-2 rounded-md text-black font-semibold hover:bg-yellow-100 hover:font-bold hover:scale-[98%] transition-all duration-300 "
			>
				Sign in
			</button>
		</form>
	);
}

export default LoginForm;
