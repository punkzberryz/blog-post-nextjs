import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  if (req.method == "GET" && req.nextUrl.pathname == "/api/post") {
    return;
  }

  const bearerToken = req.headers.get("Authorization");
  if (!bearerToken) {
    console.log("error at middleware: token not found");
    return new NextResponse("Unauthorized request", { status: 401 });
  }

  const token = getToken(bearerToken);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    console.log("error at middleware: token not correct or is expired");
    return new NextResponse("Unauthorized request", { status: 401 });
  }
}
export const config = {
  matcher: ["/api/auth/current-user", "/api/post", "/api/post/:id/comment"],
};

const getToken = (tokenInput: string) => {
  const bearerToken = tokenInput.split(" ");
  if (!bearerToken[1]) return tokenInput;
  return bearerToken[1];
};
