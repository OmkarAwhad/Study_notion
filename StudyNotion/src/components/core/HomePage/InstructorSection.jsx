import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/CTAButton";

function InstructorSection() {
	return (
		<div className="w-full flex flex-col-reverse sm:flex-row gap-4 sm:gap-20 items-center justify-between ">
			<img
				src={Instructor}
				className=" sm:shadow-[-18px_-18px_rgba(255,255,255)] "
				alt=""
			/>
			<div className="flex flex-col gap-6 w-[95%] sm:w-[40%] text-white">
				<p className="text-4xl font-bold ">
					Become an <HighlightText text={"instructor"} />{" "}
				</p>
				<p className="text-richblack-400">
					Instructors from around the world teach millions of
					students on StudyNotion. We provide the tools and
					skills to teach what you love.
				</p>
				<div className="w-full">
					<CTAButton
						text={"Start Teaching Today"}
						active={true}
						linkto={"/sign-up"}
					/>
				</div>
			</div>
		</div>
	);
}

export default InstructorSection;
