import { sendVerificationLink } from "../../../config/mail";
import { isEmail } from "validator";
import userModel from "../../../models/userModel";

export default async function resendOTP(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;

        if (!email || !isEmail(email))
            return res
                .status(400)
                .json({ message: "Please provide valid email address" });

        try {
            const user = await userModel.findOne({ email });

            if (!user)
                return res.status(400).json({ message: "No user found!" });

            if (user.verified)
                return res
                    .status(400)
                    .json({ message: "User already verified" });

            sendVerificationLink(user.email, user.OTP);

            res.json({
                message: "OTP Resent",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Oops! Something went wrong",
                error: error.message,
            });
        }
    } else {
        res.status(404).send("method not allowed");
    }
}
