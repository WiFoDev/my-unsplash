import {NextApiHandler} from "next";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const handler: NextApiHandler = async (req, res) => {
  const {public_id} = req.body;

  const result = await cloudinary.api.delete_resources([public_id]);

  return res.status(200).json({success: true, result});
};

export default handler;
