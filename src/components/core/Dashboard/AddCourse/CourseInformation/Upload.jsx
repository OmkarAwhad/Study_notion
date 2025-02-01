import React, { useEffect, useState } from "react";
import { GrCloudUpload } from "react-icons/gr";

function Upload({ label, name, register, errors, setValue, getValues }) {
	const [preview, setPreview] = useState(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		register(name, { required: true });
	}, []);

	useEffect(() => {
		setValue(name, image);
	}, [image]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<p className="ml-2 text-sm mb-2">
				{label} <sup className="text-red-300">*</sup>
			</p>
			<label
				htmlFor="file-upload"
				className="h-[200px] flex flex-col items-center justify-center bg-richblack-700 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 cursor-pointer hover:scale-[99.5%] transition-all duration-200"
			>
				{preview ? (
					<img
						src={preview}
						alt="Preview"
						className="h-full w-full object-cover rounded-lg"
					/>
				) : (
					<div className="flex flex-col items-center">
						<div className="w-10 h-10 border-2 border-yellow-50 rounded-full flex items-center justify-center">
							<GrCloudUpload className="text-yellow-50" />
						</div>
						<p className="mt-2 text-sm">
							Drag and drop an image, or{" "}
							<span className="text-yellow-400 font-semibold">
								Browse
							</span>
						</p>
						<p className="text-xs mt-1">
							Max 6MB each (12MB for videos)
						</p>
					</div>
				)}
				<input
					id="file-upload"
					type="file"
					className="hidden"
					// value={image}
					onChange={handleFileChange}
				/>
			</label>
			{errors[name] && (
				<p className="text-red-500 text-xs mt-1">
					{errors[name].message}
				</p>
			)}
		</div>
	);
}

export default Upload;
