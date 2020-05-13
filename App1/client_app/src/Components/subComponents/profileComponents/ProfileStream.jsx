import React from "react";
import { Route, Switch } from "react-router-dom";
import Tweets from "./Tweets";
import Replies from "./Replies";
import Media from "./Media";
import Likes from "./Likes";
import Error404 from "../../Pages/Error404";

const ProfileStream = () => {
  return (
    <div>
      <Switch>
        <Route path="/:userName" exact={true} component={Tweets} />
        <Route path="/:userName/replies" component={Replies} />
        <Route path="/:userName/media" component={Media} />
        <Route path="/:userName/likes" component={Likes} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
};

export default ProfileStream;
