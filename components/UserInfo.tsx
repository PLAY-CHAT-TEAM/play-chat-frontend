import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const UserInfo = () => {
  return (
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
  );
};

export default UserInfo;
