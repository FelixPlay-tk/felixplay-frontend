import { connect, connection } from "mongoose";
import userModel from "../../models/userModel";
import crypto from "crypto";

// import movieSchema from "../../models/movieModel";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    await connect(process.env.DB_URL);

    res.status(200).json({ users: [] });
}
