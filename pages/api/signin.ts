import axios, { AxiosError } from "axios";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handleSignIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { BACK_URL } = process.env;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  try {
    const response = await axios.post(
      `${BACK_URL}/api/auth/sign-in`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const { token } = response.data;
    res
      .setHeader(
        "Set-Cookie",
        serialize("accessToken", `Bearer ${token}`, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        })
      )
      .status(response.status)
      .json({ ...response.data });
  } catch (error) {
    const axiosError = error as AxiosError;
    res
      .status(axiosError.response?.status || 500)
      .json({ ...axiosError.response?.data });
  }
};

export default handleSignIn;
