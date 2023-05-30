import { posts, Post } from "@/db";
import PostCard from "./post/components/PostCard";

export default async function Home() {
  const results = await fetchPosts();
  console.log(results);

  return (
    <>
      <h1>Blog post nextjs</h1>

      {/* {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))} */}
    </>
  );
}

interface PostProp {
  result: {
    Post: {
      id: number;
      title: string;
      body: string;
      imageUrl: string | null;
      authorId: number;
      createdAt: Date;
      updatedAt: Date;
    };
    User: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      username: string;
      password: string;
    };
  }[];
}

const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });
  const result: PostProp = await response.json();
  // console.log(result);
  return result;
};
