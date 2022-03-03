import { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import axios, { AxiosError } from "axios";

const handleSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { BACK_URL } = process.env;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password, nickname } = req.body;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("nickname", nickname);
  const formHeaders = formData.getHeaders();

  try {
    const response = await axios.post(
      `${BACK_URL}/api/members/sign-up`,
      formData,
      {
        headers: { ...formHeaders },
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

export default handleSignUp;
