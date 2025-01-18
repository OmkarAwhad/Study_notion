import React from "react";

const StatsArray = [
	{ count: "5K", label: "Active Students" },
	{ count: "10+", label: "Mentors" },
	{ count: "200+", label: "Courses" },
	{ count: "50+", label: "Awards" },
];

function Stats() {
	return (
		<div className="w-full bg-richblack-800 ">
			<div className="w-11/12 sm:w-9/12 py-10 sm:py-20 mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 ">
				{StatsArray.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-center"
					>
						<p className="text-2xl font-bold text-center mb-2 ">
							{item.count}
						</p>
						<p className="text-richblack-200">{item.label}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Stats;
