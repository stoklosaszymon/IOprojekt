import React from "react";
import Default from "../Default";

const Mentions = () => {
  let defaultHeading = "Nothing to see here --- yet";
  let DefaultSubText = "When someone mentions you, you’ll find it here.";

  return (
    <Default heading={`${defaultHeading}`} subText={`${DefaultSubText}`} />
  );
};

export default Mentions;
