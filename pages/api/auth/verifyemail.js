import { isEmail } from "validator";
import userModel from "../../../models/userModel";

export default async function verifyEmail(req, res) {
    if (req.method === "POST") {
        const { otp, email } = req.body;

        if (!otp || !email)
            return res.status(400).json({ message: "all fields are required" });

        if (!email || !isEmail(email))
            return res
                .status(400)
                .json({ message: "Please provide valid email address" });

        try {
            const user = await userModel.findOne({ email: email });

            if (!user)
                return res.status(400).json({ message: "User not found!" });

            if (user.verified)
                return res
                    .status(400)
                    .json({ message: "User already verified!" });

            if (user.OTP !== otp)
                return res.status(400).json({ message: "Invalid OTP" });

            const updateUser = await userModel.updateOne(
                { email: user.email },
                {
                    $set: {
                        verified: true,
                    },
                    $unset: {
                        OTP: null,
                    },
                }
            );

            if (!updateUser) {
                return res
                    .status(500)
                    .json({ message: "Sorry! Couldn't verify your account!" });
            }

            return res.status(200).json({
                message:
                    "Successfully verified your account. You can Log in to your account",
            });
        } catch (error) {
            console.log(error.message);
            return res
                .status(500)
                .json({ message: "Oops! Something went wrong" });
        }
    } else {
        res.status(500).send("404");
    }
}
