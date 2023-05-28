"use client";
import { useEffect } from "react";

export default function PostPage({ params }: { params: { id: string } }) {
  const fetchPost = async () => {
    const response = await fetch("http://localhost:3000/post?id=1");
    const post = response.body;
    console.log(post);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return <div>{`PostPage on id= ${params.id}`}</div>;
}
