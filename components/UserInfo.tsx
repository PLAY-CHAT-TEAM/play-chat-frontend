import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import { useCallback, useState } from "react";
import UserInfoModal from "./UserInfoModal";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

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
      <button onClick={toggleModal}>
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
      </button>
      <UserInfoModal show={showModal} />
    </div>
  );
};

export default UserInfo;
