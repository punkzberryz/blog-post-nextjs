import { Post } from "@/db";
import { cookies } from "next/headers";
import CommentInput from "../components/CommentInput";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(parseInt(params.id));
  return (
    <div className="m-2 p-2">
      <h1 className="text-3xl mb-5">{post.title}</h1>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
      <div>
        <CommentInput />
      </div>
    </div>
  );
}

interface PostProps {
  post: Post;
}

const fetchPost = async (id: number) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  const response = await fetch(`http://localhost:3000/api/post?id=${id}`, {
    headers: {
      Authorization: token,
    },
  });
  const { post } = (await response.json()) as PostProps;
  return post;
};
