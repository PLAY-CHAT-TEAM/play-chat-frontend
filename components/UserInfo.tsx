import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex justify-around items-center mb-4 bg-sky-700 rounded p-3 text-white">
      {user.imageUrl && (
        <Image
          className="rounded-full"
          src={user.imageUrl}
          width="50"
          height="50"
        />
      )}
      <div className="flex flex-col ml-4">
        <span className="text-xl">{user.nickname}</span>
        <span className="text-xs">Active</span>
      </div>
      <button>
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
      </button>
    </div>
  );
};

export default UserInfo;
