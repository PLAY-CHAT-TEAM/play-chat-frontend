import Link from "next/link";

const ChannelPage = () => {
  return (
    <div className="flex m-2">
      <div>
        <ul>
          <li>workspace1</li>
          <li>workspace2</li>
          <li>workspace3</li>
        </ul>
      </div>
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
              <Link href={`channel/${1}`}>General</Link>
            </li>
            <li>
              <Link href={`channel/${2}`}>Random</Link>
            </li>
            <li>
              <Link href={`channel/${3}`}>Study</Link>
            </li>
          </ul>
        </div>
        <div>
          <span>MESSAGES</span>
          <ul>
            <li>
              <Link href={`dm/${1}`}>Kycho</Link>
            </li>
            <li>
              <Link href={`channel/${2}`}>Jiwlee</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <h1>General</h1>
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
