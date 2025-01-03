import React from "react";

function HighlightText({ text }) {
	return (
		<span className="text-transparent bg-clip-text bg-gradient-to-b from-[#3ebbff] to-[#64eddf] ">
			{" "}
			{text}
		</span>
	);
}

export default HighlightText;
