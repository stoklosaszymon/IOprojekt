import React from "react";
import Default from "../Default";

const Subscriptions = () => {
  let defaultHeading = "You haven’t subscribed to any Lists yet";
  let DefaultSubText = "When you do, it’ll show up here.";

  return (
    <Default heading={`${defaultHeading}`} subText={`${DefaultSubText}`} />
  );
};

export default Subscriptions;
