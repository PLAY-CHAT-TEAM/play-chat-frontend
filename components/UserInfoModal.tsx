import axios from "axios";
import { useCallback, VFC } from "react";

interface Props {
  show: boolean;
}

const UserInfoModal: VFC<Props> = ({ show }) => {
  const onClickSignOut = useCallback(async () => {
    await axios.post("/api/signout");
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
