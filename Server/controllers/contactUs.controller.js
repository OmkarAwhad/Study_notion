const { mailSender } = require("../utils/mailSender.utils");
const { contactUsEmail } = require("../mails/contactFormRes.templates");

module.exports.contactUs = async (req, res) => {
	try {
		const userId = req.user.id;

		const {
			firstName,
			lastName,
			email,
			contactNumber,
			message,
			countrycode,
		} = req.body;
		if (!firstName || !lastName || !email || !contactNumber || !message) {
			return res.status(400).json({
				error: "All fields are required",
			});
		}

		try {
			await mailSender(
				email,
				"Thanks for trusting",
				contactUsEmail(
					email,
					firstName,
					lastName,
					message,
					contactNumber,
					(countrycode = "")
				)
			);
		} catch (error) {
			return res.status(500).json({
				error: "Failed to send email",
			});
		}
	} catch (error) {
		console.log("Something went wrong in contact us controller ", error);
		return res.json(
			new ApiError(
				500,
				"Something went wrong in contact us controller "
			)
		);
	}
};
