import React, { useState, useEffect } from 'react';
import SectionHeader from "../../mainComponents/mainSection/SectionHeader";
//import SectionMiddle from "../../mainComponents/mainSection/SectionMiddle";
import MessageLogo from "../../assets/MessageLogo";
//import Search from "../../mainComponents/mainAside/Search";
import "../../../../../client_app/src/Styles/Messages.css";
import MainAvatar from "../../../Components/mainComponents/PostComponents/MainAvatar"
import FullName from "../../../Components/mainComponents/PostComponents/FullName"
import { useSelector } from 'react-redux';
import * as signalR from "@microsoft/signalr";

const Messages = () => {

    const [users, setUsers] = useState([]);
    const [friends, setFriend] = useState([]);
    const user = useSelector(state => state.loggedUser);
    const [fName, setName] = useState('');
    const [lName, setLastName] = useState('');
    const [nick, setNick] = useState('');
    //hub
    //mesage
    const [message, setMessage] = useState('');
    //private
    const [messages, setMessages] = useState([]);
    const [listmessage, setlistmessage] = useState([]);
    //group
    const [group, setGroup] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);
    const [roomName, setroomName] = useState('');
    const [listmessagesGroup, setlistmessagesGroup] = useState([]);
    //hubConnection
    const [hubConnection, setHubConnection] = useState();
    //bool
    const [check, setcheck] = useState(true);
    const [boolCheckPlus, setboolCheckPlus] = useState(false);
    const [boolCheckMinus, setboolCheckMinus] = useState(false);


    useEffect(() => {
        fetch('../graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query:
                        `{
                            friends {
                               getFriendsByUserId
                                         (userId: "${user.id}"){ userId friendsList}
                                    }
                       
                    users {
                               getAll {
                                id firstName lastName picture nickname 
                                      }
                            }
                    }`
                }),
            })
            .then(res => res.json())
            .then(res => {
                setFriend(res.friends.getFriendsByUserId.friendsList);
                setUsers(res.users.getAll);
            })
            .catch(err => console.error(err));
    }, [user.id]);

    let listFriend = friends.map(x => {
        return ({ ...users.find(p => p.id === x) });
    });

    const boolCheck = () => {
        setroomName('');
        setcheck(false);
    };

    const setPrivateroom = (firstName, lastName, nickuser) => {
        setName(firstName);
        setLastName(lastName);
        setNick(nickuser);
        setroomName('');
        setMessages(m => []);
        for (var i = 0, k = 0; i < listmessage.length / 3; i++, k += 3) {
            if ((listmessage[k] === user.nickname && listmessage[k + 1] === nickuser) ||
                (listmessage[k] === nickuser && listmessage[k + 1] === user.nickname)) {
                let y = k + 2;
                setMessages(x => [...x, listmessage[y]]);
            }
        }
    };

    const setGroup1 = (Name) => {
        setroomName(Name);
        setName('');
        setLastName('');
        setNick('');
        setMessagesGroup(m => []);
        for (var i = 0, k = 0; i < listmessagesGroup.length / 2; i++, k += 2) {
            if (listmessagesGroup[k] === roomName) {
                let y = k + 1;
                setMessagesGroup(x => [...x, listmessagesGroup[y]]);
            }
        }
    };

    //hub
    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new signalR.HubConnectionBuilder()
                .withUrl("/chatHub")
                .build();
            try {
                await hubConnect.start();
                console.log('Connection successful!');
                // Bind event handlers to the hubConnection.
                hubConnect.invoke('Login', user.nickname);
                hubConnect.on('SendNameGroup', (roomName) => {
                    setGroup(x => [...x, `${roomName}`]);
                });
                hubConnect.on('SendMessageGroup', (firstName, lastName, receivedMessage, roomName) => {
                    setMessagesGroup(m => [...m, `${firstName} ${lastName} : ${receivedMessage}`]);
                    setlistmessagesGroup(m => [...m, `${roomName}`, `${firstName} ${lastName} : ${receivedMessage}`]);
                });
                hubConnect.on('SendMessageToUser', (firstName, lastName, receivedMessage, yourname, toName) => {
                    setMessages(m => [...m, `${firstName} ${lastName} : ${receivedMessage}`]);
                    setlistmessage(m => [...m, `${yourname}`, `${toName}`, `${firstName} ${lastName} : ${receivedMessage}`]);
                });
            }
            catch (err) {
                alert(err);
                console.log('Error while establishing connection: ' + { err });
            }
            setHubConnection(hubConnect);
        };
        createHubConnection();
    }, [user.nickname]);
 
    async function message1() {
        if (roomName === '')
            try {
                if (hubConnection && message !== '') {
                    await hubConnection.invoke('SendMessageToUser', nick, user.nickname, message, user.firstName, user.lastName);
                    //console.log(message);
                }
            }
            catch (err) {
                console.error(err);
            }
        else
            try {
                if (hubConnection && message !== '') {
                    await hubConnection.invoke('SendMessageGroup', user.nickname, message, roomName, user.firstName, user.lastName);
                    //console.log(message);
                }
            }
            catch (err) {
                console.log(err);
            }
        setMessage('');
    };

    async function createGroup() {
        try {
            await hubConnection.invoke('CreateRoom', roomName);
            //console.log(roomName + 'createGroup');
            setcheck(true);
            setGroup(x => [...x, `${roomName}`]);
        }
        catch (err) {
            console.log(err);
        }
    };

    async function addUser(nick) {
        try {
            await hubConnection.invoke('AddUserRoom', roomName, nick);
           // console.log(nick + ' add ->' + roomName);
            setboolCheckPlus(false);
        }
        catch (err) {
            console.log(err);
        }
    };

    async function removeUser(nick) {
        try {
            await hubConnection.invoke('RemoveUserRoom', roomName, nick);
            //console.log(nick + ' remove ->' + roomName);
            setboolCheckMinus(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="main-container messages">
            <section>
                <SectionHeader heading="Messages" logo={<MessageLogo />}/>
                {/*<SectionMiddle data={<Search />}/>*/}
                <div className="messages aside-div-container">
                    {listFriend.map((x, index) =>
                        <div className="messages aside-body" key={index} onClick={(e) => setPrivateroom(x.firstName, x.lastName, x.nickname)}>
                            <div className="messages main-avatar">
                                <MainAvatar picture={x.picture} />
                            </div>
                            <div className="messages name">
                                <FullName firstName={x.firstName} lastName={x.lastName} />
                            </div>
                        </div>)}
                </div>
                <div className="group section-header">Twoje Grupy</div>
                <div className="group-container aside-div-container">
                    {group.map((x, index) => (
                        <div className="group aside-body" key={index} onClick={(e) => setGroup1(x)}>
                            <p className="group name">{x}</p>
                        </div>))}
                </div>
            </section>
            <aside>
                <div>
                    <div className="button-place section-header">
                        <div className="button-place">
                            <span>
                                <div className="button-place name-selected">
                                    <FullName firstName={fName} lastName={lName}/>
                                    <p className="button-place group-selected">{roomName}</p>
                                </div>
                                <div>
                                    <div className="button-place create-group" onClick={(e) => boolCheck()}>
                                        {(check === true) ?
                                            <p> Stworz Grupe</p>
                                            :
                                            <div className="button-place name-group">
                                                <input
                                                    type="text"
                                                    value={roomName}
                                                    onChange={e => setroomName(e.target.value)}
                                                    maxLength={255}
                                                />
                                                <button className="button-place btn btn-small btn-solid" onClick={createGroup}>Create</button>
                                            </div>
                                        }
                                    </div>
                                    {(roomName === '') || (check === false) ?
                                        <div></div> :
                                        <div className="button-place position">
                                            <button className="button-place plus btn btn-small btn-solid" onClick={(e) => setboolCheckPlus(true)}>Plus</button>
                                            <button className="button-place minus btn btn-small btn-solid" onClick={(e) => setboolCheckMinus(true)}>Minus</button>
                                        </div>
                                    }
                                </div>
                            </span>
                        </div>
                    </div>
                    {((fName === '' && lName === '') && roomName === '') ?
                        <div> <p>Wybierz Rozmowce </p></div>
                        :
                        <div>
                            {(boolCheckPlus === false && boolCheckMinus === false) ?
                                <div className="chat">
                                    <div className="chat display">
                                        <div>
                                            {(roomName === '') ?
                                                messages.map((message, index) => (
                                                    <div style={{ display: 'block' }} key={index}> {message} </div>
                                                ))
                                                :
                                                messagesGroup.map((message, index) => (
                                                    <div style={{ display: 'block' }} key={index}> {message} </div>
                                                ))}
                                            <br />
                                        </div>
                                    </div>
                                    <div className="chat">
                                        <div>
                                            <span>
                                                <input
                                                    className="chat write"
                                                    type="text"
                                                    value={message}
                                                    onChange={e => setMessage(e.target.value)}
                                                    maxLength={255} />
                                                <button className="chat btn btn-small btn-solid"onClick={message1}>Send</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                : (boolCheckPlus === true && boolCheckMinus === false) ?
                                    <div className="messages aside-div-container">
                                        <span className="a" onClick={(e) => setboolCheckPlus(false)}>
                                            <svg viewBox="0 0 24 24" className="main-img">
                                                <g>
                                                    <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {listFriend.map((x, index) =>
                                            <div className="messages aside-body" key={index} onClick={(e) => addUser(x.nickname)}>
                                                <div className="messages main-avatar">
                                                    <MainAvatar picture={x.picture} />
                                                </div>
                                                <div className="messages">
                                                    <FullName firstName={x.firstName} lastName={x.lastName} />
                                                </div>
                                            </div>)}

                                    </div>
                                    :
                                    <div className="messages aside-div-container">
                                        <span className="a" onClick={(e) => setboolCheckMinus(false)}>
                                            <svg viewBox="0 0 24 24" className="main-img">
                                                <g>
                                                    <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        {listFriend.map((x, index) =>
                                            <div className="messages aside-body" key={index} onClick={(e) => removeUser(x.nickname)}>
                                                <div className="messages main-avatar">
                                                    <MainAvatar picture={x.picture} />
                                                </div>
                                                <div className="messages">
                                                    <FullName firstName={x.firstName} lastName={x.lastName} />
                                                </div>
                                            </div>)}
                                    </div>
                            }
                        </div>
                    }
                </div>
            </aside>
        </div>
    );
};
export default Messages;