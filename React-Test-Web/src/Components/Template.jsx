import React, { Component } from 'react';

import {Paper} from 'material-ui';
// tutaj dodac X

class Template extends Component {
  componentDidMount() {
    document.title = "Under construction"
  }
  render() {
    return (
      <div className="container main-content">
        <div className="row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-6">
            <div className="row">
              <Paper style={{padding:'20px', width:'100%'}}>
                <h3>Under construction</h3>
                <p>This component is not available.</p>
              </Paper>
            </div>
          </div>
          <div className="col-sm-3">
          </div>
        </div>
      </div>
    );
  }
}

export default Template;
