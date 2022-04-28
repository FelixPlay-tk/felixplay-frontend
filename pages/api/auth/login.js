import jwt from "jsonwebtoken";
import { isEmail } from "validator";
import userModel from "../../../models/userModel";

export default async function login(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !isEmail(email))
            return res.json({ message: "Please provide valid email address" });

        if (!password || password.length < 6)
            return res.json({ message: "Password must be 6 characters long" });

        try {
            const user = await userModel.findOne({ email });
            if (!user)
                return res
                    .status(404)
                    .json({ message: "Invalid email address!" });

            if (!user.verified)
                return res.status(400).json({
                    message: "Please verify your email before logging in!",
                });
            const checkPassword = await user.verifyPassword(password);

            if (!checkPassword)
                return res.status(403).json({ message: "Incorrect Password!" });

            const JWT_TOKEN = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            );

            return res
                .status(200)
                .json({ JWT_TOKEN, message: "Login Successfull" });
        } catch (error) {
            console.log(error.message);
            return res
                .status(500)
                .json({ message: "Oops! Something went wrong" });
        }
    } else {
        res.status(404).send("method not allowed");
    }
}
