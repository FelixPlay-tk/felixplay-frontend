import { connect, connection } from "mongoose";

import crypto from "crypto";
import movieModel from "../../models/movieModel";

// import movieSchema from "../../models/movieModel";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    await connect(process.env.DB_URL);

    try {
        const movies = await movieModel.find().limit(100);
        res.status(200).json(movies);
    } catch (error) {
        res.send("error");
    }
}
