import React, { Component }from "react"
import { withRouter, Router, Route, Switch } from "react-router-dom"
import history from "./utils/history"


import NavBar from "./components/NavBar"
import PrivateRoute from './components/PrivateRoute'


import Header from "./components/Layouts/Header";
import Home from "./components/Pages/Home";
import Explore from "./components/Pages/Explore";
import Notifications from "./components/Pages/Notifications";
import Messages from "./components/Pages/Messages";
import Bookmarks from "./components/Pages/Bookmarks";
import Lists from "./components/Pages/Lists";
import Profile from "./components/Pages/Profile";
import Toast from "./components/subComponents/Toast";
import TrendsSettingBody from "./components/subComponents/TrendsSetting";
import Compose from "./components/subComponents/messagesComponents/Compose";
import CreateLists from "./components/subComponents/listsComponents/CreateLists";
import ProfileSetting from "./components/subComponents/profileComponents/ProfileSetting";
import Error404 from "./components/Pages/Error404";

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
                            {/* Explore */}
                            <Route path="/explore" component={Explore} />]
                            {/* Notification */}
                            <Route path="/notifications" component={Notifications} />
                            {/* Messages */}
                            <Route path="/messages" exact component={Messages} />
                            <Route path="/messages/compose" component={() => (
                            <Toast header="New message" btnText="Next" body={<Compose />} />
                            )} />
                            {/* Bookmarks */}
                            <Route path="/i/bookmarks" component={Bookmarks} />
                            {/* Lists */}
                            <Route path="/i/lists" component={Lists} />
                            <Route path="/lists/create" component={() => (
                            <Toast header="Create new List" btnText="Next" body={<CreateLists />}
                            />)} />
                            {/* Profile */}
                            <Route path="/userName" component={Profile} />
                            <Route path="/settings/profile" component={() => (
                            <Toast header="Edit Profile" btnText="Save" body={<ProfileSetting />}
                            /> )} />
                            {/* Trends */}
                            <Route path="/settings/trends" component={() => (
                            <Toast header="Trends" body={<TrendsSettingBody />} />
                            )} />
                            {/* Error 404 */}
                            <Route component={Error404} />
                        </Switch>
                        </main>
                    </Router>
                </div>
        );
}

export default withRouter(App);
