import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useInput from "../hooks/useInput";
import SignPage from "../layouts/SignPage";
import Input from "../components/Input";
import Error from "../components/Error";

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [previewImageDataURL, setPreviewImageDataURL] = useState<string>(
    "/default-profile.png"
  );
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const [passwordError, setPasswordError] = useState(false);

  const onUploadFile = useCallback((event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImageDataURL(reader.result as string);
    };
    reader.readAsDataURL(theFile);
  }, []);

  const onClickChangeProfileImage = useCallback(() => {
    uploadFileRef.current?.click();
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (
        !email.trim() ||
        !password.trim() ||
        !passwordCheck.trim() ||
        !nickname.trim() ||
        passwordError
      ) {
        return;
      }
      router.push("/");
    },
    [router, email, password, passwordCheck, nickname, passwordError]
  );

  const onClickSignIn = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    setPasswordError(password !== passwordCheck);
  }, [password, passwordCheck]);

  return (
    <SignPage title="SignUp">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-2 text-center">
          <Image
            className="rounded-full"
            src={previewImageDataURL}
            alt="profile image preview"
            width={200}
            height={200}
            objectPosition={`50% 50%`}
            objectFit="cover"
          />
        </div>
        <button
          className="mb-5 block text-sm"
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
        />
        <Input
          type="password"
          required
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <input
          className={`px-3 py-2 border rounded w-80 focus:outline-sky-700 ${
            !passwordError && "mb-4"
          }`}
          type="password"
          required
          placeholder="비밀번호확인"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
        {passwordError && <Error message="비밀번호가 일치하지 않습니다." />}
        <Input
          type="text"
          required
          placeholder="닉네임"
          value={nickname}
          onChange={onChangeNickname}
        />
        <button
          className="bg-sky-600 text-white py-2 rounded mb-2 w-80 focus:outline-sky-700"
          type="submit"
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
    </SignPage>
  );
};

export default SignUpPage;
