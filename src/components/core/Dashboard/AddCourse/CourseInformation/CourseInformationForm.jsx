import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	addCourseDetails,
	editCourseDetails,
	fetchCourseCategories,
} from "../../../../../services/operations/courseDetailAPI.service";
import { FaRupeeSign } from "react-icons/fa";
import { setCourse, setStep } from "../../../../../slices/course.slice";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementField from "./RequirementField";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants.utils";

function CourseInformationForm() {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const { course, editCourse } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);

	const [loading, setLoading] = useState(false);
	const [courseCategories, setCourseCategories] = useState([]);

	const getCategories = async () => {
		setLoading(true);
		const response = await fetchCourseCategories();
		if (response.length > 0) {
			setCourseCategories(response);
		}
		setLoading(false);
	};
	useEffect(() => {
		if (editCourse) {
			setValue("courseTitle", course.courseName);
			setValue("courseDescription", course.courseDescription);
			setValue("coursePrice", course.price);
			setValue("courseTags", course.tags);
			setValue("courseBenefits", course.whatWillYouLearn);
			setValue("courseCategory", course.category);
			setValue("courseImage", course.thumbNailImage);
			setValue("courseRequirements", course.instructions);
		}

		getCategories();
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();
		if (
			currentValues.courseTitle !== course.courseName ||
			currentValues.courseDescription !== course.courseDescription ||
			currentValues.coursePrice !== course.price ||
			currentValues.courseTags.toString() !== course.tags.toString() ||
			currentValues.courseBenefits !== course.whatWillYouLearn ||
			currentValues.courseCategory._id !== course.category._id ||
			currentValues.courseImage !== course.thumbNailImage ||
			currentValues.courseRequirements.toString() !==
				course.instructions.toString()
		) {
			return true;
		} else {
			return false;
		}
	};

	const onSubmitHandler = async (data) => {
		if (editCourse) {
			if (isFormUpdated()) {
				const currentValues = getValues();
				const formData = new FormData();

				formData.append("courseId", course._id);
				if (currentValues.courseTitle !== course.courseName) {
					formData.append("courseName", data.courseTitle);
				}
				if (
					currentValues.courseDescription !==
					course.courseDescription
				) {
					formData.append(
						"courseDescription",
						data.courseDescription
					);
				}
				if (currentValues.coursePrice !== course.price) {
					formData.append("price", data.coursePrice);
				}
				if (
					currentValues.courseBenefits !==
					course.whatWillYouLearn
				) {
					formData.append(
						"whatWillYouLearn",
						data.courseBenefits
					);
				}
				if (
					currentValues.courseTags.toString() !==
					course.tags.toString()
				) {
					formData.append(
						"tags",
						JSON.stringify(data.courseTags)
					);
				}
				if (
					currentValues.courseCategory._id !==
					course.category._id
				) {
					formData.append("category", data.courseCategory);
				}
				if (currentValues.courseImage !== course.thumbNailImage) {
					formData.append("thumbNailImage", data.courseImage);
				}
				if (
					currentValues.courseRequirements.toString() !==
					course.instructions.toString()
				) {
					formData.append(
						"instructions",
						JSON.stringify(data.courseRequirements)
					);
				}

				setLoading(true);
				const result = await editCourseDetails(formData, token);
				setLoading(false);
				if (result) {
					dispatch(setStep(2));
					dispatch(setCourse(result));
				}
			} else {
				toast.error("No changes made to the form");
			}
			return;
		}

		const formData = new FormData();
		formData.append("courseName", data.courseTitle);
		formData.append("courseDescription", data.courseDescription);
		formData.append("price", data.coursePrice);
		formData.append("tag", JSON.stringify(data.courseTags));
		formData.append("whatWillYouLearn", data.courseBenefits);
		formData.append("category", data.courseCategory);
		formData.append("status", COURSE_STATUS.DRAFT);
		formData.append(
			"instructions",
			JSON.stringify(data.courseRequirements)
		);
		formData.append("thumbNailImage", data.courseImage);
		setLoading(true);
		const result = await addCourseDetails(formData, token);
		if (result) {
			dispatch(setStep(2));
			dispatch(setCourse(result));
		}
		setLoading(false);
		console.log("CourseInformationForm -> ", result);
		// console.log("Form data , ");
		// formData.forEach((value, key) => {
		//    console.log(`${key}:`, value);
		// });
	};

	return (
		<form
			action=""
			onSubmit={handleSubmit(onSubmitHandler)}
			className="bg-richblack-800 px-5 py-7 mt-10 rounded-lg text-richblack-50 flex flex-col gap-6 "
		>
			<label>
				<p className="ml-2 text-sm ">
					Course Title <sup className=" text-red-300 ">*</sup>
				</p>
				<input
					type="text"
					placeholder="Enter Course Title"
					{...register("courseTitle", { required: true })}
					className="w-full mt-1 px-4 py-2 bg-richblack-700 rounded-md outline-none border-b border-richblack-200 "
				/>
				{errors.courseTitle && (
					<span className="text-red-500">
						Course Title is required
					</span>
				)}
			</label>
			<label>
				<p className="ml-2 text-sm ">
					Course Description{" "}
					<sup className=" text-red-300 ">*</sup>
				</p>
				<textarea
					type="text"
					placeholder="Enter Course Description"
					{...register("courseDescription", {
						required: true,
					})}
					className="w-full mt-1 px-4 py-2 bg-richblack-700 rounded-md outline-none border-b border-richblack-200 max-h-32 min-h-28  "
				/>
				{errors.courseDescription && (
					<span className="text-red-500">
						Course Description is required
					</span>
				)}
			</label>
			<label>
				<p className="ml-2 text-sm ">
					Price <sup className=" text-red-300 ">*</sup>
				</p>
				<div className="w-full mt-1 px-4 py-2 bg-richblack-700 rounded-md border-b border-richblack-200 flex items-center gap-3 ">
					<FaRupeeSign className="text-lg" />
					<input
						type="number"
						placeholder="Enter Course Price"
						{...register("coursePrice", {
							required: true,
							valueAsNumber: true,
						})}
						className="w-full bg-transparent outline-none "
					/>
				</div>
				{errors.coursePrice && (
					<span className="text-red-500">Price is required</span>
				)}
			</label>
			<label>
				<p className="ml-2 text-sm ">
					Category <sup className=" text-red-300 ">*</sup>
				</p>
				<select
					placeholder="Choose a Category"
					defaultValue=""
					{...register("courseCategory", {
						required: true,
					})}
					className="w-full mt-1 px-4 py-2 bg-richblack-700 rounded-md outline-none border-b border-richblack-200 "
				>
					<option value="" disabled>
						Choose a Category
					</option>
					{!loading &&
						courseCategories?.map((category,index) => (
							<option
								key={index}
								value={category._id}
							>
								{category.name}
							</option>
						))}
				</select>
				{errors.courseCategory && (
					<span className="text-red-500">
						Category is required
					</span>
				)}
			</label>
			<ChipInput
				label="Tag"
				name="courseTags"
				placeholder="Enter Course Tags and press enter"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>
			<Upload
				label="Upload thumbNailImage"
				name="courseImage"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>
			<label>
				<p className="ml-2 text-sm ">
					Course Benifits <sup className=" text-red-300 ">*</sup>
				</p>
				<textarea
					type="text"
					placeholder="Enter Course Benifits"
					{...register("courseBenefits", {
						required: true,
					})}
					className="w-full mt-1 px-4 py-2 bg-richblack-700 rounded-md outline-none border-b border-richblack-200 max-h-32 min-h-28  "
				/>
				{errors.courseBenefits && (
					<span className="text-red-500">
						Course Benifits is required
					</span>
				)}
			</label>
			<RequirementField
				label="Requirements/Instructions"
				name="courseRequirements"
				placeholder="Enter Course Requirements/Instructions"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>

			<div className="flex w-full justify-end pr-5 pt-3 ">
				{editCourse && (
					<button
						className="text-white "
						onClick={() => dispatch(setStep(2))}
					>
						Continue without Saving
					</button>
				)}
				<button
					className={`px-4 border-r-[1px] flex items-center max-w-fit justify-center rounded-lg font-semibold border-b-[1px] transition-all duration-200 hover:scale-95 py-2 bg-yellow-50 text-richblack-800 border-richblack-50  `}
				>
					{editCourse ? "Save Changes" : "Next"}
				</button>
			</div>
		</form>
	);
}

export default CourseInformationForm;
