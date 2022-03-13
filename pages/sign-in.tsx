import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import { ReactElement, useCallback, useState } from "react";
import Input from "@/components/Input";
import useInput from "@/hooks/useInput";
import SignPage from "@/layouts/SignPage";
import { GetServerSideProps } from "next";
import axios from "axios";
import { toast } from "react-toastify";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.accessToken) {
    return {
      redirect: {
        destination: "/channel/1",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const SignInPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [loading, setLoading] = useState(false);

  const onClickSignUp = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setLoading(true);
      if (!email.trim() || !password.trim()) {
        return;
      }
      axios
        .post(
          "/api/signin",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then(() => {
          router.push("/channel/1");
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        });
    },
    [email, password]
  );

  if (loading) {
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
