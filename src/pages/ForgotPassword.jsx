import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPasswordResetToken } from "../services/operations/authAPI.service";

function ForgotPassword() {
	const [emailSent, setEmailSent] = useState(false);
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(getPasswordResetToken(email, setEmailSent));
	};

	return (
		<div className="flex items-center justify-center w-full h-full text-white">
			{loading ? (
				<div>Loading ... </div>
			) : (
				<div
					className={`w-[95%] ml-10 md:ml-0 md:w-[30%] flex flex-col ${
						emailSent ? "gap-3" : "gap-8"
					} justify-center`}
				>
					<h1 className=" text-3xl font-semibold ">
						{!emailSent
							? "Reset your password"
							: "Check email"}
					</h1>
					<p className=" text-richblack-100 font-medium ">
						{!emailSent
							? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
							: `We have sent the reset email to ${email}`}
					</p>
					<form onSubmit={handleSubmit}>
						{!emailSent && (
							<label>
								<p className="text-sm mb-2 ml-2 ">
									Email Address{" "}
									<sup className="text-red-400">
										*
									</sup>
								</p>
								<input
									type="text"
									placeholder="mymailaddress@gmail.com"
									required
									value={email}
									onChange={(e) =>
										setEmail(e.target.value)
									}
									className="px-4 py-2 bg-richblack-800 rounded border-b w-full border-richblack-500 outline-none "
								/>
							</label>
						)}
						<div className="flex items-center justify-center">
							<button
								type="submit"
								className=" bg-yellow-50 w-full mt-8 py-2 rounded-md text-black font-semibold hover:bg-yellow-100 hover:font-bold hover:scale-[99%] transition-all duration-300 "
							>
								{!emailSent
									? "Reset Password"
									: "Resend email"}
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

export default ForgotPassword;
