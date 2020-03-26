import React from "react";
import SearchLogo from "../../assets/SearchLogo";

const Compose = () => {
  return (
    <div className="body compose">
      <SearchLogo />
      <input type="text" autoFocus />
    </div>
  );
};

export default Compose;
