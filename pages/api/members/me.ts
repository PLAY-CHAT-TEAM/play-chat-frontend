import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handleMe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { BACK_URL } = process.env;

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  const { accessToken } = req.cookies;
  try {
    const response = await axios.get(`${BACK_URL}/api/members/me`, {
      headers: {
        Authorization: accessToken,
      },
    });
    res.status(response.status).json({ ...response.data });
  } catch (error) {
    const axiosError = error as AxiosError;
    res
      .status(axiosError.response?.status || 500)
      .json({ ...axiosError.response?.data });
  }
};

export default handleMe;
