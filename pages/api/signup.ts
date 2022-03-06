import { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import axios, { AxiosError } from "axios";

const handleSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { BACK_URL } = process.env;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password, nickname, profileImage } = req.body;
  console.log(email, password, nickname, profileImage);
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("nickname", nickname);
  if (profileImage) formData.append("profileImage", profileImage);

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
    console.log("response status", axiosError.response?.status);
    res
      .status(axiosError.response?.status || 500)
      .json({ ...axiosError.response?.data });
  }
};

export default handleSignUp;
