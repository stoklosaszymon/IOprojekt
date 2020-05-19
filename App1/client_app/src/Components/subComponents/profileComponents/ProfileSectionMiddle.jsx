import React from "react";
import ProfileUI from "./ProfileUI";
import { NavLink } from "react-router-dom";

const ProfileSectionMiddle = ({ user }) => {
  return (
    <div className="section-middle">
          <ProfileUI user={user}/>
      <div className="nav">
        <NavLink
          to={`/${user.nickname}`}
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
