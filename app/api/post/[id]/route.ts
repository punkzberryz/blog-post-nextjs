import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { db, posts, comments, users, Post, User, Comment } from "@/db";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { getToken } from "@/app/util";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // result = {
  // "post": Post
  // "postAuthor": User
  // "comments": Comment[]
  // "commentAuthors": {"User.id" : User}
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
    .leftJoin(commentOwner, eq(commentOwner.id, comments.authorId))
    .limit(30);

  if (!postQuery.length) {
    return new NextResponse("Post by Id not found...", { status: 400 });
  }

  const result = postQuery.reduce<
    Record<
      number,
      {
        post: Post;
        postAuthor: User;
        comments: Comment[];
        commentAuthors: Record<number, User>;
      }
    >
  >((acc, row) => {
    const postAuthor = row.User;
    const post = row.Post;
    const comment = row.Comment;
    const commentOwner = row.CommentOwner;
    if (!acc[post.id]) {
      acc[post.id] = { post, postAuthor, comments: [], commentAuthors: {} };
    }
    if (comment) {
      acc[post.id].comments.push(comment);
    }
    if (commentOwner && !acc[post.id].commentAuthors[commentOwner.id]) {
      acc[post.id].commentAuthors[commentOwner.id] = commentOwner;
    }

    return acc;
  }, {});

  const response = NextResponse.json(result[id]);

  return response;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (!id) {
    return new NextResponse("No post id found...", { status: 400 });
  }

  const bearerToken = req.headers.get("Authorization");
  if (!bearerToken) {
    console.log("error at middleware: token not found");
    return new NextResponse("Unauthorized request", { status: 401 });
  }

  const token = getToken(bearerToken);

  const payload = jwt.decode(token) as { email: string; id: number };
  if (!payload.email || !payload.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const [post] = await db
    .select({ authorId: posts.authorId })
    .from(posts)
    .where(eq(posts.id, id));

  if (!post || post.authorId != payload.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await db.delete(posts).where(eq(posts.id, id));
  const path = "/api/post";
  revalidatePath(path);

  const response = NextResponse.json({
    message: "Delete success!!",
    revalidated: true,
    now: Date.now(),
  });
  return response;
}
