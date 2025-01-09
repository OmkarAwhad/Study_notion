import React, { useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { ImTree } from "react-icons/im";

function ExploreMoreCard({ item, currentCard, setCurrentCard }) {
	// console.log(currentCard);

	return (
		<div
			onClick={() => setCurrentCard(item.heading)}
			className={`bg-richblack-800 ${
				currentCard === item.heading
					? " bg-white shadow-[10px_10px] shadow-yellow-50 border border-richblack-100 "
					: " border border-richblack-600 "
			} flex flex-col items-start justify-between text-white py-5 px-7 h-[33vh] w-[20vw]`}
		>
			<div className={`flex flex-col gap-2 items-start `}>
				<h1
					className={`font-bold  ${
						currentCard === item.heading
							? "text-richblack-700 font-extrabold"
							: ""
					}`}
				>
					{item.heading}
				</h1>
				<p className=" text-start text-richblack-500 ">
					{item.description}
				</p>
			</div>

			<div className={`w-full`}>
				<div
					className={`border-t-2 border-dashed  w-full my-4 ${
						currentCard === item.heading
							? " border-blue-200 "
							: "border-richblack-500"
					}`}
				></div>
				<div
					className={`flex items-center justify-between w-full  `}
				>
					<p
						className={`flex gap-2 items-center text-richblack-200 ${
							currentCard === item.heading
								? " text-blue-200 "
								: ""
						}`}
					>
						<HiUserGroup />
						{item.level}
					</p>
					<p
						className={`flex gap-2 items-center text-richblack-200 ${
							currentCard === item.heading
								? " text-blue-200 "
								: ""
						}`}
					>
						<ImTree />
						{item.lessonNumber} Lessons
					</p>
				</div>
			</div>
		</div>
	);
}

export default ExploreMoreCard;
