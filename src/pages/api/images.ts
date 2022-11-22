// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";

import {AdminAndResourceOptions, v2 as cloudinary} from "cloudinary";

type Resource = {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Resource[]>,
) {
  const options: AdminAndResourceOptions = {
    type: "upload",
    prefix: "my-unsplash",
    max_results: 500,
  };
  const {resources} = await cloudinary.api.resources(options);

  resources.sort(
    (a: Resource, b: Resource) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime(),
  );

  return res.status(200).json(resources);
}
