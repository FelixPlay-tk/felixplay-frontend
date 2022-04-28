import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
    req.nextUrl.pathname = "/dmca";

    return NextResponse.rewrite(req.nextUrl);
}
