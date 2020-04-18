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
            messagenover: '',
            messagesnover: [],
            Nover: 'Nover',
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

            //this.state.hubConnection.on('SendMessageToAll', (nick, receivedMessage) => {
            //    const text = `${nick}: ${receivedMessage}`;
            //    const messages = this.state.messages.concat([text]);
            //    this.setState({ messages });
            //});
        });
    }

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
                        </div>
                    </Col>



                    <col>
                    <div>
                        <button onClick={this.JoniChat}>Join Nover Chat</button>
                        <br />
                        <input
                            type="text"
                            value={this.state.messagenover}
                            onChange={e => this.setState({ messagenover: e.target.value })}
                        />
                        <button onClick={this.sendMessageNover}>Send</button>
                        <div>
                            {this.state.messagesnover.map((messagenover, index) => (
                                <span style={{ display: 'block' }} key={index}> {messagenover} </span>
                            ))}
                        </div>
                        </div>
                    </col>
                </Row >
            </Container >
        );
    }
}