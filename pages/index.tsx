import { RootState } from "@/store/reducer";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import userSlice from "@/slices/user";

const HomePage: NextPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.setNickname("jiwlee"));
  }, []);

  console.log("user", user);

  return (
    <main>
      <h1>{`HomePage! ${user.nickname}`}</h1>
    </main>
  );
};

export default HomePage;
