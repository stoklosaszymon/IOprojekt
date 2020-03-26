import React from "react";
import Default from "../Default";

const MessagesStream = () => {
  let defaultHeading = "Send a message, get a message";
  let defaultSubText =
    "Direct Messages are private conversations between you and other people on Twitter.Share Tweets, media, and more!";
  return (
    <Default
      heading={`${defaultHeading}`}
      subText={`${defaultSubText}`}
      btnText="Start a conversation"
    />
  );
};

export default MessagesStream;
