import React from "react";
import Default from "../Default";

const Owned = () => {
  let defaultHeading = "You haven’t created any Lists yet";
  let defaultSubText = "When you do, it’ll show up here.";

  return (
    <Default
      heading={`${defaultHeading}`}
      subText={`${defaultSubText}`}
      btnText="Create a list"
    />
  );
};

export default Owned;
