import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../assets/Images/timelineImage.png";

function TimeLineSection() {
	const timeLineData = [
		{
			title: "Leadership",
			description: "Fully committed to the success company",
			image: Logo1,
		},
		{
			title: "Responsibility",
			description: "Students will always be our top priority",
			image: Logo2,
		},
		{
			title: "Flexibility",
			description: "The ability to switch is an important skills",
			image: Logo3,
		},
		{
			title: "Solve the problem",
			description: "Code your way to a solution",
			image: Logo4,
		},
	];

	return (
		<div className="w-11/12 mx-auto flex flex-col gap-16 sm:gap-1 pb-10 sm:flex-row items-center justify-center sm:py-10">
			<div className="  sm:w-[45%] flex flex-col gap-10 ">
				{timeLineData.map((item, index) => {
					return (
						<div
							key={index}
							className="flex gap-5 items-center"
						>
							<img
								className=" mx-3 p-2 bg-richblack-5 rounded-full sm:w-[35px] my-2 "
								src={item.image}
							/>
							<div>
								<p className="font-semibold text-richblack-700 pb-2 ">
									{item.title}
								</p>
								<p className=" text-richblack-500 text-sm ">
									{item.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
			<div className="relative ">
				<img
					src={TimeLineImage}
					className="shadow-blue-200 shadow-[10px_-5px_50px_-5px]"
					alt=""
				/>
				<div className="absolute flex flex-col gap-4 sm:flex-row justify-between w-[60%] items-center p-10 bottom-1 bg-[#014A32] sm:-bottom-12 sm:left-1/2 sm:transform sm:-translate-x-1/2 ">
					<div className="flex gap-2 justify-between w-full sm:gap-5">
						<h1 className="text-3xl font-bold text-richblack-5 ">
							10
						</h1>
						<div className="flex flex-col">
							<p className="text-[#05A77B] text-sm ">
								YEARS
							</p>
							<p className="text-[#05A77B] text-sm ">
								EXPERIENCES
							</p>
						</div>
					</div>
					<div className="h-[5vh] hidden sm:block w-[0.5px] bg-[#05A77B] "></div>
					<div className="flex gap-2 justify-between w-full sm:gap-5">
						<h1 className="text-3xl font-bold text-richblack-5 ">
							250
						</h1>
						<div className="flex flex-col">
							<p className="text-[#05A77B] text-sm ">
								TYPES OF
							</p>
							<p className="text-[#05A77B] text-sm ">
								COURSES
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TimeLineSection;
