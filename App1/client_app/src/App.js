import React from "react"
import { withRouter, Router, Route, Switch } from "react-router-dom"
import history from "./utils/history"


import Header from "./Components/Layouts/Header";
import Home from "./Components/Pages/Home";
import Notifications from "./Components/Pages/Notifications";
import Messages from "./Components/Pages/Messages";
import Profile from "./Components/Pages/Profile";
import Toast from "./Components/subComponents/Toast";
import TrendsSettingBody from "./Components/subComponents/TrendsSetting";
import Compose from "./Components/subComponents/messagesComponents/Compose";
import ProfileSetting from "./Components/subComponents/profileComponents/ProfileSetting";
import Start from "./Components/Pages/Start";


function App () {
        return (
                    <Router history={history}>
                        <Switch>
                            <div className="container">
                            <Header />
                            <main>
                            {/* Home */}
                            <Route path="/home" component={Home} />
                            <Route path="/" component={Start} />
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
                            </main>
                            </div>
                        </Switch>
                    </Router>
        );
}

export default withRouter(App);
