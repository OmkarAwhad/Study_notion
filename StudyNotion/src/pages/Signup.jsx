import React from "react";
import Template from "../components/core/Auth/Template";
import SignupImage from "../assets/Images/signup.webp";

function Signup() {
	return (
		<Template
			title={
				"Join the millions learning to code with StudyNotion for free"
			}
			desc1={"Build skills for today, tomorrow, and beyond."}
			desc2={" Education to future-proof your career."}
			image={SignupImage}
			formType={"signup"}
		/>
	);
}

export default Signup;
