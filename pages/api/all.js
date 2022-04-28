import { connect, connection } from "mongoose";

import movieModel from "../../models/movieModel";

export default async function handler(req, res) {
    await connect(process.env.DB_URL);

    try {
        const movies = await movieModel.find();
        connection.close();
        res.status(200).json(movies);
    } catch (error) {
        res.send("error");
    }
}
