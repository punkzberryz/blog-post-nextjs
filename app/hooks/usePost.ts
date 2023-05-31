const usePost = () => {
  const createPost = async ({
    title,
    body,
    token,
  }: {
    title: string;
    body: string;
    token: string;
  }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { Authorization: token },
        body: JSON.stringify({ title, body }),
      });
      const { message, id }: { message: string; id: number } =
        await response.json();
      if (!id) {
        throw Error("Add new post failed, can't find the id");
      }
      return id;
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/api/post", {
      next: { revalidate: 60 },
      // cache: "no-store",
    });
    const result = (await response.json()) as {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      body: string;
      imageUrl: string | null;
      authorId: number;
      authorUsername: string;
      authorEmail: string;
    }[];

    return result;
  };

  const deletePost = async ({
    postId,
    token,
  }: {
    postId: number;
    token: string;
  }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/${postId}/`,
        {
          method: "DELETE",
          headers: { Authorization: token },
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return { createPost, getPosts, deletePost };
};
export default usePost;
