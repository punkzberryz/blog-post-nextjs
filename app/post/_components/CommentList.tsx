import { Comment, User } from "@/db";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";

export default function CommentList({
  comments,
  commentAuthors,
  postId,
  token,
}: {
  token?: string;
  postId: number;
  comments: Comment[];
  commentAuthors: Record<number, User>;
}) {
  return (
    <div>
      {comments.length
        ? comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              authorName={commentAuthors[comment.authorId].username}
            />
          ))
        : null}
      <div>{token ? <CommentInput postId={postId} token={token} /> : null}</div>
    </div>
  );
}
