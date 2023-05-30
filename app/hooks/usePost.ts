const usePost = () => {
  const postCreate = async ({
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
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return { postCreate };
};
export default usePost;
