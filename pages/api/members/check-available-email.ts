import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handleCheckAvailableEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { BACK_URL } = process.env;

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  if (!req.query.email) {
    res.status(400).end();
    return;
  }
  const { email } = req.query;
  try {
    const response = await axios.get(
      `${BACK_URL}/api/members/check-available-email?email=${email}`
    );
    res.status(response.status).json({ ...response.data });
  } catch (error) {
    const axiosError = error as AxiosError;
    res
      .status(axiosError.response?.status || 500)
      .json({ ...axiosError.response?.data });
  }
};

export default handleCheckAvailableEmail;
