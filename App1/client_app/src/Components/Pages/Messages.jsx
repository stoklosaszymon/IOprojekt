import React from "react";
import SectionHeader from "../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../mainComponents/mainSection/SectionMiddle";
import Stream from "../mainComponents/mainSection/Stream";
import MessageLogo from "../assets/MessageLogo";
import Search from "../mainComponents/mainAside/Search";
import Default from "../subComponents/messagesComponents/MessagesStream";
import "../../Styles/Messages.css";

const Messages = () => {
  return (
    <div className="main-container messages">
      <section>
        <SectionHeader heading="Messages" logo={<MessageLogo />} />
        <SectionMiddle data={<Search />} />
        <Stream data={<Default />} />
      </section>
      <aside></aside>
    </div>
  );
};

export default Messages;
