import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handleSignOut = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("handleSignOut");
  res
    .setHeader(
      "Set-Cookie",
      serialize("accessToken", ``, {
        path: "/",
        httpOnly: true,
        maxAge: -100,
      })
    )
    .status(200)
    .end();
};

export default handleSignOut;
