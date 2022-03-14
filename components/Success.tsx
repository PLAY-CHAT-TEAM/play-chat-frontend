import { VFC } from "react";

interface Props {
  message: string;
}

const Success: VFC<Props> = ({ message }) => {
  return <span className="text-xs text-blue-600 italic">{message}</span>;
};

export default Success;
