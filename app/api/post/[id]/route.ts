import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db, posts, comments, users, Post } from "@/db";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (!id) {
    return new NextResponse("No post id found...", { status: 400 });
  }

  const commentOwner = alias(users, "CommentOwner");

  const postQuery = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .innerJoin(users, eq(users.id, posts.authorId))
    .leftJoin(comments, eq(comments.postId, posts.id))
    .innerJoin(commentOwner, eq(commentOwner.id, comments.authorId));
  if (!postQuery.length) {
    return new NextResponse("Post by Id not found...", { status: 400 });
  }

  const result = postQuery.reduce<Record<number, {}>>((acc, row) => {
    const user = row.User;
    const post = row.Post;
    const comment = row.Comment;
    const commentOwner = row.CommentOwner;
    if (!acc[post.id]) {
      acc[post.id] = { post, comments: [] };
    }
    console.log(row);
    return {};
  }, {});

  const post = postQuery;
  const response = NextResponse.json({ post });

  return response;
}
