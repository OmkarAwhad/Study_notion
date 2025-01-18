import React from "react";
import ContactUsForm from "../ContactPage/ContactUsForm";

function ContactFormSection() {
	return (
		<div className="text-white sm:w-9/12 w-full my-36 mx-auto flex items-center justify-center ">
			<div className="sm:w-[35%] flex flex-col gap-7 ">
				<div className="w-full text-center">
					<h1 className="font-semibold text-3xl mb-1">
						Get in Touch
					</h1>
					<p className="text-richblack-100">
						We’d love to here for you, Please fill out this
						form.
					</p>
				</div>
				<ContactUsForm />
			</div>
		</div>
	);
}

export default ContactFormSection;
