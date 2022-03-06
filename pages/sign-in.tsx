import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import { ReactElement, useCallback } from "react";
import Input from "@/components/Input";
import useInput from "@/hooks/useInput";
import SignPage from "@/layouts/SignPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import { signin } from "@/slices/user";

const SignInPage: NextPageWithLayout = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onClickSignUp = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!email.trim() || !password.trim()) {
        return;
      }
      dispatch(signin({ email, password }));
    },
    [email, password, dispatch, signin]
  );

  if (user.signinLoading || user.accessToken) {
    return <div>로딩중...</div>;
  }

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <Input
        type="email"
        required
        placeholder="이메일"
        value={email}
        onChange={onChangeEmail}
      />
      <Input
        type="password"
        required
        placeholder="비밀번호"
        value={password}
        onChange={onChangePassword}
      />
      <button
        className="bg-sky-600 text-white py-2 rounded mb-2 w-80 focus:outline-sky-700"
        type="submit"
      >
        로그인하기
      </button>
      <button
        className="border py-2 rounded w-80 text-sm focus:outline-sky-700"
        type="button"
        onClick={onClickSignUp}
      >
        회원가입하러가기
      </button>
    </form>
  );
};

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <SignPage title="SignIn">{page}</SignPage>;
};

export default SignInPage;
