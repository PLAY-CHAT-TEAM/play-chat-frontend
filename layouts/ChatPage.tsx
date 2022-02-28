import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const ChatPage: FC = ({ children }) => {
  return (
    <div className="flex">
      <div className="p-5">
        <input
          className="w-60 px-2 py-1 border-2 border-sky-700 rounded mb-4 focus:outline-sky-700 lg:w-72"
          type="text"
          placeholder="Search Anything"
        />
        <div className="flex justify-around items-center mb-4 bg-sky-700 rounded p-3 text-white">
          <Image
            className="rounded-full"
            src="/default-profile.png"
            width="50"
            height="50"
          />
          <div className="flex flex-col ml-4">
            <span className="text-xl">Jiwlee</span>
            <span className="text-xs">Active</span>
          </div>
          <button>
            <FontAwesomeIcon icon={faEllipsis} size="lg" />
          </button>
        </div>
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
        <div className="mb-4">
          <details open>
            <summary className="font-bold">MESSAGES</summary>
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
      </div>
      {children}
    </div>
  );
};

export default ChatPage;
