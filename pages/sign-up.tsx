import type { NextPage } from "next";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useInput from "../hooks/useInput";

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [previewImageDataURL, setPreviewImageDataURL] = useState<string>("");

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

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    router.push("/");
  }, []);

  return (
    <main>
      <h1>회원가입</h1>
      <form onSubmit={onSubmit}>
        <input
          className="px-2 py-1 border rounded"
          type="text"
          required
          placeholder="EMAIL"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          className="px-2 py-1 border rounded"
          type="text"
          required
          placeholder="PASSWORD"
          value={password}
          onChange={onChangePassword}
        />
        <input
          className="px-2 py-1 border rounded"
          type="text"
          required
          placeholder="NICKNAME"
          value={nickname}
          onChange={onChangeNickname}
        />
        {previewImageDataURL && (
          <div className="relative w-52 h-52">
            <Image
              src={previewImageDataURL}
              alt="profile image preview"
              layout="fill"
              className="rounded-full"
            />
          </div>
        )}
        <input type="file" onChange={onUploadFile} />
        <button type="submit">회원가입하기</button>
      </form>
    </main>
  );
};

export default SignUpPage;
