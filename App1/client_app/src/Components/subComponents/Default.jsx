import React from "react";

const Default = ({ heading, subText, btnText }) => {
  return (
    <div className="default">
      <p className="heading">{heading}</p>
      <p className="subText">{subText}</p>
      {btnText == null ? (
        ""
      ) : (
        <div className="btn-container">
          <a href="#default" className="btn btn-small btn-solid">
            {btnText}
          </a>
        </div>
      )}
    </div>
  );
};

export default Default;
