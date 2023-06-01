import { Post, User, Comment } from "@/db";
import { format } from "date-fns";
import CommentList from "../_components/CommentList";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import PostEditAndDeleteButtons from "../_components/PostEditAndDeleteButtons";
export default async function PostPage({ params }: { params: { id: number } }) {
  const { post, postAuthor, comments, commentAuthors } = await fetchPost(
    params.id
  );
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  const isAuthor = () => {
    const jwtToken = cookieStore.get("jwt");
    if (jwtToken != null) {
      const { id, email } = jwt.decode(jwtToken.value) as {
        email: string;
        id: number;
      };
      if (id == postAuthor.id && email == postAuthor.email) {
        return true;
      }
    }
    return false;
  };

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
      {isAuthor() && token ? (
        <PostEditAndDeleteButtons token={token} postId={params.id} />
      ) : null}
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
  const response = await fetch(`${process.env.SERVER_HOST}/api/post/${id}`, {
    cache: "no-store",
  });
  const post: PostProps = await response.json();
  return post;
};
