import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
	"Articles",
	"Blog",
	"Chart Sheet",
	"Code challenges",
	"Docs",
	"Projects",
	"Videos",
	"Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Company = ["About", "Careers", "Affiliates"];

const Footer = () => {
	return (
		<div className=" bg-richblack-800">
			<div className="flex flex-col sm:flex-row w-full px-4 sm:w-[80%] mx-auto py-10 lg:border-b lg:border-richblack-300 ">
				{/* Section 1 */}
				<div className="flex gap-12 lg:border-r sm:pr-20 py-12 lg:border-richblack-700">
					{/* Box 1 */}
					<div className="flex flex-col w-[30%] lg:w-[30%] mb-7 lg:pl-0 gap-3">
						<Link to={"/"}>
							<img src={Logo} />
						</Link>

						<div>
							<h1 className=" text-richblack-200 text-xl font-semibold mb-3 ">
								Company
							</h1>
							{Company.map((item, index) => {
								return (
									<div
										key={index}
										className=" text-richblack-200 py-1 text-sm "
									>
										<Link to={item.toLowerCase()}>
											{item}
										</Link>
									</div>
								);
							})}
						</div>

						<div className="flex gap-3 text-2xl text-richblack-200 ">
							<FaFacebook />
							<FaGoogle />
							<FaTwitter />
							<FaYoutube />
						</div>
					</div>

					{/* Box 2 */}
					<div className="flex flex-col gap-7">
						<div>
							<h1 className=" text-richblack-200 text-xl font-semibold mb-3 ">
								Resources
							</h1>
							<div>
								{Resources.map((item, index) => {
									return (
										<div
											key={index}
											className=" text-richblack-200 py-1 text-sm "
										>
											<Link
												to={item
													.split(" ")
													.join("-")
													.toLowerCase()}
											>
												{item}
											</Link>
										</div>
									);
								})}
							</div>
						</div>

						<div>
							<h1 className=" text-richblack-200 text-xl font-semibold mb-3">
								Support
							</h1>
							<div className=" text-richblack-200 py-1">
								<Link to={"/help-center"}>
									Help Center
								</Link>
							</div>
						</div>
					</div>

					{/* Box 3 */}
					<div className="flex flex-col gap-7">
						<div>
							<h1 className=" text-richblack-200 text-xl font-semibold mb-3 ">
								Plans
							</h1>
							<div>
								{Plans.map((item, index) => {
									return (
										<div
											key={index}
											className=" text-richblack-200 py-1 text-sm "
										>
											<Link
												to={item
													.split(" ")
													.join("-")
													.toLowerCase()}
											>
												{item}
											</Link>
										</div>
									);
								})}
							</div>
						</div>

						<div>
							<h1 className=" text-richblack-200 text-xl font-semibold mb-3 ">
								Community
							</h1>
							<div>
								{Community.map((item, index) => {
									return (
										<div
											key={index}
											className=" text-richblack-200 py-1 text-sm "
										>
											<Link
												to={item
													.split(" ")
													.join("-")
													.toLowerCase()}
											>
												{item}
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				{/* Section 2 */}
				<div className="sm:pl-16 pt-4 sm:pt-12">
					<div className="flex lg:flex-row gap-12">
						{FooterLink2.map((item, index) => {
							return (
								<div
									key={index}
									className="w-[48%] lg:w-[30%] mb-7 lg:pl-0"
								>
									<h1 className=" text-richblack-200 text-xl font-semibold mb-5 ">
										{item.title}
									</h1>
									<div className=" text-richblack-200 py-1 flex text-sm  flex-col gap-2">
										{item.links.map((elm, i) => {
											return (
												<div key={i}>
													<Link
														to={
															elm.link
														}
													>
														{
															elm.title
														}
													</Link>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Bottom part */}
			<div className="flex flex-wrap gap-2 lg:flex-row justify-between text-richblack-200 w-[80%] mx-auto py-8">
				<div className="flex lg:flex-row py-1 ">
					{BottomFooter.map((item, index) => {
						return (
							<div
								key={index}
								className=" lg:border-r lg:border-richblack-50 px-3 "
							>
								<Link
									to={item
										.split(" ")
										.join("-")
										.toLowerCase()}
								>
									{item}
								</Link>
							</div>
						);
					})}
				</div>

				<div className="text-center">
					Made with ❤️ CodeHelp © 2023 Studynotion
				</div>
			</div>
		</div>
	);
};

export default Footer;
