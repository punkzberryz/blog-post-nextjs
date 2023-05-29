import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db, posts, comments, users } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (!id) {
    return new NextResponse("No post id found...", { status: 400 });
  }

  const postQuery = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .rightJoin(comments, eq(comments.postId, posts.id))
    .rightJoin(users, eq(comments.authorId, users.id));

  if (!postQuery.length) {
    return new NextResponse("Post by Id not found...", { status: 400 });
  }
  const post = postQuery;
  const response = NextResponse.json({ post });

  return response;
}
