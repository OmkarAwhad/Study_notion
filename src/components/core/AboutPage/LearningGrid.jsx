import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/CTAButton";
import { Link } from "react-router-dom";

const LearningGridArray = [
	{
		order: -1,
		heading: "World-Class Learning for",
		highlightText: "Anyone, Anywhere",
		description:
			"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
		BtnText: "Learn More",
		BtnLink: "/",
	},
	{
		order: 1,
		heading: "Curriculum Based on Industry Needs",
		description:
			"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
	},
	{
		order: 2,
		heading: "Our Learning Methods",
		description:
			"Our learning method combines flexible and practical approaches to ensure a comprehensive and engaging educational experience.",
	},
	{
		order: 3,
		heading: "Certification",
		description:
			"Studynotion provides industry-recognized certification to validate your new skills and enhance your career prospects.",
	},
	{
		order: 4,
		heading: `Rating "Auto-grading"`,
		description:
			"Studynotion’s auto-grading feature provides instant, objective feedback to help learners assess their understanding and progress efficiently.",
	},
	{
		order: 5,
		heading: "Ready to Work",
		description:
			"Studynotion equips learners with job-ready skills, preparing them to excel in the workforce.",
	},
];

function LearningGrid() {
	return (
		<div className=" w-full sm:w-9/12 mx-auto ">
			<div className="grid grid-cols-2 md:grid-cols-4 my-16 ">
				{LearningGridArray.map((item, index) => {
					if (item.order === -1) {
						return (
							<div
								key={index}
								className={` col-span-2 p-7 `}
							>
								<div className="mb-5">
									<h1
										className={` text-3xl font-bold mb-2 `}
									>
										{item.heading}
										<HighlightText
											text={item.highlightText}
										/>
									</h1>
									<p
										className={`text-richblack-300`}
									>
										{item.description}
									</p>
								</div>
								<CTAButton
									active={true}
									text={item.BtnText}
									linkto={item.BtnLink}
								/>
							</div>
						);
					} else {
						return (
							<div
								key={index}
								className={` h-[33vh]  p-3 md:p-7  ${
									item.order % 2 === 0
										? "bg-richblack-800"
										: "bg-richblack-700"
								} ${
									item.order === 3 &&
									"md:col-start-2"
								} `}
							>
								<h1
									className={`font-semibold text-richblack-100 mb-4 `}
								>
									{item.heading}
								</h1>
								<p className={`text-richblack-400`}>
									{item.description}
								</p>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}

export default LearningGrid;
