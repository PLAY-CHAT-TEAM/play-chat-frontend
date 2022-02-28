import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

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
  return (
    <div className="flex m-2">
      <div>
        <input type="text" placeholder="Search Anything" />
        <div>
          <span>My Profile</span>
        </div>
        <div>
          <ul>
            <li>
              <button>Members</button>
            </li>
            <li>
              <button>Settings</button>
            </li>
          </ul>
        </div>
        <div>
          <span>CHANNELS</span>
          <ul>
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
        </div>
        <div>
          <span>MESSAGES</span>
          <ul>
            <li>
              <Link href={`/dm/${1}`}>Kycho</Link>
            </li>
            <li>
              <Link href={`/channel/${2}`}>Jiwlee</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <h1>{channel.name}</h1>
          <button>Channel details</button>
          <div>
            <ul>
              <li>Kycho - chatting1</li>
              <li>Jiwlee - chatting2</li>
            </ul>
          </div>
          <form>
            <input type="text" placeholder="Message in General" />
            <button type="button">upload photo</button>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div>
        <span>Channel details</span>
        <button>X</button>
        <div>
          <span>Media</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
