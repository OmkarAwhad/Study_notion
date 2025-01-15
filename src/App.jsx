import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/common/Navbar";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
	return (
		<div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/login"
					element={
						<OpenRoute>
							<Login />
						</OpenRoute>
					}
				/>
				<Route
					path="/sign-up"
					element={
						<OpenRoute>
							<Signup />
						</OpenRoute>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<OpenRoute>
							<ForgotPassword />
						</OpenRoute>
					}
				/>
				<Route
					path="/update-password/:token"
					element={
						<OpenRoute>
							<UpdatePassword />
						</OpenRoute>
					}
				/>
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<ContactUs />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
			</Routes>
		</div>
	);
}

export default App;
