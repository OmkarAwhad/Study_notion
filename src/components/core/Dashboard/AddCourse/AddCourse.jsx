import React from "react";
import RenderSteps from "./RenderSteps";

function AddCourse() {
	return (
		<div className="flex justify-center gap-10 items-start w-[75vw] my-10 ">
			<div className=" w-[65%] mx-10 ">
				<h1 className="font-bold text-2xl mb-4 ">Add Course</h1>
				<div>
					<RenderSteps />
				</div>
			</div>
			<div className="bg-richblack-800 p-4 rounded-md w-[35%] flex flex-col gap-5 border-[0.2px] border-richblack-700 ">
				<p className="text-lg font-semibold ">
					⚡Course Upload Tips
				</p>
				<ul className=" list-disc ml-4 flex flex-col gap-2 text-sm text-richblack-200  ">
					<li>Set the Course Price option or make it free.</li>
					<li>
						Standard size for the course thumbnail is
						1024x576.
					</li>
					<li>
						Video section controls the course overview video.
					</li>
					<li>
						Course Builder is where you create & organize a
						course.
					</li>
					<li>
						Add Topics in the Course Builder section to create
						lessons, quizzes, and assignments.
					</li>
					<li>
						Information from the Additional Data section shows
						up on the course single page.
					</li>
					<li>Make Announcements to notify any important</li>
					<li>Notes to all enrolled students at once.</li>
				</ul>
			</div>
		</div>
	);
}

export default AddCourse;
