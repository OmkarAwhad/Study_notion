import React from "react";
import HighlightText from "./HighlightText";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import CTAButton from "./CTAButton";

function LearningLanguageSection() {
	return (
		<div className="w-10/12 mx-auto flex flex-col sm:items-center py-10 sm:py-20 ">
			<p className=" text-3xl sm:text-4xl font-bold pb-4  ">
				Your swiss knife for
				<HighlightText text={"learning any language"} />
			</p>
			<p className=" sm:w-1/2 pb-4 sm:text-center ">
				Using spin making learning multiple languages easy. with 20+
				languages realistic voice-over, progress tracking, custom
				schedule and more.
			</p>
			<div className=" my-4 flex flex-col relative ">
				<img
					src={Know_your_progress}
					alt=""
					className=" object-contain sm:absolute sm:-left-[65%] sm:top-16 "
				/>
				<img
					src={Compare_with_others}
					alt=""
					className=" object-contain  "
				/>
				<img
					src={Plan_your_lessons}
					alt=""
					className=" object-contain sm:absolute sm:-right-3/4 "
				/>
			</div>
			<CTAButton
				text={"Learn More"}
				active={true}
				linkto={"/sign-up"}
			/>
		</div>
	);
}

export default LearningLanguageSection;
