import { FC } from "react";
import ChannelList from "@/components/ChannelList";
import DMList from "@/components/DMList";
import SearchInput from "@/components/SearchInput";
import UserInfo from "@/components/UserInfo";

const ChatPage: FC = ({ children }) => {
  return (
    <div className="flex">
      <div className="p-5">
        <SearchInput />
        <UserInfo />
        <ChannelList />
        <DMList />
      </div>
      {children}
    </div>
  );
};

export default ChatPage;
