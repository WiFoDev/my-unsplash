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
  const data = await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    body: JSON.stringify({label, photoURL}),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
};
