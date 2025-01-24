import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { updatePassword } from "../../../../services/operations/settingAPI.service";

function ChangePassword() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	// const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitProfileForm = (data) => {
		try {
			dispatch(updatePassword(data, token));
		} catch (error) {
			console.log("Error ", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submitProfileForm)}
			className="w-full bg-richblack-800 flex-col px-5 py-4 rounded-md border-[0.1px] border-richblack-500 flex gap-7 items-start justify-center "
		>
			<h1 className="text-white font-semibold text-lg ">Password</h1>
			<div className="w-full flex flex-col items-end gap-5 ">
				<div className=" grid md:grid-cols-2 grid-cols-1 w-full gap-x-10  text-richblack-50 ">
					<label>
						<p className="text-richblack-50 ml-1">
							Old Password
						</p>
						<div className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] flex justify-between items-center ">
							<input
								type={
									showPassword ? "text" : "password"
								}
								className=" bg-transparent w-[90%] outline-none"
								placeholder="********"
								{...register("password", {
									required: true,
								})}
							/>
							<div
								onClick={() =>
									setShowPassword(!showPassword)
								}
								className="cursor-pointer text-richblack-300 "
							>
								{showPassword ? (
									<FaEye />
								) : (
									<FaEyeSlash />
								)}
							</div>
						</div>
						{errors.password && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your Old Password.
							</span>
						)}
					</label>
					<label>
						<p className="text-richblack-50 ml-1">
							New Password
						</p>
						<div className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] flex justify-between items-center ">
							<input
								type={
									showConfirmPassword
										? "text"
										: "password"
								}
								className=" bg-transparent outline-none w-[90%] "
								// defaultValue={user?.newPassword}
								placeholder="********"
								{...register("newPassword", {
									required: true,
								})}
							/>
							<div
								onClick={() =>
									setShowConfirmPassword(
										!showConfirmPassword
									)
								}
								className="cursor-pointer text-richblack-300 "
							>
								{showConfirmPassword ? (
									<FaEye />
								) : (
									<FaEyeSlash />
								)}
							</div>
						</div>
						{errors.newPassword && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your New Password.
							</span>
						)}
					</label>
				</div>
				<div className="flex gap-4 ">
					<button
						onClick={() => {
							navigate("/dashboard/my-profile");
						}}
						className=" rounded-md bg-richblack-700 px-4 py-2 font-semibold text-richblack-50"
					>
						<p className="text-center cursor-pointer">
							Cancel
						</p>
					</button>
					<button
						type="submit"
						className="text-richblack-900 bg-yellow-50 px-4 h-9 text-center font-semibold rounded-md  "
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}

export default ChangePassword;
