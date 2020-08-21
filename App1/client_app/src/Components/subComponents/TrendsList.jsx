import React from "react";

const TrendsList = () => {
  return (
    <div className="body">
      <label>
        <div className="label-text">Trends for you</div>
        <div className="label-input">
                  <input type="checkbox" name="check" defaultChecked="true" />
        </div>
      </label>
    </div>
  );
};

export default TrendsList;
