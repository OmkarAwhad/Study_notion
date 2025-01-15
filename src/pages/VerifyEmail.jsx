import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI.service";

function VerifyEmail() {
	const { loading, signupData } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [otp, setOtp] = useState("");

	useEffect(() => {
		if (!signupData) {
			navigate("/sign-up");
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
		} = signupData;

		dispatch(
			signUp(
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				accountType,
				otp,
				navigate
			)
		);
	};

	return (
		<div className="text-white w-full h-full flex items-center justify-center ">
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="w-[25%] flex flex-col gap-3 ">
					<h1 className=" text-3xl ml-1 font-semibold ">
						Verify email
					</h1>
					<p className=" text-richblack-100 px-2 font-medium ">
						A verification code has been sent to you. Enter
						the code below
					</p>
					<form onSubmit={handleSubmit}>
						<OTPInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							renderInput={(props) => (
								<input
									{...props}
									placeholder="-"
									style={{
										boxShadow:
											"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
									}}
									className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
								/>
							)}
							containerStyle={{
								justifyContent: "space-between",
								gap: "0 6px",
							}}
						/>
						<button
							type="submit"
							className=" bg-yellow-50 w-full mt-8 py-2 rounded-md text-black font-semibold hover:bg-yellow-100 hover:font-bold hover:scale-[99%] transition-all duration-300 "
						>
							Verify Email
						</button>
					</form>
					<div className="flex mt-3 items-center justify-between">
						<Link
							to={"/login"}
							className="flex items-center gap-3 text-richblack-100 "
						>
							<FaArrowLeftLong className=" cursor-pointer" />
							<p className=" cursor-pointer">
								Back to login
							</p>
						</Link>
						<div
							onClick={() =>
								dispatch(
									sendOtp(signupData.email, navigate)
								)
							}
							className="flex items-center justify-center gap-2 text-blue-100 "
						>
							<PiClockCounterClockwiseBold className="text-xl" />
							<p>Resend it</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default VerifyEmail;
