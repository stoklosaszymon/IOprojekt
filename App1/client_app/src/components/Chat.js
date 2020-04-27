import React, { Component } from 'react';
import * as signalR from "@microsoft/signalr";


export default class Chat extends Component {
    static displayName = Chat.name;
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
            roomName: '',
            messageGroup: '',
            messagesGroup: [],
            privNick: '',
            user: '',
        };
    }

    //componentDidMount = () => {
    //    //const nick = window.prompt('Your name:', 'John');

    //    //const hubConnection = new signalR.HubConnectionBuilder()
    //    //    .withUrl("/chatHub")
    //    //    .configureLogging(signalR.LogLevel.Information)
    //    //    .build();

    //    //this.setState({ hubConnection, nick }, () => {
    //    //    this.state.hubConnection
    //    //        .start()
    //    //        .then(() => console.log('Connection started!'))
    //    //        .catch(err => console.log('Error while establishing connection :('));

    //    //    this.state.hubConnection.on('SendMessageToUser', (nick, receivedMessage, ) => {
    //    //        const text = `${nick}: ${receivedMessage}`;
    //    //        const messages = this.state.messages.concat([text]);
    //    //        this.setState({ messages });
    //    //    });
    //    //    this.state.hubConnection.on('SendMessageGroup', (nick, receivedMessage, ) => {
    //    //        const text = `${nick}: ${receivedMessage}`;
    //    //        const messagesGroup = this.state.messagesGroup.concat([text]);
    //    //        this.setState({ messagesGroup });
    //    //    });
    //    //});
    //}

    private = () => {
        this.state.hubConnection
            .invoke('SendMessageToUser', this.state.nick, this.state.privNick, this.state.message)
            .then(() => console.log("Send"))
            .catch(err => console.error(err));
    }

    createGroup = () => {
        this.state.hubConnection
            .invoke('CreateRoom', this.state.roomName)
            .then(() => console.log(this.state.roomName))
            .catch(err => console.error(err));

    }

    addUser = () => {
        this.state.hubConnection
            .invoke('AddUserRoom', this.state.roomName, this.state.user)
            .then(() => console.log(this.state.user))
            .catch(err => console.error(err));
    };


    sendGroup = () => {

        this.state.hubConnection
            .invoke('SendMessageGroup', this.state.nick, this.state.messageGroup, this.state.roomName)
    };

    RemoveUser = () => {

        this.state.hubConnection
            .invoke('RemoveUserRoom', this.state.roomName, this.state.user)
            .then(() => console.log(this.state.user))
            .catch(err => console.error(err));
    }

    sendNick = () => {
        if (this.state.hubConnection == null) {
            const nick = this.state.nick
            const hubConnection = new signalR.HubConnectionBuilder()
                .withUrl("/chatHub")
                .configureLogging(signalR.LogLevel.Information)
                .build();

            this.setState({ hubConnection, nick }, () => {
                this.state.hubConnection
                    .start()
                    .then(() => 
                        this.state.hubConnection
                            .invoke('Login', this.state.nick)
                            .then(() => console.log('Connection'))
                            .catch(err => console.error(err)))
                    .catch(err => console.log('Error while establishing connection :('));

                this.state.hubConnection.on('SendMessageToUser', (nick, receivedMessage, ) => {
                    const text = `${nick}: ${receivedMessage}`;
                    const messages = this.state.messages.concat([text]);
                    this.setState({ messages });
                });
                this.state.hubConnection.on('SendMessageGroup', (nick, receivedMessage, ) => {
                    const text = `${nick}: ${receivedMessage}`;
                    const messagesGroup = this.state.messagesGroup.concat([text]);
                    this.setState({ messagesGroup });
                });

            });
        }
        
               

    }

    render() {
        return (
            <div>
                <div>
                    Nick:
                    <br />
                    <input
                        type="text"
                        value={this.state.nick}
                        onChange={e => this.setState({ nick: e.target.value })}
                    />
                    <br />
                <button onClick={this.sendNick}>Login chat</button>
                <br />


                             Send priv to:
                            <br />
                <input
                    type="text"
                    value={this.state.privNick}
                    onChange={e => this.setState({ privNick: e.target.value })}
                />
                <br />
                            Room Name:
                            <br />
                <input
                    type="text"
                    value={this.state.roomName}
                    onChange={e => this.setState({ roomName: e.target.value })}
                />
                <br />
                <button onClick={this.createGroup}>CreateGroup</button>
                <br />
                            User:
                            <br />
                <input
                    type="text"
                    value={this.state.user}
                    onChange={e => this.setState({ user: e.target.value })}
                />
                <br />
                <button onClick={this.addUser}>Add</button>
                <button onClick={this.RemoveUser}>Remove</button>
            </div>
            <h1> Priv </h1>
            <div>
                <input
                    type="text"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />
                <br />
                <button onClick={this.private}>Send</button>
                {this.state.messages.map((message, index) => (
                    <span style={{ display: 'block' }} key={index}> {message} </span>
                ))}
            </div>

            <h1> Group </h1>
            <div>
                <input
                    type="text"
                    value={this.state.messageGroup}
                    onChange={e => this.setState({ messageGroup: e.target.value })}
                />
                <br />
                <button onClick={this.sendGroup}>Send</button>
                {this.state.messagesGroup.map((messageGroup, index) => (
                    <span style={{ display: 'block' }} key={index}> {messageGroup} </span>
                ))}
                </div>
            </div>
        );
    }
}

