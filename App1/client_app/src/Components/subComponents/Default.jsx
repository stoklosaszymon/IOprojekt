import React from "react";
import { NavLink } from "react-router-dom";

//<a href="#default" className="btn btn-small btn-solid">
//    {btnText}
//</a>
const Default = ({ heading, subText, btnText }) => {
  return (
    <div className="default">
      <p className="heading">{heading}</p>
      <p className="subText">{subText}</p>
      {btnText == null ? (
        ""
      ) : (
                  <div className="btn-container">
                      <NavLink to="/messages/compose" className="btn btn-small btn-solid">
                          {btnText}   
                      </NavLink>           
                  </div>

      )}
    </div>
  );
};

export default Default;
