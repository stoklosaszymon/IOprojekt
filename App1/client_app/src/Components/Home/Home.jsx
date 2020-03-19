import React, { Component } from 'react';

import HomeUserProfile from './HomeUserProfile'
import HomeFollow from './HomeFollow'
import HomeTrends from './HomeTrends'
import NewPost from './NewPost'
import ToggleTheme from './ToggleTheme'
import {Paper, Avatar} from 'material-ui';


class Home extends Component {
  componentDidMount() {
    document.title = "Home"
  }
  render() {
    return (
      <div className="countainer main-content">
        <div className="row">
          <div className="col-sm-3">
          <HomeTrends/>
          <HomeUserProfile/>
          </div>
          <div className="col-sm-6">
          <NewPost/>
          </div>
          <div className="col-sm-3">
          <HomeFollow/>
          <ToggleTheme/>
          </div>
        </div>
      </div>
    );
  }
}

// Dodac HomeFollow Do sm-3

export default Home;