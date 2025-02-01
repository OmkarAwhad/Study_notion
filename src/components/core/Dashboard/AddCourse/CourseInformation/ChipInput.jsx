import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

function ChipInput({
	label,
	name,
	placeholder,
	register,
	errors,
	setValue,
	getValues,
}) {
	const [singleTag, setSingleTag] = useState("");
	const [tagList, setTagList] = useState([]);

	useEffect(() => {
		register(name, {
			required: true,
			validate: (value) => value.length > 0,
		});
	}, []);

	useEffect(() => {
		setValue(name, tagList);
	}, [tagList]);

	const handleAddTag = (e) => {
		if (singleTag === "") return;
		if (e.key === "Enter") {
			e.preventDefault();
			setTagList([...tagList, singleTag]);
			setSingleTag("");
		}
	};

	const handleRemoveTag = (index) => {
		const newList = tagList.filter((item, i) => i !== index);
		setTagList(newList);
	};

	return (
		<div>
			<label>
				<p className="ml-2 text-sm ">
					{label} <sup className=" text-red-300 ">*</sup>
				</p>
				{tagList.length > 0 && (
					<div className="text-richblack-700 flex flex-wrap gap-3 my-2 ml-3 ">
						{tagList.map((item, index) => (
							<div
								key={index}
								className="px-2 py-1 bg-yellow-200 rounded-full w-fit flex gap-4 items-center "
							>
								{item}
								<ImCross
									onClick={() =>
										handleRemoveTag(index)
									}
									className="text-xs"
								/>
							</div>
						))}
					</div>
				)}

				<input
					type="text"
					placeholder={placeholder}
					value={singleTag}
					onChange={(e) => setSingleTag(e.target.value)}
					onKeyDown={handleAddTag}
					className="w-full mt-1 px-4 py-2 bg-richblack-700 rounded-md outline-none border-b border-richblack-200 "
				/>
				{errors[name] && (
					<span className="text-red-500">
						{name} is required
					</span>
				)}
			</label>
		</div>
	);
}

export default ChipInput;
