import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement, useCallback, useEffect, useState } from "react";
import ChatPage from "@/layouts/ChatPage";
import { NextPageWithLayout } from "../_app";
import { useDispatch } from "react-redux";
import { getUser } from "@/slices/user";

interface Channel {
  id: string;
  name: string;
}

const channelArray: Channel[] = [
  { id: "1", name: "general" },
  { id: "2", name: "random" },
  { id: "3", name: "study" },
];

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  if (!req.cookies.accessToken) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  const { id } = query;
  const channel: Channel | undefined = channelArray.find((v) => v.id === id);
  if (!channel) {
    return {
      notFound: true,
    };
  }

  return {
    props: { channel },
  };
};

const ChannelPage: NextPageWithLayout = ({
  channel,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useDispatch();
  const [showChannelDetails, setShowChannelDetails] = useState(false);

  const onClickShowDetails = useCallback(() => {
    setShowChannelDetails((prev) => !prev);
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <div className="flex-1 p-5 h-screen">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-end mb-2">
            <h1 className="text-3xl font-bold">{channel.name}</h1>
            <button onClick={onClickShowDetails}>
              {showChannelDetails ? (
                <FontAwesomeIcon
                  className="text-sky-900"
                  icon={faArrowRight}
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-sky-900"
                  icon={faArrowLeft}
                  size="lg"
                />
              )}
            </button>
          </div>
          <div className="flex-1 bg-sky-100 mb-2 rounded p-2">
            <ul>
              <li>Kycho - chatting1</li>
              <li>Jiwlee - chatting2</li>
            </ul>
          </div>
          <form className="flex bg-sky-700 p-2 rounded">
            <input
              className="flex-1 mr-2 rounded bg-sky-700 text-white px-2 outline-none"
              type="text"
              placeholder="Message in General"
            />
            <button className="mr-2" type="button">
              <FontAwesomeIcon icon={faSquarePlus} size="2x" color="white" />
            </button>
            <button type="submit">
              <FontAwesomeIcon icon={faTelegram} size="2x" color="white" />
            </button>
          </form>
        </div>
      </div>
      {showChannelDetails && (
        <div className="p-5">
          <span>Channel details</span>
          <button>X</button>
          <div>
            <p>Members</p>
            <p>Media</p>
          </div>
        </div>
      )}
    </>
  );
};

ChannelPage.getLayout = function getLayout(page: ReactElement) {
  return <ChatPage title={page.props.title}>{page}</ChatPage>;
};

export default ChannelPage;
