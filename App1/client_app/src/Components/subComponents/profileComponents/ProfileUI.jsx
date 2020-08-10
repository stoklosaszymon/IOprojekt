import React from "react";
import BannerImg from "../../assets/img/404-bg-img.jpg";
import AddRemove from "./FirendsAddRemove";
import { NavLink } from "react-router-dom";

const ProfileUI = ({ user }) => {
  return (
      <div className="profile-ui">
          <div className="userBanner">
              <div className="banner">
                  <div className="banner-img" style={bannerStyle}></div>
              </div>
          </div>
          <div className="userData">
              <div className="userAvatar-container">
                  <a href="#avatar" className="avatar-container">
                      <div className="avatar">
                          <img src={user.picture} alt="avatar" />
                      </div>
                  </a>
                  <div className="friendsAddRemove">
                      <AddRemove />
                  </div>
                  <div className="edit-profile-btn">
                      <NavLink to="/settings/profile" className="a">
                          Edit profile
                      </NavLink>
                  </div>
        </div>
        <div className="user-name-container">
                  <div className="full-name">{`${user.firstName} ${user.lastName}`}</div>
                  <div className="username">{user.nickname}</div>
        </div>
        <div className="join-date-container">
          <div className="calender-logo">
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                <circle cx="7.032" cy="8.75" r="1.285"></circle>
                <circle cx="7.032" cy="13.156" r="1.285"></circle>
                <circle cx="16.968" cy="8.75" r="1.285"></circle>
                <circle cx="16.968" cy="13.156" r="1.285"></circle>
                <circle cx="12" cy="8.75" r="1.285"></circle>
                <circle cx="12" cy="13.156" r="1.285"></circle>
                <circle cx="7.032" cy="17.486" r="1.285"></circle>
                <circle cx="12" cy="17.486" r="1.285"></circle>
              </g>
            </svg>
          </div>
          <span>Joined&nbsp;</span>
          <span>{user.createdAt}</span>
        </div>
        <div className="follow-count-container">
          <div className="following">
            <span className="count">0</span>
            &nbsp;Following
          </div>
          <div className="followers">
            <span className="count">0</span>
            &nbsp;Followers
          </div>
        </div>
      </div>
    </div>
  );
};

const bannerStyle = {
  width: "100%",
  height: "200px",
  backgroundImage: `url(${BannerImg})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: "#2F3336"
};

export default ProfileUI;
