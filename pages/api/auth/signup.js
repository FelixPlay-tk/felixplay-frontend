import { connect, connection } from "mongoose";
import userModel from "../../../models/userModel";
import { isEmail, equals } from "validator";
import { sendVerificationLink } from "../../../config/mail";

export default async function signUp(req, res) {
    if (req.method === "POST") {
        const { firstname, lastname, email, password, confirmPassword } =
            req.body;

        if (!firstname || !lastname || !email || !password || !confirmPassword)
            return res.status(400).json({ message: "All fields are required" });

        if (!email || !isEmail(email))
            return res.json({ message: "Please provide valid email address" });

        if (!equals(password, confirmPassword))
            return res.status(400).json({ message: "Passwords do not match" });

        try {
            await connect(process.env.DB_URL);
            const checkExist = await userModel.findOne({ email: email });

            if (checkExist && !checkExist.verified) {
                return res.json({
                    message:
                        "We have sent an One Time Passcode to verify your account",
                });
            }

            if (checkExist && checkExist.verified)
                return res
                    .status(400)
                    .json({ message: "Email already registered!" });

            // initialize user model
            const newUser = new userModel({ firstname, lastname, email });

            // generating password hash
            newUser.hashPassword(password);

            // generating verification Token
            await newUser.generateOTP();

            // attempting to save on db
            const saveUser = await newUser.save();

            if (!saveUser)
                return res
                    .status(400)
                    .json({ message: "Oops! Something went wrong" });

            connection.close();

            sendVerificationLink(saveUser.email, saveUser.OTP)
                .then((result) => console.log(result))
                .catch((err) => console.log(err.message));

            return res.status(201).json({
                message:
                    "We have sent an One Time Passcode to verify your account",
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Oops! Something went wrong" });
        }
    } else {
        res.status(404).send("method not allowed");
    }
}
