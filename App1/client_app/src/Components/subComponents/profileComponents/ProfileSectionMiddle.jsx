import React from "react";
import ProfileUI from "./ProfileUI";
import { NavLink } from "react-router-dom";

const ProfileSectionMiddle = ({ username }) => {
  return (
    <div className="section-middle">
      <ProfileUI />
      <div className="nav">
        <NavLink
          to={`/${username}`}
          className="a"
          activeClassName={"active-link"}
          exact={true}
        >
          Tweets
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSectionMiddle;
