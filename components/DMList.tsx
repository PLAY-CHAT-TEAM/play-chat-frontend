import Link from "next/link";
import { VFC } from "react";

const DMList: VFC = () => {
  return (
    <div className="mb-4">
      <details open>
        <summary className="font-bold">DMS</summary>
        <ul className="px-4">
          <li>
            <Link href={`/dm/${1}`}>Kycho</Link>
          </li>
          <li>
            <Link href={`/channel/${2}`}>Jiwlee</Link>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default DMList;
