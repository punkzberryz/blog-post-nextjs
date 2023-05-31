"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import usePost from "@/app/hooks/usePost";
import { useRouter } from "next/navigation";
export default function PostEditAndDeleteButtons({
  postId,
  token,
}: {
  postId: number;
  token: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { deletePost } = usePost();

  const handleDeleteOnClick = async () => {
    await deletePost({ postId, token });
    router.push("/");
  };

  return (
    <div>
      <div>PostEditAndDeleteButtons</div>
      <Button onClick={() => {}}>Edit</Button>
      <Button onClick={() => setOpen(true)}>Delete</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-2xl">Confirm delete</h1>
          <Button onClick={handleDeleteOnClick}>Delete</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
