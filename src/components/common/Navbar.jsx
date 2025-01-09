import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import LogoLight from "../../assets/Logo/Logo-Full-Light.png";
import LogoSmallLight from "../../assets/Logo/Logo-Small-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector.service";
import { categories } from "../../services/apis.service";

function Navbar() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	const [subLinks, setSubLinks] = useState([]);
	const fetchSubLinks = async () => {
		try {
			const result = await apiConnector(
				"GET",
				categories.CATEGORIES_API
			);
			// console.log(result.data.data);
			setSubLinks(result.data.data);
		} catch (error) {
			console.log("Could not fetch the category list");
		}
	};
	useEffect(() => {
		fetchSubLinks();
	}, []);

	const location = useLocation();
	const matchRoute = (route) => {
		return matchPath({ path: route }, location.pathname);
	};

	return (
		<div className=" flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700 ">
			<div className="w-10/12 text-richblack-100 mx-auto py-4 flex items-center justify-between ">
				<Link to={"/"}>
					<img
						src={LogoLight}
						className=" h-9 cursor-pointer "
						alt=""
					/>
				</Link>

				<div className="flex gap-8 ">
					{NavbarLinks.map((item, index) => (
						<div key={index}>
							{item.title === "Catalog" ? (
								<div className="relative">
									<div className="group">
										<div className=" flex items-center gap-2 ">
											<p className=" cursor-pointer">
												{item?.title}
											</p>
											<RiArrowDownWideFill className=" cursor-pointer" />
										</div>
										<div className="absolute group-hover:block transition-all duration-300 hidden -left-20 top-8 z-20">
											<div className="h-10 w-10 bg-richblack-300 rounded rotate-45 absolute left-[40%] -top-0 -z-10 "></div>
											<div className=" py-3 px-5 rounded-md w-[15vw] text-lg font-mono bg-richblack-300 text-black">
												{subLinks.map(
													(
														item,
														index
													) => (
														<div className="w-full hover:scale-105 hover:bg-richblack-400 transition-all duration-200 rounded-md cursor-pointer text-center ">
															<Link
																className="cursor-pointer"
																to={
																	`/catalog/${item.name}`
																}
															>
																{
																	item.name
																}
																{subLinks.length -
																	1 ===
																index ? null : (
																	<hr className="text-richblack-50" />
																)}
															</Link>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								</div>
							) : (
								<Link to={item?.path}>
									<p
										className={` cursor-pointer ${
											matchRoute(item?.path)
												? "text-yellow-50"
												: "text-richblack-100"
										}  `}
									>
										{item?.title}
									</p>
								</Link>
							)}
						</div>
					))}
				</div>

				<div>
					{user && user?.accountType !== "Instructor" && (
						<div className="flex gap-7 items-center  ">
							<button className="text-2xl ">
								<IoSearch className=" cursor-pointer " />
							</button>
							<Link
								className="text-xl relative  "
								to={"/dashboard/cart"}
							>
								{totalItems > 0 && (
									<span className="absolute text-xs bg-richblack-100 text-black -top-3 -right-1 font-bold h-4 flex items-center justify-center w-3 rounded-full ">
										0
									</span>
								)}

								<GrCart className=" cursor-pointer " />
							</Link>
							<div>
								<img
									src={LogoSmallLight}
									className="h-7 w-7 rounded-full object-cover cursor-pointer "
									alt=""
								/>
							</div>
						</div>
					)}

					{token === null && (
						<div className="flex gap-3">
							<Link to={"/login"}>
								<button className=" border px-3 py-1 rounded-md hover:bg-richblack-800 ">
									Log in
								</button>
							</Link>
							<Link to={"/sign-up"}>
								<button className=" border px-3 py-1 rounded-md hover:bg-richblack-800 ">
									Sign up
								</button>
							</Link>
						</div>
					)}

					{token !== null && <ProfileDropDown />}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
