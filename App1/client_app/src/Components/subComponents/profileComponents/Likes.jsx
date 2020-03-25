import React from "react";
import Default from "../Default";

const Media = () => {
  let defaultHeading = "You don’t have any likes yet";
  let defaultSubText =
    "Tap the heart on any Tweet to show it some love. When you do, it’ll show up here.";
  return (
    <Default heading={`${defaultHeading}`} subText={`${defaultSubText}`} />
  );
};

export default Media;
