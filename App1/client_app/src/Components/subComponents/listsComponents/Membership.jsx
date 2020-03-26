import React from "react";
import Default from "../Default";

const Membership = () => {
  let defaultHeading = "You haven’t been added to any Lists yet";
  let defaultSubText = "When someone adds you to a List, it’ll show up here.";

  return (
    <Default heading={`${defaultHeading}`} subText={`${defaultSubText}`} />
  );
};

export default Membership;
