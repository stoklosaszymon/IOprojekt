import React from "react";
import Default from "../Default";

const AllNotifications = () => {
  let defaultHeading = "Nothing to see here --- yet";
  let DefaultSubText =
    "From likes to Retweets and a whole lot more, this is where all the action happens.";

  return (
    <Default heading={`${defaultHeading}`} subText={`${DefaultSubText}`} />
  );
};

export default AllNotifications;
