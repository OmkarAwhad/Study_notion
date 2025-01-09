import React from "react";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
	position,
	heading,
	subheading,
	ctabtn1,
	ctabtn2,
	codeblock,
	backgroundGradient,
	codeColor,
}) {
	return (
		<div
			className={`w-full flex flex-col ${position} items-center justify-between `}
		>
			<div className=" w-full sm:w-[40%] ">
				<div className=" text-2xl sm:text-4xl font-bold mb-4 ">
					{heading}
				</div>
				<p className=" text-richblack-400 font-semibold text-base md:mb-12 ">
					{subheading}
				</p>
				<div className=" my-9 sm:mb-10 flex text-base items-center justify-center flex-row gap-10 ">
					<CTAButton
						text={ctabtn1.text}
						active={ctabtn1.active}
						linkto={ctabtn1.linkto}
					/>
					<CTAButton
						text={ctabtn2.text}
						active={ctabtn2.active}
						linkto={ctabtn2.linkto}
					/>
				</div>
			</div>
			<div className="w-full sm:w-[45%] text-sm flex flex-row bg-richblack-800 py-5 rounded px-1 ">
				{/* Bg gradient */}
				<div className="text-center flex flex-col w-[10%] text-richblack-400 text-xs md:text-base font-bold  ">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
					<p>12</p>
					<p>13</p>
					<p>14</p>
				</div>
				<div className="  sm:h-[34vh] mr-3 w-[1px] bg-richblack-700 "></div>
				<div
					className={`w-[90%] text-xs md:text-base flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 `}
				>
					<TypeAnimation
						sequence={[codeblock, 1000, ""]}
						repeat={Infinity}
						cursor={true}
						omitDeletionAnimation={true}
						style={{
							whiteSpace: "pre-line",
							display: "block",
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default CodeBlocks;
