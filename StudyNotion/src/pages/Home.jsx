import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import "../App.css";
import Footer from "../components/common/Footer";
import BgHome from "../assets/Images/bghome.svg";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";

function Home() {
	return (
		<div>
			{/* Section 1 */}
			<div className=" relative z-10 mx-auto flex flex-col w-11/12 items-center text-white justify-between ">
				<Link to={"/sign-up"}>
					<div className="rounded-full mx-auto bg-richblack-700 font-bold transition-all border-b border-richblack-300 duration-200 hover:scale-95 text-white text-sm sm:text-xs w-fit px-4 py-2 m-4">
						<div className="flex justify-center items-center gap-2 ">
							<p>Become an Instructor</p>
							<FaArrowRight className="text-xs" />
						</div>
					</div>
				</Link>

				<div className=" text-3xl sm:text-4xl font-bold md:text-center mt-7">
					Empower your Future with
					<HighlightText text={"Coding Skills"} />
				</div>

				<p className="  md:text-center w-full text-base sm:w-7/12 my-6 font-semibold text-richblack-400 ">
					With our online coding courses, you can learn at your
					own pace, from anywhere in the world, and get access to
					a wealth of resources, including hands-on projects,
					quizzes, and personalized feedback from instructors.{" "}
				</p>

				<div className=" w-full sm:w-1/4 my-5 flex flex-row sm:justify-between justify-center gap-5 items-center sm:gap-10 ">
					<CTAButton
						text={"Learn More"}
						active={true}
						linkto={"/sign-up"}
					/>
					<CTAButton
						text={"Book a Demo"}
						active={false}
						linkto={"/login"}
					/>
				</div>

				<div className="shadow-blue-200 shadow-[10px_-5px_50px_-5px] w-[95%] md:w-[80%] my-10 relative ">
					<video
						muted
						loop
						autoPlay
						className="w-full shadow-[20px_20px_rgba(255,255,255)] mx-auto "
					>
						<source src={Banner} />
					</video>
					{/* <div className="absolute w-full top-5 -z-10 right-[120px] h-full bg-white "></div> */}
				</div>

				<div className=" md:w-9/12 my-10 sm:my-20">
					<CodeBlocks
						position="lg:flex-row"
						heading={
							<div className=" text-2xl sm:text-4xl font-semibold">
								Unlock your
								<HighlightText
									text={"coding potential "}
								/>
								with our online courses
							</div>
						}
						subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
						ctabtn1={{
							text: "Try it yourself",
							active: true,
							linkto: "/sign-up",
						}}
						ctabtn2={{
							text: "Learn More",
							active: false,
							linkto: "/login",
						}}
						codeblock={`<!DOCTYPE html>
                              <html>
                              <head>
                                 <title>Example</title>
                                 <link rel="stylesheet" href="styles.css" >
                              </head>
                              <body>
                              <h1><a href="/">Header</a></h1>
                              <nav>
                                 <a href="one/">One</a>
                                 <a href="two/">Two</a>
                                 <a href="three/">Three</a>
                              </nav>
                              </body>`}
						backgroundGradient={
							<div className=" codeblock1 absolute"></div>
						}
						codeColor={"text-yellow-300"}
					/>
				</div>

				<div className="  md:w-9/12 my-10 sm:my-20">
					<CodeBlocks
						position="lg:flex-row-reverse"
						heading={
							<div className="text-2xl sm:text-4xl font-semibold">
								Start
								<HighlightText
									text={"coding in seconds "}
								/>
							</div>
						}
						subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
						ctabtn1={{
							text: "Continue Lesson",
							active: true,
							linkto: "/sign-up",
						}}
						ctabtn2={{
							text: "Learn More",
							active: false,
							linkto: "/login",
						}}
						codeblock={`<!DOCTYPE html>
                              <html>
                              <head>
                                 <title>Example</title>
                                 <link rel="stylesheet" href="styles.css" >
                              </head>
                              <body>
                              <h1><a href="/">Header</a></h1>
                              <nav>
                                 <a href="one/">One</a>
                                 <a href="two/">Two</a>
                                 <a href="three/">Three</a>
                              </nav>
                              </body>`}
						backgroundGradient={
							<div className=" codeblock1 absolute"></div>
						}
						codeColor={"text-blue-100"}
					/>
				</div>
			</div>
			{/* Section 2 */}
			<div className="bg-white w-full mx-auto">
				<div className="w-full relative ">
					<img
						src={BgHome}
						alt=""
						className="w-full h-[45vh] object-cover "
					/>
					<div className="flex flex-col gap-5 sm:flex-row items-center justify-center sm:gap-20 absolute top-1/2 left-[28%] sm:left-[37%] ">
						<CTAButton
							text={"Explore Full Catalog"}
							active={true}
							linkto={"/sign-up"}
						/>
						<CTAButton
							text={"Learn More"}
							active={false}
							linkto={"/login"}
						/>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between sm:w-10/12 items-center py-20 mx-auto">
					<div className="text-4xl font-bold px-5 pb-4 sm:w-[40%] ">
						Get the skills you need for a{" "}
						<HighlightText text={"job that is in demand"} />
					</div>
					<div className=" px-5 sm:w-[40%] ">
						<p className="mb-10 text-richblack-500 font-medium ">
							The modern StudyNotion is the dictates its
							own terms. Today, to be a competitive
							specialist requires more than professional
							skills.
						</p>
						<CTAButton
							text={"Learn More"}
							active={true}
							linkto={"/sign-up"}
						/>
					</div>
				</div>

				<TimeLineSection />

				<LearningLanguageSection />
			</div>
			{/* Section 3 */}
			{/* Section 4 */}
			<Footer />
		</div>
	);
}

export default Home;
