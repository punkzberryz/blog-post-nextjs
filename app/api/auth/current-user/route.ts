import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const payload = jwt.decode(token) as { email: string };
  if (!payload) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const usersQuery = await db
    .select()
    .from(users)
    .where(eq(users.email, payload.email));

  if (!usersQuery.length) {
    return new NextResponse("User not found", { status: 401 });
  }

  const user = usersQuery[0];

  return NextResponse.json({ user });
}
