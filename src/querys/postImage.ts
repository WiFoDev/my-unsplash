interface PostedImage {
  label: string;
  photoURL: string;
}

interface PostResponse {
  success?: boolean;
}

export const postImage = async ({
  label,
  photoURL,
}: PostedImage): Promise<PostResponse> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
    {
      method: "POST",
      body: JSON.stringify({label, photoURL}),
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());

  return data;
};
