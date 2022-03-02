import { axiosPost } from "lib/api";
import { NextApiRequest, NextApiResponse } from "next";

const handleSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { BACK_URL } = process.env;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  try {
    const response = await axiosPost(`${BACK_URL}/user/signup`, req.body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).end();
  }
};

export default handleSignUp;
