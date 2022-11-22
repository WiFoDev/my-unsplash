// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";

import {AdminAndResourceOptions, v2 as cloudinary} from "cloudinary";

type Resource = {
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  placeholder: boolean;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  backup: boolean;
  access_mode: string;
  url: string;
  secure_url: string;
  tags: Array<string>;
  context: object;
  next_cursor: string;
  derived_next_cursor: string;
  exif: object;
  image_metadata: object;
  faces: number[][];
  quality_analysis: number;
  colors: string[][];
  derived: Array<string>;
  moderation: object;
  phash: string;
  predominant: object;
  coordinates: object;
  access_control: Array<string>;
  pages: number;

  [futureKey: string]: any;
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
  const {tag} = req.body;
  const options: AdminAndResourceOptions = {
    type: "upload",
    prefix: "my-unsplash",
    max_results: 500,
    tags: true,
  };
  let resources: Resource[];

  if (tag !== "all") {
    resources = (await cloudinary.api.resources_by_tag(tag, options))
      .resources;
  } else {
    resources = (await cloudinary.api.resources(options)).resources;
  }

  resources.sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime(),
  );

  return res.status(200).json(resources);
}
