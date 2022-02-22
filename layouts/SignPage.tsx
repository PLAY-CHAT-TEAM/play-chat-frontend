import { FC } from "react";
import Image from "next/image";
import Head from "next/head";

interface Props {
  title: string;
}

const SignPage: FC<Props> = ({ title, children }) => {
  return (
    <div className="flex flex-col items-center mt-32">
      <Head>
        <title>{title} - PingPong</title>
      </Head>
      <header className="mb-7">
        <h1>
          <Image src="/PingPong.png" width={320} height={75} />
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default SignPage;
