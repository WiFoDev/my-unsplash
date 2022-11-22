export const getImages = async (): Promise<ImageTypes[]> => {
  const results = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
  ).then((res) => res.json());

  return results;
};

export interface ImageTypes {
  asset_id: string;
  public_id: string;
  folder: string;
  url: string;
  secure_url: string;
  tags: string[];
}
