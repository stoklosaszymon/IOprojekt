import React from "react";
import Owned from "./Owned";
import Subscriptions from "./Subscriptions";
import Membership from "./Membership";
import { Route, Switch } from "react-router-dom";

const ListsStream = () => {
  return (
    <div className="default">
      <Switch>
        <Route path="/i/lists/subscriptions" component={Subscriptions} />
        <Route path="/i/lists/membership" component={Membership} />
        <Route path="/i/lists" component={Owned} />
      </Switch>
    </div>
  );
};

export default ListsStream;
