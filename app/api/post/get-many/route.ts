import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db, posts } from "@/db";
import { eq } from "drizzle-orm";
export async function GET(req: NextRequest) {
  const postQuery = await db.select().from(posts).limit(30);
  if (!postQuery.length) {
    return new NextResponse("Post not found...", { status: 400 });
  }

  const response = NextResponse.json(postQuery);

  return response;
}
