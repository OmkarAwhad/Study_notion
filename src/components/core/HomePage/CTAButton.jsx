import React from "react";
import { Link } from "react-router-dom";

function CTAButton({ text, active, linkto }) {
	return (
		<Link to={linkto}>
			<div
				className={`px-4 border-r-[1px] flex items-center max-w-fit justify-center rounded-lg font-semibold border-b-[1px] transition-all duration-200 hover:scale-95 py-2 ${
					active
						? " bg-yellow-50 text-richblack-800 border-richblack-50 "
						: " bg-richblack-600 text-white border-richblack-200 "
				} `}
			>
				{text}
			</div>
		</Link>
	);
}

export default CTAButton;
