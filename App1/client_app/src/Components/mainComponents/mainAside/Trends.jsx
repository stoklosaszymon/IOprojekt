import React from "react";
import { NavLink } from "react-router-dom";

const Trends = () => {
  return (
    <div className="trends-container aside-div-container">
      <div className="trends aside-div">
        <div className="trends-head aside-head">
          <div>
            <span>Najpopularniejsze Hasztagi</span>
          </div>
          <div className="a-container">
            <NavLink to="/settings/trends" className="a">
              <svg viewBox="0 0 24 24" className="main-img">
              </svg>
            </NavLink>
          </div>
        </div>
        <div className="aside-body">
          <a href="#trends">#trendingTopic1</a>
          <a href="#trends">#trendingTopic2</a>
          <a href="#trends">#trendingTopic3</a>
          <a href="#trends">#trendingTopic4</a>
        </div>
        <div className="aside-foot">
          <NavLink to="/trends" className="a">
            <p>Show more</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Trends;
