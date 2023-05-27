import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.headers.get("authorization") as string;
  console.log("bearer token =" + token);
  if (!token) {
    return new NextResponse("Unauthorized request", { status: 401 });
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse("Unauthorized request", { status: 401 });
  }
}
export const config = {
  matcher: ["/api/auth/current-user"],
};
