import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db, posts, users, Post, User } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  //GET MANY POSTS
  const postQuery = await db
    .select({
      id: posts.id,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      title: posts.title,
      body: posts.body,
      imageUrl: posts.imageUrl,
      authorId: users.id,
      authorUsername: users.username,
      authorEmail: users.email,
    })
    .from(posts)
    .innerJoin(users, eq(users.id, posts.authorId))
    .limit(30);

  if (!postQuery.length) {
    return new NextResponse("Post not found...", { status: 400 });
  }

  const response = NextResponse.json(postQuery);

  return response;
}

export async function POST(req: NextRequest) {
  //Create new post and return psot id
  const { title, body }: { title: string; body: string } = await req.json();

  if (!title || !body) {
    return new NextResponse("Title or body is invalid", { status: 401 });
  }

  const token = req.cookies.get("jwt")?.value;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, email } = jwt.decode(token) as { email: string; id: number };

  if (!id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await db.insert(posts).values({
    title,
    body,
    authorId: id,
  });

  const postQuery = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.authorId, id));
  if (!postQuery) {
    return new NextResponse("Posts by author id not found", { status: 404 });
  }
  const postId = postQuery[postQuery.length - 1].id;
  const response = NextResponse.json({
    message: "Post success!!",
    id: postId,
  });

  return response;
}
