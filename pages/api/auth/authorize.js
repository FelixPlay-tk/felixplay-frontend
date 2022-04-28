import jwt from "jsonwebtoken";
import userModel from "../../../models/userModel";

export default async function authorize(req, res) {
    if (req.method === "POST") {
        const { JWT_TOKEN } = req.body;
        if (!JWT_TOKEN)
            return res.status(400).json({ message: "Invalid Token" });

        try {
            const isValid = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET);

            const user = await userModel.findById(isValid.id);

            if (!user)
                return res.status(404).json({ message: "User not found" });

            return res.status(200).json({
                fullName: `${user.firstname} ${user.lastname}`,
                email: user.email,
            });
        } catch (error) {
            return res.status(403).json({ message: "Unauthorized Token" });
        }
    } else {
        res.status(404).send("method not allowed");
    }
}
