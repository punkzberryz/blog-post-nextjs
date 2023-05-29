import { Post } from "@/db";
import { cookies } from "next/headers";
import CommentInput from "../components/CommentInput";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(parseInt(params.id));
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  return (
    <div className="m-2 p-2">
      <h1 className="text-3xl mb-5">{post.title}</h1>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
      <div>{token ? <CommentInput /> : null}</div>
    </div>
  );
}

interface PostProps {
  post: Post;
}

const fetchPost = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/post/${id}`);
  const { post } = (await response.json()) as PostProps;
  return post;
};
