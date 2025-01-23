import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../components/core/Dashboard/SideBar/SideBar";

function Dashboard() {
	const { loading: authLoading } = useSelector((state) => state.auth);
	const { loading: profileLoading } = useSelector((state) => state.profile);

	if (profileLoading || authLoading) {
		return (
			<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<div className=" text-white relative min-h-[calc(100vh-3.5rem)] flex ">
			<SideBar />
			<div className="h-full ">
				<div className="w-11/12 mx-auto max-w-[1000px] ">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
