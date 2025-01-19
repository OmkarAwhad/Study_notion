import React from "react";
import { IoChatbubbles } from "react-icons/io5";
import { HiGlobeEuropeAfrica } from "react-icons/hi2";
import { MdCall } from "react-icons/md";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import Footer from "../components/common/Footer";

function ContactUs() {
	return (
		<div className="text-richblack-200 w-full h-full">
			<div className="sm:w-9/10 mx-auto   ">
				<div className=" flex items-start my-20 justify-center gap-10 ">
					<div className="flex flex-col gap-5 bg-richblack-800 py-5 px-7 rounded-md w-[25%] ">
						<div className="flex gap-3 items-start  ">
							<IoChatbubbles className="text-xl mt-1 " />
							<div className=" ">
								<h1 className="font-semibold text-base">
									Chat on us
								</h1>
								<p className="text-xs">
									Our friendly team is here to help.
								</p>
								<p className="text-xs">@mail address</p>
							</div>
						</div>
						<div className="flex gap-3 items-start  ">
							<HiGlobeEuropeAfrica className="text-xl mt-1 " />
							<div className=" ">
								<h1 className="font-semibold text-base">
									Visit us
								</h1>
								<p className="text-xs">
									Come and say hello at our office
									HQ..
								</p>
								<p className="text-xs">
									Here is the location/ address
								</p>
							</div>
						</div>
						<div className="flex gap-3 items-start  ">
							<MdCall className="text-xl mt-1 " />
							<div className=" ">
								<h1 className="font-semibold text-base">
									Chat on us
								</h1>
								<p className="text-xs">
									Mon - Fri From 8am to 5pm.
								</p>
								<p className="text-xs">+123 456 7890</p>
							</div>
						</div>
					</div>
					<div className="p-10 border w-[40%] border-richblack-200 rounded-lg">
						<h1 className="text-3xl font-bold text-white mb-3 ">
							Got a Idea? We’ve got the skills. Let’s team
							up
						</h1>
						<p className="text-sm mb-7 ">
							Tall us more about yourself and what you’re
							got in mind.
						</p>
						<ContactUsForm />
					</div>
				</div>

				{/* Reviews */}
				<div className="text-white text-2xl font-bold">Reviews</div>
			</div>

			<Footer />
		</div>
	);
}

export default ContactUs;
