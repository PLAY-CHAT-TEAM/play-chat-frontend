import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handleSignIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { BACK_URL } = process.env;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  console.log("singin", email, password);
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
    res.status(response.status).json({ ...response.data });
  } catch (error) {
    const axiosError = error as AxiosError;
    res
      .status(axiosError.response?.status || 500)
      .json({ ...axiosError.response?.data });
  }
};

export default handleSignIn;
