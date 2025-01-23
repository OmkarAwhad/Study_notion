import React, { useState } from "react";
import { sidebarLinks } from "../../../../data/dashboard-links";
import { logout } from "../../../../services/operations/authAPI.service";
import { useDispatch, useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../../common/ConfirmationModal";

function SideBar() {
	const { user, loading: profileLoading } = useSelector(
		(state) => state.profile
	);
	const { loading: authLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [confirmationModal, setConfirmationModal] = useState(null);

	if (profileLoading || authLoading) {
		return (
			<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<div className=" flex min-w-[222px]	 flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 ">
			<div className="flex flex-col">
				{sidebarLinks.map((item) => {
					if (item.type && user.accountType !== item.type)
						return null;
					return <SideBarLink link={item} icon={item.icon} key={item.id} />;
				})}
			</div>

			<div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-400 "></div>

			<div className="flex flex-col">
				<SideBarLink icon= "VscSettingsGear"
					link={{
						name: "Settings",
						path: "/dashboard/settings",
						
						
					}}
				/>
				<button
					onClick={() =>
						setConfirmationModal({
							text1: "Are you sure?",
							text2: "U will be logged out",
							btn1: "Log Out",
							btn1Handler: () =>
								dispatch(logout(navigate)),
							btn1Active: true,
							btn2: "Cancel",
							btn2Handler: () =>
								setConfirmationModal(null),
							btn2Active: false,
						})
					}
				>
					<div className=" flex items-center gap-x-2 pl-8 mt-2 ">
						<VscSignOut className=" text-lg " />
						<span className="text-sm">Logout</span>
					</div>
				</button>
			</div>
			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</div>
	);
}

export default SideBar;
