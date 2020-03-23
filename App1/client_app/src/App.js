import React, { Component }from "react"
import NavBar from "./components/NavBar"
import { withRouter, Router, Route, Switch } from "react-router-dom"
import history from "./utils/history"
import PrivateRoute from './components/PrivateRoute'

import './data'

import Template from './components/Template.jsx';
import Home from './components/Home/Home.jsx';
import Header from './components/Header/Header.jsx';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import './css/bootstrap-grid.css';
import './css/animate.css';


const darkTheme = getMuiTheme(darkBaseTheme)
const defautTheme = getMuiTheme(lightBaseTheme)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: defautTheme
        }
        window.theme = 0;
        window.toggleTheme = () => {
            if (window.theme === 0) {
                this.setState({ theme: darkTheme })
                document.body.style.backgroundColor = "darkgray"
                window.theme = 1;
            } else {
                this.setState({ theme: defautTheme })
                document.body.style.backgroundColor = "white"
                window.theme = 0;
            }
        };
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={this.state.theme}>
                <div className="content-wrapper">
                    <Header />
                    <NavBar />
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute path="/" component={Home} />
                            <Route exact path="/notifications" component={Template} />
                            <Route exact path="/messages" component={Template} />
                        </Switch>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
