import React from "react";
import ProfileUI from "./ProfileUI";
import { NavLink } from "react-router-dom";

const ProfileSectionMiddle = () => {
  return (
    <div className="section-middle">
      <ProfileUI />
      <div className="nav">
        <NavLink
          to="/username"
          className="a"
          activeClassName={"active-link"}
          exact={true}
        >
          Tweets
        </NavLink>
        <NavLink
          to="/username/replies"
          className="a"
          activeClassName={"active-link"}
        >
          Tweets & replies
        </NavLink>
        <NavLink
          to="/username/media"
          className="a"
          activeClassName={"active-link"}
        >
          Media
        </NavLink>
        <NavLink
          to="/username/likes"
          className="a"
          activeClassName={"active-link"}
        >
          Likes
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSectionMiddle;
