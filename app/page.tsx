import { posts, Post } from "@/db";
import PostCard from "./post/_components/PostCard";
import usePost from "./hooks/usePost";

export default async function Home() {
  const { getPosts } = usePost();
  const posts = await getPosts();

  return (
    <>
      <h1>Blog post nextjs</h1>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
