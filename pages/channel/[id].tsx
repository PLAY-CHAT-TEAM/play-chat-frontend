import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faSquarePlus,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

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

const ChannelPage = ({
  channel,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [showChannelDetails, setShowChannelDetails] = useState(false);

  const onClickShowDetails = useCallback(() => {
    setShowChannelDetails((prev) => !prev);
  }, []);

  return (
    <div className="flex">
      <div className="p-5">
        <input
          className="w-60 px-2 py-1 border-2 border-sky-700 rounded mb-4 focus:outline-sky-700 lg:w-72"
          type="text"
          placeholder="Search Anything"
        />
        <div className="flex justify-around items-center mb-4 bg-sky-700 rounded p-3 text-white">
          <Image
            className="rounded-full"
            src="/default-profile.png"
            width="50"
            height="50"
          />
          <div className="flex flex-col ml-4">
            <span className="text-xl">Jiwlee</span>
            <span className="text-xs">Active</span>
          </div>
          <button>
            <FontAwesomeIcon icon={faEllipsis} size="lg" />
          </button>
        </div>
        <div className="mb-4">
          <details open>
            <summary className="font-bold">CHANNELS</summary>
            <ul className="px-4">
              <li>
                <Link href={`/channel/${1}`}>General</Link>
              </li>
              <li>
                <Link href={`/channel/${2}`}>Random</Link>
              </li>
              <li>
                <Link href={`/channel/${3}`}>Study</Link>
              </li>
            </ul>
          </details>
        </div>
        <div className="mb-4">
          <details open>
            <summary className="font-bold">MESSAGES</summary>
            <ul className="px-4">
              <li>
                <Link href={`/dm/${1}`}>Kycho</Link>
              </li>
              <li>
                <Link href={`/channel/${2}`}>Jiwlee</Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
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
    </div>
  );
};

export default ChannelPage;
