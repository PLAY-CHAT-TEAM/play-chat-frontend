import Link from "next/link";
import { VFC } from "react";

const ChannelList: VFC = () => {
  return (
    <div className="mb-4">
      <details open>
        <summary className="font-bold">CHANNELS</summary>
        <ul className="px-4">
          <li>
            <Link href={`/channel/${1}`}>General</Link>
          </li>
          <li>
            <Link href={`/channel/${2}`}>Random</Link>
          </li>
          <li>
            <Link href={`/channel/${3}`}>Study</Link>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default ChannelList;
