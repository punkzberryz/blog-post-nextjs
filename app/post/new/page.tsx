"use client";
import { useState } from "react";
import WYSIWYG from "../components/WYSIWYG";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSumbitOnClick = () => {
    console.log({ title, body });
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
        <button className="m-2 p-2 border rounded">Preview</button>
        <button
          className="m-2 p-2 border rounded"
          onClick={handleSumbitOnClick}
        >
          Submit
        </button>
      </div>
    </>
  );
}
