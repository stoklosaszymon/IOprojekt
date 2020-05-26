import React from "react";
import defaultProfile from "./img/profile_normal.png";

const Avatar = ({ picture }) => {
  return <img src={picture} alt="avatar" />;
};

export default Avatar;
