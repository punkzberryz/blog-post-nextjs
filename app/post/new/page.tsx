"use client";
import { useState } from "react";
import WYSIWYG from "../_components/WYSIWYG";
import Button from "@/app/components/Button";
import usePost from "@/app/hooks/usePost";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const token = getCookie("jwt")?.toString();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { createPost } = usePost();

  const handleSumbitOnClick = async () => {
    if (!token) {
      throw Error("Unauthorized");
    }
    const postId = await createPost({ title, body, token });
    if (!postId) {
      throw Error("Post fail... try again");
    }
    setBody("");
    setTitle("");
    router.push(`/post/${postId}`);
  };

  return (
    <>
      <h1 className="text-5xl">Create a new post...</h1>
      <div>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <WYSIWYG value={body} setValue={setBody} />
      </div>
      <div>{body}</div>
      <div>
        <Button onClick={() => {}}>Preview</Button>
        <Button onClick={handleSumbitOnClick}>Submit</Button>
      </div>
    </>
  );
}
