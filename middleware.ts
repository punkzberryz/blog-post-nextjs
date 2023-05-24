import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;
  console.log("bearer token =" + bearerToken);
}
export const config = {
  matcher: ["/api/auth/get-user"],
};
