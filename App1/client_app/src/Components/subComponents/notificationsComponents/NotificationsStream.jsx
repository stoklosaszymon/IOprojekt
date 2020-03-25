import React from "react";
import AllNotifications from "./AllNotifications";
import Mentions from "./Mentions";
import Error404 from "../../Pages/Error404";
import { Route, Switch } from "react-router-dom";

const NotificationsStream = () => {
  return (
    <div className="default">
      <Switch>
        <Route
          path="/notifications"
          exact={true}
          component={AllNotifications}
        />
        <Route path="/notifications/mentions" component={Mentions} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
};

export default NotificationsStream;
