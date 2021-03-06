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
import TrendsList from "./Components/subComponents/TrendsList"
import FriendList from "./Components/subComponents/listsComponents/FriendList"
import Start from "./Components/Pages/Start";
import more from "./Components/Pages/More";

function App() {
    return (
            <div className="container">
            <Router history={history}>
                <Header />
                <main>
                    <Switch>
                        {/* Login */}
                            <Route path="/login" component={Start} />
                        {/* Home */}
                        <Route path="/home" component={Home} />
                        {/* Notification */}
                        <Route path="/notifications" component={Notifications} />
                        {/* Messages */}
                        <Route path="/messages" exact={true} component={Messages} />
                        <Route path="/messages/compose" component={() => (
                            <Toast header="New message" btnText="Next" body={<Compose />} link="/messages" />
                        )} />
                        {/* settings */}
                        <Route path="/more" component={more} />
                        {/*Tosa*/}
                        <Route path="/friend" component={() => (
                            <Toast header="Friend List" body={<FriendList />} link="/home" exact={true} />)} />
                        <Route path="/trends" component={() => (
                            <Toast header="The most popular Hashtags" body={<TrendsList />} link="/home" exact={true} />)} />
                        {/* Profile */}
                        <Route path="/:userName" component={Profile} />
                        <Route path="/settings/profile" component={() => (
                            <Toast header="Edit Profile" btnText="Save" body={<ProfileSetting />} link="/:userName" />)} /> 
                        {/* Trends */}
                        <Route path="/settings/trends" component={() => (
                            <Toast header="Trends" body={<TrendsSettingBody />} link="/home" />
                        )} />
                    </Switch>
                </main>
            </Router>
        </div> 
   );
};

export default withRouter(App);

