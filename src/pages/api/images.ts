// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";

import {AdminAndResourceOptions, v2 as cloudinary} from "cloudinary";

type Data = {
  name: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const options: AdminAndResourceOptions = {
    type: "upload",
    prefix: "my-unsplash",
    direction: -1,
    max_results: 500,
  };
  const {resources} = await cloudinary.api.resources(options);

  return res.status(200).json(resources);
}
