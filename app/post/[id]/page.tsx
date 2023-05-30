import { Post, User, Comment } from "@/db";
import { format } from "date-fns";
import CommentList from "../components/CommentList";
import { cookies } from "next/headers";
export default async function PostPage({ params }: { params: { id: number } }) {
  const { post, postAuthor, comments, commentAuthors } = await fetchPost(
    params.id
  );
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;
  return (
    <div className="m-2 p-2">
      <h1 className="text-3xl mb-5">{post.title}</h1>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
      <div>{`Posted by: ${postAuthor.username}`}</div>
      <div>{`Created at: ${format(
        new Date(post.createdAt.toString()),
        "ccc, LLL d"
      )}`}</div>
      <CommentList
        token={token}
        postId={params.id}
        comments={comments}
        commentAuthors={commentAuthors}
      />
    </div>
  );
}

interface PostProps {
  post: Post;
  postAuthor: User;
  comments: Comment[];
  commentAuthors: Record<number, User>;
}

const fetchPost = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });
  const post: PostProps = await response.json();
  return post;
};
