"use client";
import { useState } from "react";
import WYSIWYG from "../components/WYSIWYG";
import Button from "@/app/components/Button";

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
        <Button onClick={() => {}}>Preview</Button>
        <Button onClick={handleSumbitOnClick}>Submit</Button>
      </div>
    </>
  );
}
