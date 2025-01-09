import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/common/Navbar";

function App() {
	return (
		<div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sign-up" element={<Signup />} />
				<Route path="/about" element={<About/>} />
				<Route path="/contact" element={<ContactUs/>} />
			</Routes>
		</div>
	);
}

export default App;
