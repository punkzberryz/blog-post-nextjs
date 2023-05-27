import { NextRequest, NextResponse } from "next/server";
import { createToken, signupValidationSchema } from "../services";

import { users, db } from "@/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = await req.json();

  if (!username || !email || !password) {
    return new NextResponse("Invalid request", {
      status: 400,
    });
  }

  const schemaErrors = signupValidationSchema({ username, email, password });
  if (schemaErrors.length) {
    return new NextResponse(schemaErrors[0], { status: 400 });
  }

  const emailExisted = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email));
  if (emailExisted.length) {
    return new NextResponse("Email has been used by another account", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    password: hashedPassword,
    email,
  });

  const token = await createToken({ email });

  const usersQuery = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (!usersQuery.length) {
    return new NextResponse("Invalid request", {
      status: 401,
    });
  }
  const user = usersQuery[0];

  const response = NextResponse.json({ user });
  response.cookies.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export async function DELETE() {
  return new NextResponse("Invalid request", {
    status: 401,
  });
}
