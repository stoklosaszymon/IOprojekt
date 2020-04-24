import React from "react";

const TrendsSettingBody = () => {
  return (
    <div className="body">
      <label>
        <div className="label-text">Trends for you</div>
        <div className="label-input">
          <input type="checkbox" name="check" checked />
        </div>
      </label>
      <div className="label-info">
        <span>
          Personalize trends based on your current location and who you follow.
        </span>
      </div>
    </div>
  );
};

export default TrendsSettingBody;
