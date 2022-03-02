import { NextApiRequest, NextApiResponse } from "next";

const handleSignIn = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    email: "jiwlee@example.com",
    nickname: "jiwlee",
    profileImage: "",
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  });
};

export default handleSignIn;
