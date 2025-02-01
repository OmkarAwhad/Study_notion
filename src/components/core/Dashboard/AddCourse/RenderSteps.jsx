import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseInformation/CourseInformationForm";
import CoursePublish from "./CoursePublish";

function RenderSteps() {
	const { step } = useSelector((state) => state.course);

	const stepSlider = [
		{
			id: 1,
			title: "Course Information",
		},
		{
			id: 2,
			title: "Course Builder",
		},
		{
			id: 3,
			title: "Course Publish",
		},
	];

	return (
		<>
			<div className="flex justify-between items-center gap-4 w-[80%] mx-auto mt-7 ">
				{stepSlider.map((item, index) => (
					<div key={index} className="flex flex-col items-center gap-2  ">
						<div
							className={` border-2 rounded-full h-8 w-8 flex items-center justify-center font-medium  ${
								step === item.id
									? "bg-yellow-800 border-yellow-50 text-yellow-50 "
									: "bg-richblack-800 border-richblack-100 "
							} `}
						>
							{step > item.id ? <FaCheck /> : item.id}
						</div>
						<div className="text-sm text-richblack-200">
							{item.title}
						</div>
					</div>
				))}
			</div>
			{step === 1 && <CourseInformationForm />}
			{step === 2 && <CourseBuilderForm />}
			{step === 3 && <CoursePublish />}
		</>
	);
}

export default RenderSteps;
