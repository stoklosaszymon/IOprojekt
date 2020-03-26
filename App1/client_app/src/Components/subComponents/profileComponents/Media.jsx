import React from "react";
import Default from "../Default";

const Media = () => {
  let defaultHeading = "You haven’t Tweeted any photos or videos yet";
  let defaultSubText =
    "When you send Tweets with photos or videos in them, it will show up here.";
  return (
    <Default
      heading={`${defaultHeading}`}
      subText={`${defaultSubText}`}
      btnText="Tweet a photo or video"
    />
  );
};

export default Media;
