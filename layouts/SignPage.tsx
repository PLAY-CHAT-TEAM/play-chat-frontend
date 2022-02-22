import { FC } from "react";
import Image from "next/image";
import Head from "next/head";

interface Props {
  title: string;
}

const SignPage: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - PingPong</title>
      </Head>
      <main className="flex flex-col items-center mt-32">
        <h1 className="mb-7">
          <Image src="/PingPong.png" width={320} height={75} />
        </h1>
        {children}
      </main>
    </>
  );
};

export default SignPage;
