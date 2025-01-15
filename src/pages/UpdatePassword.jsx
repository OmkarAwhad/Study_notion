import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI.service";

function UpdatePassword() {
	const { loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const location = useLocation();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const token = location.pathname.split("/").at(-1);
		dispatch(resetPassword(token, password, confirmPassword));
	};

	return (
		<div className="text-white w-full h-full flex items-center justify-center ">
			{loading ? (
				<div>Loading...</div>
			) : (
				<div
					className={`w-[95%] ml-10 md:ml-0 md:w-[22%] flex flex-col gap-4 justify-center`}
				>
					<h1 className=" text-3xl font-semibold ">
						Choose new password
					</h1>
					<p className=" text-richblack-100 px-2 font-medium ">
						Almost done. Enter your new password and youre all
						set.
					</p>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 "
					>
						<label>
							<p className="text-sm mb-2 ml-2 ">
								New Password{" "}
								<sup className="text-red-400">*</sup>
							</p>
							<div className="flex items-center justify-between w-full border-richblack-500 px-4 py-2 bg-richblack-800 rounded border-b ">
								<input
									type={
										showPassword
											? "text"
											: "password"
									}
									placeholder="******"
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className=" w-full bg-transparent outline-none "
								/>
								<div
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="cursor-pointer text-richblack-500 "
								>
									{showPassword ? (
										<FaEye />
									) : (
										<FaEyeSlash />
									)}
								</div>
							</div>
						</label>
						<label>
							<p className="text-sm mb-2 ml-2 ">
								Confirm new Password{" "}
								<sup className="text-red-400">*</sup>
							</p>
							<div className="flex items-center justify-between w-full border-richblack-500 px-4 py-2 bg-richblack-800 rounded border-b ">
								<input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									placeholder="******"
									required
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(
											e.target.value
										)
									}
									className=" w-full bg-transparent outline-none "
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
										<FaEye />
									) : (
										<FaEyeSlash />
									)}
								</div>
							</div>
						</label>
						<div className="flex items-center justify-center">
							<button
								type="submit"
								className=" bg-yellow-50 w-full mt-8 py-2 rounded-md text-black font-semibold hover:bg-yellow-100 hover:font-bold hover:scale-[99%] transition-all duration-300 "
							>
								Reset Password
							</button>
						</div>
					</form>
					<div>
						<Link
							to={"/login"}
							className="flex items-center gap-3 text-richblack-100 "
						>
							<FaArrowLeftLong className=" cursor-pointer" />
							<p className=" cursor-pointer">
								Back to login
							</p>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default UpdatePassword;
