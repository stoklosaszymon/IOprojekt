import React from "react";

const SectionHeader = ({ heading, logo, subText }) => {
  return (
    <div className="section-header">
      <div className="home-refresh">
        <span>{heading}</span>
        <span className="subText"> {subText} </span>
      </div>
      {logo}
    </div>
  );
};
export default SectionHeader;
