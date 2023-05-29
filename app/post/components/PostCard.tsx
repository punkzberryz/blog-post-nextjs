import { posts, Post } from "@/db";
import Link from "next/link";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div>
      <Link href={`/post/${post.id}`}>
        <div>{post.title}</div>
      </Link>
    </div>
  );
}
