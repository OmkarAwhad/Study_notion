import React from "react";
import Frame from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, desc1, desc2, image, formType }) {
	return (
		<div className="text-white w-10/12 z-0 mx-auto my-16 flex flex-col sm:flex-row items-center justify-between ">
			<div className=" w-[95%] sm:w-[40%] flex flex-col gap-7 ">
				<h1 className="text-3xl font-bold ">{title}</h1>
				<p className="text-richblack-200">
					{desc1}
					<span className=" text-blue-200 italic ">{desc2}</span>
				</p>

				<div className="w-full">
					{formType === "login" ? <LoginForm /> : <SignupForm />}
				</div>
			</div>

			<div className="relative sm:block hidden  ">
				<img src={image} alt="" />
				<img
					src={Frame}
					className="absolute top-5 -right-5 -z-10  "
					alt=""
				/>
			</div>
		</div>
	);
}

export default Template;
