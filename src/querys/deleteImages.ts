interface DeletedImage {
  public_id: string;
}

interface DeleteResponse {
  success?: boolean;
  result: any;
}

export const deleteImage = async ({
  public_id,
}: DeletedImage): Promise<DeleteResponse> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/delete`,
    {
      method: "DELETE",
      body: JSON.stringify({public_id}),
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());

  return data;
};
