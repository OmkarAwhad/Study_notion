import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";

function MyProfile() {
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();
	useEffect(()=>{
	  console.log("User " ,user.additionalDetails )
	},[])
	return (
		<div className="text-white w-[70vw] flex flex-col mt-10 ml-10 gap-7">
			<h1 className="font-bold text-3xl">My Profile</h1>

			<div className=" w-full flex flex-row justify-between items-center bg-richblack-800 px-10 py-7 rounded-lg ">
				<div className="flex items-center justify-center gap-6 ">
					<img
						src={user?.image}
						alt={`profile-${user?.firstName}`}
						className={` aspect-square w-[78px] rounded-full object-cover `}
					/>
					<div>
						<p className="text-lg font-semibold">
							{user?.firstName + " " + user?.lastName}
						</p>
						<p className="text-richblack-100 text-sm ">
							{user?.email}
						</p>
					</div>
				</div>
				<button
					onClick={() => {
						navigate("/dashboard/settings");
					}}
					className="bg-yellow-25 text-black font-bold text-sm flex items-center gap-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-all duration-200"
				>
					Edit <RiEditBoxLine className="text-black text-lg" />
				</button>
			</div>

			<div className=" w-full flex flex-row justify-between items-center bg-richblack-800 px-10 py-7 rounded-lg ">
				<div className="flex flex-col items-start justify-center gap-6 ">
					<p className="text-lg font-semibold">About</p>
					<p className="text-richblack-100 text-sm ">
						{user?.additionalDetails?.about
							? user?.additionalDetails?.about
							: "Write something about yourself"}
					</p>
				</div>
				<button
					onClick={() => {
						navigate("/dashboard/settings");
					}}
					className="bg-yellow-25 text-black font-bold text-sm flex items-center gap-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-all duration-200"
				>
					Edit <RiEditBoxLine className="text-black text-lg" />
				</button>
			</div>

			<div className=" w-full flex flex-row justify-between items-start bg-richblack-800 px-10 py-7 rounded-lg ">
				<div className="flex flex-col items-start justify-center gap-7 w-[90%] ">
					<p className="text-lg font-semibold">
						Personal Details
					</p>
					<div className=" grid grid-cols-1 md:grid-cols-2 justify-end w-full gap-y-6  ">
						<div>
							<h1 className="text-richblack-200 text-sm mb-2 ">
								First Name
							</h1>
							<p className="font-semibold text-sm">
								{user?.firstName}
							</p>
						</div>
            <div>
							<h1 className="text-richblack-200 text-sm mb-2 ">
								Last Name
							</h1>
							<p className="font-semibold text-sm">
								{user?.lastName}
							</p>
						</div>
            <div>
							<h1 className="text-richblack-200 text-sm mb-2 ">
								Email
							</h1>
							<p className="font-semibold text-sm">
								{user?.email}
							</p>
						</div>
            <div>
							<h1 className="text-richblack-200 text-sm mb-2 ">
								Contact Number
							</h1>
							<p className="font-semibold text-sm">
								{user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "Add Contact Number"}
							</p>
						</div>
            <div>
							<h1 className="text-richblack-200 text-sm mb-2 ">
								Gender
							</h1>
							<p className="font-semibold text-sm">
              {user?.additionalDetails?.gender ? user?.additionalDetails?.gender : "Add Gender"}
							</p>
						</div>
            <div>
							<h1 className="text-richblack-200 text-sm mb-2 ">
								Date of Birth
							</h1>
							<p className="font-semibold text-sm">
              {user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "Add Date of Birth"}
							</p>
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						navigate("/dashboard/settings");
					}}
					className="bg-yellow-25 text-black font-bold text-sm flex items-center gap-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-all duration-200"
				>
					Edit <RiEditBoxLine className="text-black text-lg" />
				</button>
			</div>
		</div>
	);
}

export default MyProfile;
