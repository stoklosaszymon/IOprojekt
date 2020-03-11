import React from "react"
import NavBar from "./components/NavBar"
import { Router, Route, Switch } from "react-router-dom"
import Profile from "./components/Profile"
import history from "./utils/history"
import Home from "./components/Home"
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/home" component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;