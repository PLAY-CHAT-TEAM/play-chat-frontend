import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import useInput from "@/hooks/useInput";
import SignPage from "@/layouts/SignPage";
import Input from "@/components/Input";
import Error from "@/components/Error";
import axios from "axios";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import Success from "@/components/Success";

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

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [profileImage, setProfileImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("/default-profile.png");
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailCheckError, setEmailCheckError] = useState(false);
  const [emailRegError, setEmailRegError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordRegError, setPasswordRegError] = useState(false);
  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[a-zA-Z\d$@$!%*#?&]{8,16}$/;
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const onUploadFile = useCallback((event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    setProfileImage(theFile);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(theFile);
  }, []);

  const onClickChangeProfileImage = useCallback(() => {
    uploadFileRef.current?.click();
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      if (
        !email.trim() ||
        !password.trim() ||
        !passwordCheck.trim() ||
        !nickname.trim() ||
        emailRegError ||
        emailCheckError ||
        passwordRegError ||
        passwordCheckError
      ) {
        return;
      }
      axios
        .post("/api/signup", { email, password, profileImage, nickname })
        .then((response) => {
          const { nickname } = response.data;
          toast(`${nickname}님 회원가입을 축하합니다!`);
          router.push("/sign-in");
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
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [router, email, password, passwordCheck, nickname, passwordCheckError]
  );

  const onClickSignIn = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    setPasswordCheckError(!!passwordCheck && password !== passwordCheck);
  }, [password, passwordCheck]);

  useEffect(() => {
    setPasswordRegError(!!password && !passwordRegExp.test(password));
  }, [password]);

  useEffect(() => {
    setEmailCheckError(false);
    setEmailRegError(false);
    if (!email) {
      return;
    }
    if (emailRegExp.test(email)) {
      setEmailRegError(false);
      axios
        .get(`/api/members/check-available-email?email=${email}`)
        .then((response) => {
          const { available } = response.data;
          setEmailCheckError(!available);
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
        });
    } else {
      setEmailRegError(true);
    }
  }, [email]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-2 text-center">
          <Image
            className="rounded-full"
            src={previewImage}
            alt="profile image preview"
            width={200}
            height={200}
            objectPosition={`50% 50%`}
            objectFit="cover"
          />
        </div>
        <button
          className="mb-5 text-sm"
          type="button"
          onClick={onClickChangeProfileImage}
        >
          프로필이미지변경
        </button>
        <input
          className="hidden"
          type="file"
          onChange={onUploadFile}
          ref={uploadFileRef}
        />
        <Input
          type="email"
          required
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
          maxLength={50}
          marginActive={!email}
        />
        {email && !emailCheckError && !emailRegError && (
          <Success message="사용가능한 이메일입니다." />
        )}
        {emailCheckError && <Error message="이미 사용중인 이메일입니다." />}
        {emailRegError && <Error message="사용불가능한 이메일입니다." />}
        <Input
          type="password"
          required
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
          marginActive={!passwordRegError}
        />
        {passwordRegError && (
          <Error message="문자, 숫자, 특수문자를 포함한 최소 8자리 비밀번호" />
        )}
        <Input
          type="password"
          required
          placeholder="비밀번호확인"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          marginActive={!passwordCheckError}
        />
        {passwordCheckError && (
          <Error message="비밀번호가 일치하지 않습니다." />
        )}
        <Input
          type="text"
          required
          placeholder="닉네임"
          value={nickname}
          onChange={onChangeNickname}
          maxLength={50}
        />
        <button
          className="bg-sky-600 text-white py-2 rounded mb-2 w-80 focus:outline-sky-700"
          type="submit"
          disabled={loading}
        >
          회원가입하기
        </button>
        <button
          className="border py-2 rounded w-80 text-sm focus:outline-sky-700"
          type="button"
          onClick={onClickSignIn}
        >
          로그인하러가기
        </button>
      </form>
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <SignPage title="SignUp">{page}</SignPage>;
};

export default SignUpPage;
