import { posts, Post } from "@/db";
import Link from "next/link";

interface Props {
  post: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    imageUrl: string | null;
    authorId: number;
    authorUsername: string;
    authorEmail: string;
  };
}

export default function PostCard({ post }: Props) {
  return (
    <div className="m-2 p-2 bg-white">
      <Link href={`/post/${post.id}`}>
        <div>{post.title}</div>
      </Link>
    </div>
  );
}
