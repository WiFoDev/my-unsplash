import {NextApiRequest, NextApiResponse} from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {label, photoURL} = req.body;

  console.log(label, photoURL);

  return res.status(200).json({success: true});
}
