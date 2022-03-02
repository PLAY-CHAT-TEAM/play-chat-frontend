import axios from "axios";

export class ApiError extends Error {
  status: number;

  constructor(url: string, status: number) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.status = status;
  }
}

export const axiosGet = async (url: string, options: object) => {
  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new ApiError(url, response.status);
  }
  return await response.data.json();
};

export const axiosPost = async (url: string, data: object, options: object) => {
  const response = await axios.post(url, data, options);
  if (response.status !== 200) {
    throw new ApiError(url, response.status);
  }
  return await response.data.json();
};
