import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createToken, signupValidationSchema } from "../services";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

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

  const emailExisted = await prisma.user.findUnique({ where: { email } });
  if (emailExisted) {
    return new NextResponse("Email has been used by another account", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const token = await createToken({ email: user.email });

  const response = NextResponse.json({ token });
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
