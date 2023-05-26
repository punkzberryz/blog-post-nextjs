import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { signinValidationSchema, createToken } from "../services";

import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db/db";

export async function POST(req: NextRequest) {
  const { email, password }: { email: string; password: string } =
    await req.json();
  if (!email || !password) {
    return new NextResponse("Invalid inputs", { status: 400 });
  }
  const errors = signinValidationSchema({ email, password });
  if (errors.length) {
    return new NextResponse(errors[0], { status: 400 });
  }

  const usersQuery = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (!usersQuery.length) {
    return new NextResponse("Email or password is invalid", { status: 401 });
  }

  const user = usersQuery[0];
  const passwordIsMatched = await bcrypt.compare(password, user.password);
  if (!passwordIsMatched) {
    return new NextResponse("Email or password is invalid", { status: 401 });
  }

  const token = await createToken({ email });

  const response = NextResponse.json({ token, user });
  response.cookies.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return response;
}
