import React from "react";
import { NavLink } from "react-router-dom";

const ListsSectionMiddle = () => {
  return (
    <div className="section-middle">
      <div className="nav">
        <NavLink
          to="/i/lists"
          className="a"
          activeClassName={"active-link"}
          exact={true}
        >
          All
        </NavLink>
        <NavLink
          to="/i/lists/subscriptions"
          className="a"
          activeClassName={"active-link"}
        >
          Subscriptions
        </NavLink>
        <NavLink
          to="/i/lists/membership"
          className="a"
          activeClassName={"active-link"}
        >
          Membership
        </NavLink>
      </div>
    </div>
  );
};

export default ListsSectionMiddle;
