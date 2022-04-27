import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
    // const country = req.geo.country?.toLowerCase() || "us";
    const JWT_TOKEN = req.cookies?.["JWT_TOKEN"];

    try {
        const isAuthorized = jwt.verify(
            JWT_TOKEN,
            "651812b26925caed3993cd98369553beb8ce0e050ceb2ebd02ab055e46c30ede"
        );

        console.log(isAuthorized);
    } catch (error) {
        console.log(error.message);
    }

    return NextResponse.rewrite(req.nextUrl);
}
