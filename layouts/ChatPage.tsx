import { FC } from "react";
import ChannelList from "@/components/ChannelList";
import DMList from "@/components/DMList";
import SearchInput from "@/components/SearchInput";
import UserInfo from "@/components/UserInfo";
import Head from "next/head";

interface Props {
  title: string;
}

const ChatPage: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - PingPong</title>
      </Head>
      <div className="flex">
        <div className="p-5">
          <SearchInput />
          <UserInfo />
          <ChannelList />
          <DMList />
        </div>
        {children}
      </div>
    </>
  );
};

export default ChatPage;
