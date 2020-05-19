import React from "react";
import { Route, Switch } from "react-router-dom";
import Tweets from "./Tweets";
import Error404 from "../../Pages/Error404";

const ProfileStream = () => {
  return (
    <div>
      <Switch>
        <Route path="/:userName" exact={true} component={Tweets} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
};

export default ProfileStream;
