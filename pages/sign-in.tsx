import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useInput from "../hooks/useInput";

const SignInPage: NextPage = () => {
  const router = useRouter();
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
    },
    [email, password]
  );

  return (
    <main className="flex flex-col items-center mt-32">
      <h1 className="mb-7">
        <Image src="/PingPong.png" width={320} height={75} />
      </h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input
          className="px-3 py-2 border rounded mb-4 w-80"
          type="email"
          required
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          className="px-3 py-2 border rounded mb-4 w-80"
          type="password"
          required
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <button
          className="bg-sky-600 text-white py-2 rounded mb-2 w-80"
          type="submit"
        >
          로그인하기
        </button>
        <button
          className="border py-2 rounded w-80 text-sm"
          type="button"
          onClick={onClickSignUp}
        >
          회원가입하러가기
        </button>
      </form>
    </main>
  );
};

export default SignInPage;
