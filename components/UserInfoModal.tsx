import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, VFC } from "react";

interface Props {
  show: boolean;
}

const UserInfoModal: VFC<Props> = ({ show }) => {
  const router = useRouter();

  const onClickSignOut = useCallback(async () => {
    await axios.post("/api/signout");
    router.push("/sign-in");
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div>
      <button onClick={onClickSignOut}>SignOut</button>
    </div>
  );
};

export default UserInfoModal;
