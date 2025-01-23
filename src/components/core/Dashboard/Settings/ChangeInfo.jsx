import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/profileSettingAPI.service";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

function ChangeInfo() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitProfileForm = (data) => {
		try {
			dispatch(updateProfile(data, token));
		} catch (error) {
			console.log("ERROR MESSAGE - ", error.message);
		}
	};



	return (
		<form
			onSubmit={handleSubmit(submitProfileForm)}
			className="w-full bg-richblack-800 flex-col px-5 py-4 rounded-md border-[0.1px] border-richblack-500 flex gap-7 items-start justify-center "
		>
			<h1 className="text-white font-semibold text-lg ">
				Profile Information
			</h1>
			<div className="w-full flex flex-col items-end gap-5 ">
				<div className=" grid md:grid-cols-2 grid-cols-1 w-full gap-x-10 gap-y-5 text-richblack-50 ">
					<label>
						<p className="text-richblack-50 ml-1">
							First Name
						</p>
						<input
							type="text"
							className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] "
							defaultValue={user?.firstName}
							placeholder="Enter first name"
							{...register("firstName", {
								required: true,
							})}
						/>
						<p className="text-[10px] ml-10 text-richblack-400 ">
							Name entered above will be used for all
							issued certifies.
						</p>
						{errors.firstName && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your first name.
							</span>
						)}
					</label>
					<label>
						<p className="text-richblack-50 ml-1">
							Last Name
						</p>
						<input
							type="text"
							className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] "
							defaultValue={user?.lastName}
							placeholder="Enter last name"
							{...register("lastName", { required: true })}
						/>
						<p className="text-[10px] ml-10 text-richblack-400 ">
							Name entered above will be used for all
							issued certifies.
						</p>
						{errors.lastName && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your last name.
							</span>
						)}
					</label>
					<label>
						<p className="text-richblack-50 ml-1">
							Date of Birth
						</p>
						<input
							type="date"
							className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] "
							defaultValue={
								user?.additionalDetails?.dateOfBirth
							}
							placeholder="Enter last name"
							{...register("dateOfBirth", {
								required: {
									value: true,
									message: "Please enter your Date of Birth",
								},
								max: {
									value: new Date()
										.toISOString()
										.split("T")[0],
									message: "Date of Birth cannot be in the future.",
								},
							})}
						/>
						{errors.dateOfBirth && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your Date of Birth.
							</span>
						)}
					</label>
					<label>
						<p className="text-richblack-50 ml-1">Gender</p>
						<select
							type="text"
							className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] "
							defaultValue={
								user?.additionalDetails?.gender
							}
							placeholder="Enter last name"
							{...register("gender", { required: true })}
						>
							{genders.map((item, index) => (
								<option value={item} key={index}>
									{item}
								</option>
							))}
						</select>

						{errors.gender && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your gender.
							</span>
						)}
					</label>
					<label>
						<p className="text-richblack-50 ml-1">
							Contact Number
						</p>
						<input
							type="number"
							className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] "
							defaultValue={
								user?.additionalDetails?.contactNumber
							}
							placeholder="Enter Contact Number"
							{...register("contactNumber", {
								required: {
									value: true,
									message: "Please enter your contact number.",
								},
								maxLength: {
									value: 12,
									message: "Invalid Contact Number",
								},
								minLength: {
									value: 10,
									message: "Invalid Contact Number",
								},
							})}
						/>
						{errors.contactNumber && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your contact number.
							</span>
						)}
					</label>
					<label>
						<p className="text-richblack-50 ml-1">About</p>
						<input
							type="text"
							className="px-5 py-2 bg-richblack-700 outline-none rounded border-b border-b-richblack-200 w-[90%] "
							defaultValue={user?.additionalDetails?.about}
							placeholder="Enter about"
							{...register("about", { required: true })}
						/>
						{errors.about && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your about.
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

export default ChangeInfo;
