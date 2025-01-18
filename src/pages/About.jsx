import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import AboutUsImage1 from "../assets/Images/aboutus1.webp";
import AboutUsImage2 from "../assets/Images/aboutus2.webp";
import AboutUsImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Quote from "../components/core/AboutPage/Quote";
import Footer from "../components/common/Footer";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";

function About() {
   return (
      <div className="text-white w-full h-full mx-auto ">
         {/* Section 1 */}
         <div className="w-full bg-richblack-800 pt-14 pb-8 sm:pb-56 ">
            <div className="w-10/12 relative mx-auto flex flex-col gap-8 items-center justify-center ">
               <p className="text-richblack-100 text-sm">About us</p>
               <div className="flex flex-col gap-2 items-center ">
                  <p className="sm:text-4xl text-3xl font-bold sm:w-2/3 text-center ">
                     Driving Innovation in Online Education for a
                     <HighlightText text={" Brighter Future"} />
                  </p>
                  <p className="sm:w-3/5 mt-4 text-center text-richblack-200 text-sm ">
                     Studynotion is at the forefront of driving
                     innovation in online education. We're
                     passionate about creating a brighter future
                     by offering cutting-edge courses, leveraging
                     emerging technologies, and nurturing a
                     vibrant learning community.
                  </p>
               </div>

               <div className="flex sm:flex-row flex-col w-full mx-auto items-center justify-center gap-6 sm:absolute top-[120%] ">
                  <img
                     src={AboutUsImage1}
                     className="sm:w-[28%]"
                     alt=""
                  />
                  <img
                     src={AboutUsImage2}
                     className="sm:w-[28%]"
                     alt=""
                  />
                  <img
                     src={AboutUsImage3}
                     className="sm:w-[28%]"
                     alt=""
                  />
               </div>
            </div>
         </div>

         {/* Section 2 */}
         <div className="sm:w-10/12 mx-auto text-3xl sm:text-4xl font-semibold text-richblack-200 mt-20 sm:mt-44 mb-24 text-center ">
            <Quote />
         </div>

         {/* Section 3 */}
         <div className="w-11/12 sm:w-9/12 mx-auto flex flex-col mb-24 gap-10 items-center justify-between sm:flex-row ">
            <div className="flex flex-col sm:w-[45%] gap-8">
               <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-2xl sm:text-4xl font-semibold text-transparent lg:w-[70%]">
                  Our Founding Story
               </h1>
               <div className="flex flex-col gap-3 text-justify text-richblack-200">
                  <p>
                     Our e-learning platform was born out of a
                     shared vision and passion for transforming
                     education. It all began with a group of
                     educators, technologists, and lifelong
                     learners who recognized the need for
                     accessible, flexible, and high-quality
                     learning opportunities in a rapidly evolving
                     digital world.
                  </p>
                  <p>
                     As experienced educators ourselves, we
                     witnessed firsthand the limitations and
                     challenges of traditional education systems.
                     We believed that education should not be
                     confined to the walls of a classroom or
                     restricted by geographical boundaries. We
                     envisioned a platform that could bridge these
                     gaps and empower individuals from all walks
                     of life to unlock their full potential.
                  </p>
               </div>
            </div>
            <div className="">
               <img src={FoundingStory} alt="" />
            </div>
         </div>

         {/* Section 4 */}
         <div className="w-11/12 sm:w-9/12 mx-auto flex flex-col mb-10 sm:mb-24 gap-4 sm:gap-16 sm:flex-row items-center justify-between ">
            <div>
               <h1 className="text-3xl items-start font-bold">
                  <HighlightText text={"Our Vision"} />
               </h1>
               <p className=" text-richblack-200 text-justify my-3 ">
                  With this vision in mind, we set out on a journey
                  to create an e-learning platform that would
                  revolutionize the way people learn. Our team of
                  dedicated experts worked tirelessly to develop a
                  robust and intuitive platform that combines
                  cutting-edge technology with engaging content,
                  fostering a dynamic and interactive learning
                  experience.
               </p>
            </div>
            <div>
               <h1 className="text-transparent items-start bg-clip-text bg-gradient-to-b text-3xl font-bold from-[#d6956a] to-[#ff6f00] ">
                  Our Mission
               </h1>
               <p className=" text-richblack-200 text-justify my-3 ">
                  Our mission goes beyond just delivering courses
                  online. We wanted to create a vibrant community of
                  learners, where individuals can connect,
                  collaborate, and learn from one another. We
                  believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit
                  of collaboration through forums, live sessions,
                  and networking opportunities.
               </p>
            </div>
         </div>

         {/* Section 5 */}
         <Stats />

         {/* Section 6 */}
         <LearningGrid />

         {/* Section 7 */}
         <ContactFormSection/>

         {/* Section 8 */}
         <div className="h-[100px]"> Review Slider</div>

         {/* Section 9 */}
         <Footer />
      </div>
   );
}

export default About;
