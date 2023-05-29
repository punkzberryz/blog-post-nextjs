import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db, posts, comments, Post } from "@/db";
import { eq } from "drizzle-orm";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id);
  const { comment }: { comment: string } = await req.json();
  if (!postId) {
    return new NextResponse("Post Id is invalid", { status: 404 });
  }

  if (!comment) {
    return new NextResponse("Comment is invalid", { status: 404 });
  }

  const token = req.cookies.get("jwt")?.value;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, email } = jwt.decode(token) as { email: string; id: number };

  if (!id || !email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const postQuery = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.id, postId));
  if (!postQuery.length) {
    return new NextResponse("Post by Id not found", { status: 401 });
  }

  await db.insert(comments).values({
    comment,
    postId,
    authorId: id,
  });

  const response = NextResponse.json("Post comment success!!");
  return response;
}
