import React, { Component } from 'react';

import HomeFollow from './HomeFollow'

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
            
          </div>
          <div className="col-sm-6">

          </div>
          <div className="col-sm-3">
          </div>
        </div>
      </div>
    );
  }
}

// Dodac HomeFollow Do sm-3

export default Home;