import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactElement, useCallback, useState } from "react";
import ChatPage from "@/layouts/ChatPage";
import { NextPageWithLayout } from "../_app";

interface Channel {
  id: string;
  name: string;
}

const channelArray: Channel[] = [
  { id: "1", name: "general" },
  { id: "2", name: "random" },
  { id: "3", name: "study" },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = channelArray.map((channel) => {
    const { id } = channel;
    return {
      params: { id },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const channel: Channel | undefined = channelArray.find(
    (v) => v.id === params?.id
  );
  return {
    props: {
      channel,
    },
    revalidate: 10,
  };
};

const ChannelPage: NextPageWithLayout = ({
  channel,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [showChannelDetails, setShowChannelDetails] = useState(false);

  const onClickShowDetails = useCallback(() => {
    setShowChannelDetails((prev) => !prev);
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
  return <ChatPage>{page}</ChatPage>;
};

export default ChannelPage;
