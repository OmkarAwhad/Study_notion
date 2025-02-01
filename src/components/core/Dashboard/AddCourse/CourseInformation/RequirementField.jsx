import React, { useEffect, useState } from "react";

function RequirementField({
	label,
	name,
	placeholder,
	register,
	errors,
	setValue,
	getValues,
}) {
	const [singleReq, setSingleReq] = useState("");
	const [reqList, setReqList] = useState([]);

	useEffect(() => {
		register(name, {
			required: true,
			validate: (value) => value.length > 0,
		});
	}, []);

	useEffect(() => {
		setValue(name, reqList);
	}, [reqList]);

	const handleAddReq = () => {
		if (singleReq) {
			setReqList([...reqList, singleReq]);
			setSingleReq("");
		}
	};

	const handleRemoveReq = (index) => {
		const newList = reqList.filter((item, i) => i !== index);
		setReqList(newList);
	};

	return (
		<div>
			<label>
				<p className="ml-2 text-sm ">
					{label} <sup className=" text-red-300 ">*</sup>
				</p>
				<div>
					<input
						type="text"
						placeholder={placeholder}
						value={singleReq}
						onChange={(e) => setSingleReq(e.target.value)}
						className="w-full mt-1 px-4 py-2 bg-richblack-700 rounded-md outline-none border-b border-richblack-200 "
					/>
					<button
						type="button"
						onClick={handleAddReq}
						className=" font-medium text-sm ml-3 text-yellow-50"
					>
						Add
					</button>
				</div>
			</label>
			{reqList.length > 0 && (
				<div className=" leading-tight w-[20%] ml-4 ">
					{reqList.map((item, index) => (
						<div
							key={index}
							className="flex items-center gap-2 mt-2 justify-between text-sm "
						>
							<p className="font-semibold text-white ">
								{item}
							</p>
							<button
								type="button"
								onClick={() => handleRemoveReq(index)}
								className=" text-xs text-richblack-400 "
							>
								clear
							</button>
						</div>
					))}
				</div>
			)}
			{errors[name] && (
				<span className="text-red-500">{label} is required</span>
			)}
		</div>
	);
}

export default RequirementField;
