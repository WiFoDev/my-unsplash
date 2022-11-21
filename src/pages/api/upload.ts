import {NextApiRequest, NextApiResponse} from "next";
import {UploadApiOptions, v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {label, photoURL} = req.body;
  const options: UploadApiOptions = {
    folder: "my-unsplash",
  };

  const {secure_url} = await cloudinary.uploader.upload(
    photoURL,
    options,
  );

  return res.status(200).json({success: true, secure_url});
}
