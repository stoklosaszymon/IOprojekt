import React from "react";
import "../../../Styles/Notifications.css";
import { NavLink } from "react-router-dom";

const NotificationsSectionMiddle = () => {
  return (
    <div className="section-middle">
      <div className="nav">
        <NavLink
          to="/notifications"
          className="a"
          activeClassName={"active-link"}
          exact={true}
        >
          All
        </NavLink>
        <NavLink
          to="/notifications/mentions"
          className="a"
          activeClassName={"active-link"}
        >
          Mentions
        </NavLink>
      </div>
    </div>
  );
};

export default NotificationsSectionMiddle;
