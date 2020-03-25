import React from "react";
import Default from "../subComponents/Default";

const BookmarksStream = () => {
  let defaultHeading = "You haven’t added any Tweets to your Bookmarks yet";
  let defaultSubText = "When you do, they’ll show up here.";
  return (
    <Default heading={`${defaultHeading}`} subText={`${defaultSubText}`} />
  );
};

export default BookmarksStream;
