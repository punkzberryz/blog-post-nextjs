import { Comment } from "@/db";

export default function CommentCard({
  comment,
  authorName,
}: {
  comment: Comment;
  authorName: string;
}) {
  return (
    <div className="p-2 m-2 bg-white">
      <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
      <div className="text-reg">{`By ${authorName}`}</div>
    </div>
  );
}
