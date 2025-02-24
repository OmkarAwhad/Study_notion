import React from "react";
import Template from "../components/core/Auth/Template";
import LoginImage from "../assets/Images/login.webp";

function Login() {
	return (
		<Template
			title={"Welcome Back"}
			desc1={"Build skills for today, tomorrow, and beyond."}
			desc2={" Education to future-proof your career."}
			image={LoginImage}
			formType={"login"}
		/>
	);
}

export default Login;
