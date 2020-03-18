import React, { Component } from 'react';

export default class Chat extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h1>Chat page</h1>
                <div className="container">
                    <div className="row">&nbsp;</div>
                    <div class="row">
                        <div class="col-2">User</div>
                        <div class="col-4"><input type="text" id="userInput" /></div>
                    </div>
                    <div class="row">
                        <div class="col-2">Message</div>
                        <div class="col-4"><input type="text" id="messageInput" /></div>
                    </div>
                    <div class="row">&nbsp;</div>
                    <div class="row">
                        <div class="col-6">
                            <input type="button" id="sendButton" value="Send Message" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <hr />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <ul id="messagesList"></ul>
                    </div>
                </div>
                
            </div>

            
        );
    }
}