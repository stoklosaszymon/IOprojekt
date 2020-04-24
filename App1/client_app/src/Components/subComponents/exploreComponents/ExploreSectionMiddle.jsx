import React from "react";
import "../../../Styles/Explore.css";
import { NavLink } from "react-router-dom";

const ExploreSectionMiddle = () => {
  return (
    <div className="section-middle">
      <div className="nav">
        <NavLink to="/explore" className="a" activeClassName={"acive-link"}>
          For you
        </NavLink>
        <NavLink to="/explore" className="a" activeClassName={"acive-link"}>
          News
        </NavLink>
        <NavLink to="/explore" className="a" activeClassName={"acive-link"}>
          Sports
        </NavLink>
        <NavLink to="/explore" className="a" activeClassName={"acive-link"}>
          Fun
        </NavLink>
        <NavLink to="/explore" className="a" activeClassName={"acive-link"}>
          Entertainment
        </NavLink>
      </div>
    </div>
  );
};

export default ExploreSectionMiddle;
