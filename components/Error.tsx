import { VFC } from "react";

interface Props {
  message: string;
}

const Error: VFC<Props> = ({ message }) => {
  return <span className="text-xs text-red-600 italic">{message}</span>;
};

export default Error;
