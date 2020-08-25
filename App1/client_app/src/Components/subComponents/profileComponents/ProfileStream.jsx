import React from "react";
import { Route, Switch } from "react-router-dom";
import Tweets from "./Tweets";
import Toast from "../../subComponents/Toast";
import ProfileSetting from "../../subComponents/profileComponents/ProfileSetting";
import { useSelector } from 'react-redux';
import Error404 from "../../Pages/Error404";

const ProfileStream = ({ userId }) => {

    const user = useSelector(state => state.loggedUser);
    //user.nickname
  return (
    <div>
      <Switch>
              <Route path="/:userName" exact={true} component={() => (<Tweets userId={userId} />)} />
              <Route path="/settings/profile" component={() => (
                  <Toast header="Edit Profile" body={<ProfileSetting />} link={`/${user.nickname}`} exact={true} />)} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
};

export default ProfileStream;
