import React from "react";
import HighlightText from "../HomePage/HighlightText";

function Quote() {
	return (
		<div className="leading-[47px]">
			<span className="font-semibold mr-2 text-5xl text-richblack-600 ">
				“
			</span>
			We are passionate about revolutionizing the way we learn. Our
			innovative platform
			<HighlightText text={" combines technology"} />,
			<span className="text-transparent bg-clip-text bg-gradient-to-b from-[#d6956a] to-[#ff6f00] ">
				{" "}
				expertise
			</span>
			, and community to create an
			<span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f09711] to-[#f5bb1b] ">
				{" "}
				unparalleled educational experience.
			</span>
			<span className="font-semibold mr-2 text-5xl text-richblack-600 ">
				”
			</span>
		</div>
	);
}

export default Quote;
