import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
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
            messageGroup: '',
            messagesGroup: [],
            privNick: '',
            user: '',
        };  
    }

    componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');

        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('SendMessageToUser', (nick, receivedMessage, ) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        }); 
    }

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
    //sendMessage = () => {
    //    this.state.hubConnection
    //        .invoke('SendMessageToAll', this.state.nick, this.state.message)
    //        .catch(err => console.error(err));
    //    this.setState({ message: '' });
    //};

    //JoniChat = () => {

    //    this.state.hubConnection
    //        .invoke('JoinRoom', this.state.Nover)
    //        .then(() => console.log('Connection started! Nover'))
    //        .catch(err => console.error(err));

    //    this.state.hubConnection.on('SendMessageGroup', (nick, receivedMessage, ) => {
    //        const text = `${nick}: ${receivedMessage}`;
    //        const messagesnover = this.state.messagesnover.concat([text]);
    //        this.setState({ messagesnover });
    //    });

    //};

    //sendMessageNover = () => {
    //    this.state.hubConnection
    //        .invoke('SendMessageGroup', this.state.nick, this.state.messagenover, this.state.Nover)
    //        .catch(err => console.error(err));

    //    this.setState({ messagenover: '' });
    //};

    sendNick = () => {
        this.state.hubConnection
            .invoke('Login', this.state.nick)
            .then(() => console.log('Apllay'))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div>
                            <button onClick={this.sendNick}>Login</button>
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


                    </Col>

                    <Col>
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
                    </Col>
                </Row >
            </Container >
        );
    }
}