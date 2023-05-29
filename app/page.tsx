import { posts, Post } from "@/db";
import PostCard from "./post/components/PostCard";
export default async function Home() {
  const posts = await fetchPosts();
  return (
    <>
      <h1>Blog post nextjs</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}

interface PostProp {
  post: Post;
}

const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/api/post");
  const posts = (await response.json()) as Post[];
  return posts;
};
