import React from "react";
import CrossLogo from "../assets/CrossLogo";
import "../../Styles/Toast.css";

const Toast = ({ header, body, btnText }) => {
  return (
    <div className="toast-container">
      <div className="toast">
        <div className="toast-header">
          <CrossLogo />
          <p>{header}</p>
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
        <div className="toast-body">{body}</div>
      </div>
    </div>
  );
};

export default Toast;
