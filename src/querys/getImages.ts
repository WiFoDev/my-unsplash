export const getImages = async (): Promise<ImageTypes[]> => {
  const results = await fetch(
    "http://localhost:3000/api/images",
  ).then((res) => res.json());

  return results;
};

interface ImageTypes {
  secure_url: string;
  asset_id: string;
}
