import React from "react";
import ForYou from "./ForYou";
import News from "./News";
import Sports from "./Sports";
import Fun from "./Fun";
import Entertainment from "./Entertainment";
import { Route, Switch } from "react-router-dom";

const ExploreStream = () => {
  return (
    <div className="stream">
      <Switch>
        <Route path="/bookmarks" component={ForYou} />
        <Route path="/bookmarks" component={News} />
        <Route path="/bookmarks" component={Sports} />
        <Route path="/bookmarks" component={Fun} />
        <Route path="/bookmarks" component={Entertainment} />
      </Switch>
    </div>
  );
};

export default ExploreStream;
