"use client";

import WYSIWYG from "./WYSIWYG";
import { useState } from "react";

export default function CommentInput() {
  const [body, setBody] = useState("");
  return (
    <div>
      <div>Add a comment</div>
      <WYSIWYG value={body} setValue={setBody} />
    </div>
  );
}
