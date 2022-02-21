import type { NextPage } from "next";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useInput from "../hooks/useInput";

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [previewImageDataURL, setPreviewImageDataURL] = useState<string>(
    "/default-profile.png"
  );
  const uploadFileRef = useRef<HTMLInputElement | null>(null);

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

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    router.push("/");
  }, []);

  return (
    <main className="flex flex-col items-center mt-32">
      <h1>
        <Image src="/PingPong.svg" width={320} height={100} />
      </h1>
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
          className="mb-3 w-80 hidden"
          type="file"
          onChange={onUploadFile}
          ref={uploadFileRef}
        />
        <input
          className="px-3 py-2 border rounded mb-3 w-80"
          type="email"
          required
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          className="px-3 py-2 border rounded mb-3 w-80"
          type="password"
          required
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <input
          className="px-3 py-2 border rounded mb-3 w-80"
          type="text"
          required
          placeholder="닉네임"
          value={nickname}
          onChange={onChangeNickname}
        />
        <button
          className="bg-sky-600 text-white py-2 rounded mb-2 w-80"
          type="submit"
        >
          회원가입하기
        </button>
        <button className="border py-2 rounded w-80" type="button">
          로그인하러가기
        </button>
      </form>
    </main>
  );
};

export default SignUpPage;
