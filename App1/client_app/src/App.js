import React, { Component }from "react"
import { withRouter, Router, Route, Switch } from "react-router-dom"
import history from "./utils/history"


import NavBar from "./Components/NavBar"
import PrivateRoute from './Components/PrivateRoute'


import Header from "Components/Layouts/Header";
import Home from "Components/Pages/Home";

import './data'


function App () {
        return (
                <div className="container">
                    <Router history={history}>
                        <Header />
                        <NavBar />
                        <main>
                        <Switch>
                            {/* Home */}
                            <PrivateRoute path="/" exact component={Home} />
                            <Route path="/home" component={Home} />
                            <PrivateRoute path="/Profile" component={Profile} />
                            <Route exact path="/notifications" component={Template} />
                            <Route exact path="/messages" component={Template} />
                        </Switch>
                        </main>
                    </Router>
                </div>
        );
}

export default withRouter(App);
