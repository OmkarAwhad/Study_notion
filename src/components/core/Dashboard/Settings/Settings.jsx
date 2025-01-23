import React from "react";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ChangeProfilePicture from "./ChangeProfilePicture";
import ChangeInfo from "./ChangeInfo";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";

function Settings() {
	const navigate = useNavigate();

	return (
		<div className="ml-5 mt-3 w-[70vw] text-sm ">
			<div
				className="flex items-center gap-1 text-richblack-300 cursor-pointer mb-3 "
				onClick={() => {
					navigate(-1);
				}}
			>
				<RiArrowLeftWideLine className="text-base" />
				Back
			</div>

			<h1 className="text-3xl font-medium w-full">Edit Profile</h1>

			<div className="flex flex-col gap-5 ml-10 mt-7 min-w-[80%] ">
				<ChangeProfilePicture />
				<ChangeInfo />
				<ChangePassword />
				<DeleteProfile />
			</div>
		</div>
	);
}

export default Settings;
