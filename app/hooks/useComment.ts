import axios from "axios";
import { Comment } from "@/db";
import { NextResponse } from "next/server";

const useComment = () => {
  const postComment = async ({
    comment,
    postId,
    token,
  }: {
    comment: string;
    postId: number;
    token: string;
  }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/${postId}/comment`,
        {
          method: "POST",
          headers: { Authorization: token },
          body: JSON.stringify({ comment }),
        }
      );
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return { postComment };
};
export default useComment;
