import React, { Component } from 'react';
import colors from '../lib/colors';
import ProfileDetails from './ProfileDetails';


class Profile extends Component {
  componentDidMount() {
    document.title = "Profile"
  }
  render() {
    return (
      <div className="main">

        <div className="container">
          <div className="main-left">
            <ProfileDetails/>
          </div>

          <div className="content">
            <div className="content-heading">Tweets</div>
          </div>

          <div className="main-right">
          </div>
        </div>

      <style jsx>{`
        .main {
          padding-top: 46px;
          min-height: 100vh;
          background: #e6ecf0;
        }

        .main-left,
        .main-right {
          width: 290px;
          padding: 0 8px;
        }

        .container {
          margin-top: 1rem;
          padding: 0 32px;
          display: flex;
        }

        .content {
          flex: 1 1 0%;
          border-top: 1px solid ${colors.boxBorder};
        }

        .content-heading {
          padding: 12px 15px;
          background: #fff;
          font-size: 1.2em;
          font-weight: 700;
          line-height: 1.2em;
          color: ${colors.heading};
          border: 1px solid ${colors.boxBorder};
        }

        .main :global(.wtf) {
          margin-bottom: 12px;
        }

        @media (max-width: 1280px) {
          .main-right {
            display: none;
          }

          .content {
            padding-right: 8px;
          }
        }
      `}</style>
    </div>
    );
  }
}

export default Profile;