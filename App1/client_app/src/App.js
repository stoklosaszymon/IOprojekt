import React from "react"
import { withRouter, Router, Route, Switch } from "react-router-dom"
import history from "./utils/history"


import NavBar from "./Components/NavBar"
import Header from "./Components/Layouts/Header";
import Home from "./Components/Pages/Home";
import Notifications from "./Components/Pages/Notifications";
import Messages from "./Components/Pages/Messages";
import Profile from "./Components/Pages/Profile";
import Toast from "./Components/subComponents/Toast";
import TrendsSettingBody from "./Components/subComponents/TrendsSetting";
import Compose from "./Components/subComponents/messagesComponents/Compose";
import ProfileSetting from "./Components/subComponents/profileComponents/ProfileSetting";
import Error404 from "./Components/Pages/Error404";


function App () {
        return (
                <div className="container">
                    <Router history={history}>
                        <Header />
                        <NavBar />
                        <main>
                        <Switch>
                            {/* Home */}
                            <Route path="/home" component={Home} />
                            {/* Notification */}
                            <Route path="/notifications" component={Notifications} />
                            {/* Messages */}
                            <Route path="/messages" exact component={Messages} />
                            <Route path="/messages/compose" component={() => (
                            <Toast header="New message" btnText="Next" body={<Compose />} />
                            )} />
                            {/* Profile */}
                            <Route path="/:userName" component={Profile} />
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
