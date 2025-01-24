import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingAPI.service";
import { setLoading } from "../../../../slices/profile.slice";

function ChangeProfilePicture() {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const fileInputRef = useRef();

	const dispatch = useDispatch();

	const [previewImage, setPreviewImage] = useState();
	const [image, setImage] = useState();

	const handleSelectBtn = () => {
		fileInputRef.current.click();
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewImage(reader.result);
		};
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			previewFile(file);
		}
	};

	const handleUpload = (e) => {
		try {
			const formData = new FormData();
			formData.append("displayPicture", image);

			setLoading(true);
			dispatch(updateDisplayPicture(formData, token)).then(() =>
				setLoading(false)
			);
		} catch (error) {
			console.log("ERROR MESSAGE - ", error.message);
		}
	};

	useEffect(() => {
		if (image) {
			previewFile(image);
		}
	}, [image]);

	return (
		<div className="w-full bg-richblack-800 px-5 py-4 rounded-md border-[0.1px] border-richblack-500 flex gap-7 items-center  ">
			<div>
				<img
					src={previewImage || user?.image}
					className=" w-[78px] rounded-full object-cover aspect-square "
					alt=""
				/>
			</div>
			<div className=" flex flex-col font-semibold text-base items-start  ">
				<h1 className="text-richblack-50 ">
					Change Profile Picture
				</h1>
				<div className="flex flex-row gap-4 text-sm items-center ">
					<input
						type="file"
						className="hidden"
						ref={fileInputRef}
						onChange={handleFileChange}
						accept="image/png , image/gif, image/jpeg"
					/>
					<button
						onClick={handleSelectBtn}
						className="bg-yellow-50 text-richblack-800 px-4 py-2 rounded-lg font-semibold  "
					>
						Select
					</button>
					<button
						onClick={handleUpload}
						className="text-richblack-50 bg-richblack-700 px-4 py-2 rounded-lg font-semibold mt-2 flex items-center gap-2  "
					>
						Upload <FiUpload className="text-lg" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChangeProfilePicture;
