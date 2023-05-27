"use client";
import { useState } from "react";
export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
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
      </div>
      <div>
        <textarea name="comment">Enter text here...</textarea>
      </div>
    </>
  );
}
