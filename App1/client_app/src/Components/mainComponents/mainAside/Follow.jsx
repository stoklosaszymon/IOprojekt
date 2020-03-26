import React from "react";

const Follow = () => {
  return (
    <div className="whoToFollow-container aside-div-container">
      <div className="whoToFollow aside-div">
        <div className="aside-head">
          <span>Who to follow</span>
        </div>
        <div className="aside-body">
          <a href="#follow">User 1</a>
          <a href="#follow">User 3</a>
          <a href="#follow">User 4</a>
        </div>
        <div className="aside-foot">
          <a href="#follow">Show more</a>
        </div>
      </div>
    </div>
  );
};
export default Follow;
