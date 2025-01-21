import React from "react";

function ConfirmationModal({ modalData }) {
	return (
		<div className="w-full h-screen flex items-center justify-center ">
			<div>
				<p className="text-white font-semibold text-lg ">
					{modalData.text1}
				</p>
				<p className="text-richblack-300 text-sm ">
					{modalData.text2}
				</p>
				<div>
					<button
						onClick={modalData.btn1Handler}
						className={` ${
							modalData.btn1Active
								? "bg-yellow-50 text-richblack-900 "
								: "bg-richblack-700 text-white"
						} px-4 py-2 rounded-md text-medium `}
					>
						{modalData.btn1}
					</button>

					<button
						onClick={modalData.btn2Handler}
						className={` ${
							modalData.btn2Active
								? "bg-yellow-50 text-richblack-900 "
								: "bg-richblack-700 text-white"
						} px-4 py-2 rounded-md text-medium `}
					>
						{modalData.btn2}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationModal;
