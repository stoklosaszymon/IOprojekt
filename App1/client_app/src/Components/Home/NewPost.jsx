import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Paper} from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconPhoto from 'material-ui/svg-icons/editor/insert-photo';
import IconVideo from 'material-ui/svg-icons/av/videocam';
import IconGif from 'material-ui/svg-icons/action/gif';
import IconPoll from 'material-ui/svg-icons/social/poll';
import IconLocation from 'material-ui/svg-icons/communication/location-on';
import {TextField, RaisedButton} from 'material-ui';
import { Picker } from 'emoji-mart';
import { Smile } from 'react-feather';


import 'emoji-mart/css/emoji-mart.css';
const styles = (theme) => ({
    input: {
        display: 'none'
    }
});

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: window.data.auth.user
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="row">
        <Paper className="new-post-container">
          <TextField floatingLabelText="What's happening ?" id="newpost" name="newpost" rows={1} fullWidth={true} multiLine={true}/>
          <div className="new-post-action">
          <Fragment>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-photo"
                    onChange={this.handleCapture}
                    type="file"
                />
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <IconPhoto />
                    </IconButton>
                </label>
                <input
                    accept="video/*"
                    capture="camcorder"
                    className={classes.input}
                    id="icon-button-video"
                    onChange={this.handleCapture}
                    type="file"
                />
                <label htmlFor="icon-button-video">
                    <IconButton color="primary" component="span">
                        <IconVideo />
                    </IconButton>
                </label>
            </Fragment>
            <IconButton><IconGif /></IconButton>
            <IconButton><IconPoll /></IconButton>
            <RaisedButton className="pull-right" label="Post" primary={true} />
          </div>
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPost);