"use client";
import Button from "@/app/components/Button";
import WYSIWYG from "./WYSIWYG";
import { useState, useEffect } from "react";
import useComment from "@/app/hooks/useComment";
import { CircularProgress } from "@mui/joy";
import { useRouter } from "next/navigation";
export default function CommentInput({
  postId,
  token,
}: {
  postId: number;
  token: string;
}) {
  const router = useRouter();
  const [body, setBody] = useState("<p><br></p>");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const { postComment } = useComment();
  const handleAddCommentOnClick = async () => {
    setLoading(true);
    await postComment({ comment: body, postId, token });
    setLoading(false);
    router.push(`/post/${postId}`);
  };

  useEffect(() => {
    if (body != "<p><br></p>") setDisable(false);
    else setDisable(true);
  }, [body]);

  return (
    <div className="p-2">
      <div className="p-2 text-2xl">Add a comment</div>
      <WYSIWYG value={body} setValue={setBody} />
      <div>
        <Button onClick={handleAddCommentOnClick} disabled={disable || loading}>
          {loading ? (
            <CircularProgress
              color="info"
              determinate={false}
              variant="solid"
            />
          ) : (
            "Add comment"
          )}
        </Button>
      </div>
    </div>
  );
}
