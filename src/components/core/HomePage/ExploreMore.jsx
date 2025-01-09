import React, { useEffect, useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import ExploreMoreCard from "./ExploreMoreCard";

function ExploreMore() {
	const [tab, setTab] = useState(HomePageExplore[0].tag);
	const [data, setData] = useState(HomePageExplore[0].courses);
	const [currentCard, setCurrentCard] = useState(
		HomePageExplore[0].courses[0].heading
	);

	const changeData = (tab) => {
		setData(HomePageExplore.find((item) => item.tag === tab).courses);
		setCurrentCard(
			HomePageExplore.find((item) => item.tag === tab).courses[0]
				.heading
		);
	};

	useEffect(() => {
		changeData(tab);
	}, [tab]);

	return (
		<div className="w-full relative mx-auto text-center flex flex-col items-center pt-10 ">
			<p className="text-4xl font-bold pb-2 ">
				Unlock the <HighlightText text={"Power of Code"} />{" "}
			</p>
			<p className=" text-richblack-400 pb-3 ">
				Learn to Build Anything you can imagine
			</p>
			<div className=" flex flex-row py-2 mb-48 px-3 bg-richblack-800 rounded-full ">
				{HomePageExplore.map((item, index) => (
					<div
						key={index}
						onClick={() => setTab(item.tag)}
						className={`  cursor-pointer py-2 px-4 text-richblack-200 ${
							tab === item.tag
								? " bg-richblack-700 border-[0.1px] border-richblack-500 text-richblack-5 rounded-full transition-all duration-200 "
								: " "
						} `}
					>
						{item.tag}
					</div>
				))}
			</div>
			<div className="absolute flex gap-10 -bottom-1/3 justify-between items-center ">
				{data.map((item, index) => (
					<ExploreMoreCard
						key={index}
						item={item}
						currentCard={currentCard}
						setCurrentCard={setCurrentCard}
					/>
				))}
			</div>
		</div>
	);
}

export default ExploreMore;
