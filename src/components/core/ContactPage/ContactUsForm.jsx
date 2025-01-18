import React, { useEffect, useState } from "react";
import Countrycode from "../../../data/countrycode.json";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiConnector.service";
import { contactApi } from "../../../services/apis.service";

function ContactUsForm() {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const submitContactForm = async (data) => {
		// console.log("Loggin data", data);
		setLoading(true);
		try {
			const response = await apiConnector(
				"POST",
				contactApi.CONTACT_API,
				data
			);
         reset();
			// console.log("response ",response);
		} catch (error) {
			console.log("Error ", error);
		}
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				firstName: "",
				lastName: "",
				email: "",
				message: "",
				contactNumber: "",
				countrycode: "",
			});
		}
	}, [isSubmitSuccessful, reset]);

	return (
		<form
			onSubmit={handleSubmit(submitContactForm)}
			className="flex flex-col w-full gap-5 "
		>
			<div className="flex gap-3">
				<label>
					<p className=" text-richblack-200 text-sm ml-1 mb-1 ">
						First Name
					</p>
					<input
						type="text"
						placeholder="Enter first name  "
						className="px-2 py-2 bg-richblack-800 outline-none rounded border-b border-b-richblack-200 w-full "
						{...register("firstName", { required: true })}
					/>
					{errors.firstName && (
						<span>Please Enter your First Name</span>
					)}
				</label>
				<label>
					<p className=" text-richblack-200 text-sm ml-1 mb-1 ">
						Last Name
					</p>
					<input
						type="text"
						placeholder="Enter last name  "
						className="px-2 py-2 bg-richblack-800 outline-none rounded border-b border-b-richblack-200 w-full "
						{...register("lastName")}
					/>
				</label>
			</div>

			<label>
				<p className=" text-richblack-200 text-sm ml-1 mb-1 ">
					Email Address
				</p>
				<input
					type="email"
					placeholder="Enter email address  "
					className="px-2 py-2 bg-richblack-800 outline-none rounded border-b border-b-richblack-200 w-full "
					{...register("email", { required: true })}
				/>
				{errors.email && <span>Please Enter your Email</span>}
			</label>

			<div className="w-full">
				<p className="text-richblack-200 text-sm ml-1 mb-1">
					Phone Number
				</p>
				<div className="flex gap-3 w-full">
					<select
						className="px-2 py-2 bg-richblack-800 text-richblack-200 w-[30%] outline-none rounded border-b border-b-richblack-200"
						name="countrycode"
						{...register("countrycode", { required: true })}
						id="countrycode"
					>
						{Countrycode.map((item, index) => (
							<option
								key={index}
								className="text-richblack-200"
								value={item.code}
							>
								{item.code} - {item.country}
							</option>
						))}
					</select>
					<label className="w-full">
						<input
							type="number"
							placeholder="1234567890"
							{...register("contactNumber", {
								required: {
									value: true,
									message: "Please Enter Phone Number",
								},
								maxLength: {
									value: 10,
									message: "Invalid Phone Number",
								},
								minLength: {
									value: 10,
									message: "Invalid Phone Number",
								},
							})}
							className="px-2 py-2 bg-richblack-800 outline-none rounded border-b border-b-richblack-200 appearance-none w-full"
						/>
						{errors.contactNumber && (
							<span>Please Enter your contact Number</span>
						)}
					</label>
				</div>
			</div>

			<div>
				<p className="text-richblack-200 text-sm ml-1 mb-1">
					Message
				</p>
				<textarea
					name=""
					id=""
					placeholder="Enter Message"
					className="px-2 py-2 bg-richblack-800 outline-none rounded border-b resize-none min-h-32  border-b-richblack-200 appearance-none w-full"
					{...register("message", { required: true })}
				/>
				{errors.message && <span>Please Enter your message</span>}
			</div>

			<button
				type="submit"
				className=" bg-yellow-50 w-full mt-2 py-2 rounded-md text-black font-semibold hover:bg-yellow-100 hover:font-bold hover:scale-[99%] transition-all duration-300 "
			>
				Send Message
			</button>
		</form>
	);
}

export default ContactUsForm;
