import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db, posts } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  //GET MANY POSTS
  const postQuery = await db.select().from(posts).limit(30);
  if (!postQuery.length) {
    return new NextResponse("Post not found...", { status: 400 });
  }

  const response = NextResponse.json(postQuery);

  return response;
}

export async function POST(req: NextRequest) {
  const { title, body }: { title: string; body: string } = await req.json();

  if (!title || !body) {
    return new NextResponse("Title or body is invalid", { status: 401 });
  }

  const token = req.cookies.get("jwt")?.value;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, email } = jwt.decode(token) as { email: string; id: number };
  console.log(id);
  if (!id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await db.insert(posts).values({
    title,
    body,
    authorId: id,
  });

  const response = NextResponse.json({ message: "Post success!!" });
  return response;
}
