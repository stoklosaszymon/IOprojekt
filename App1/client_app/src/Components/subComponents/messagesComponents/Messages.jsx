import React, { useState, useEffect } from 'react';
import SectionHeader from "../../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../../mainComponents/mainSection/SectionMiddle";
import MessageLogo from "../../assets/MessageLogo";
import Search from "../../mainComponents/mainAside/Search";
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
   
    //group
    const [group, setGroup] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);
    const [roomName, setroomName] = useState('');
    //hub
    const [hubConnection, setHubConnection] = useState();
    // bool
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

    let tab = ['5f045dae0a775e3df8c4d3e1', '5f04591eacb27238c8b545c1'];//, '5f045dae0a775e3df8c4d3e1', '5f04591eacb27238c8b545c1', '5f045dae0a775e3df8c4d3e1', '5f04591eacb27238c8b545c1'];

    let listFriend = tab.map(x => {
        return ({ ...users.find(p => p.id === x) })
    });

    const boolCheck = () => {
        setroomName('');
        setcheck(false);
    }

    const SetPrivateroom = (firstName, lastName, nickuser) => {
        setName(firstName);
        setLastName(lastName);
        setNick(nickuser);
        setroomName('');
    };


    const SetGroup = (Name) => {
        setroomName(Name);
        setName('');
        setLastName('');
        setNick('');
    };

    //hub
    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new signalR.HubConnectionBuilder()
                .withUrl("/chatHub")
                .build();
            try {
                await hubConnect.start()
                console.log('Connection successful!')

                // Bind event handlers to the hubConnection.

                hubConnect.invoke('Login', user.nickname)

              

                hubConnect.on('SendMessageGroup', (firstName, lastName, receivedMessage, roomName) => {
                    setMessagesGroup(m => [...m, `${firstName} ${lastName} : ${receivedMessage}`]);
                   

                })
                hubConnect.on('SendMessageToUser', (firstName, lastName, receivedMessage, yourname, toName) => {
                    setMessages(m => [...m, `${firstName} ${lastName} : ${receivedMessage}`]);
                   

                })


            }
            catch (err) {
                alert(err);
                console.log('Error while establishing connection: ' + { err })
            }
            setHubConnection(hubConnect);
        }
        createHubConnection();

    }, []);

 
    async function Message() {
        if (roomName == '')
            try {
                if (hubConnection && message !== '') {
                    await hubConnection.invoke('SendMessageToUser', nick, user.nickname, message, user.firstName, user.lastName)
                    console.log(message);
                }
            }
            catch (err) {
                console.error(err);
            }
        else
            try {
                if (hubConnection && message !== '') {
                    await hubConnection.invoke('SendMessageGroup', user.nickname, message, roomName, user.firstName, user.lastName)
                    console.log(message);
                }
            }
            catch (err) {
                console.log(err);
            }

    };


    async function createGroup() {
        try {
            await hubConnection.invoke('CreateRoom', roomName)
            console.log(roomName + 'createGroup');
            setcheck(true);
            setGroup(x => [...x, `${roomName}`]);
        }
        catch (err) {
            console.log(err);
        }
    };


    async function addUser(nick) {
        try {
            await hubConnection.invoke('AddUserRoom', roomName, nick)
            console.log(nick + ' add ->' + roomName);
            setboolCheckPlus(false);
        }
        catch (err) {
            console.log(err);
        }
    };

    async function RemoveUser(nick) {
        try {
            await hubConnection.invoke('RemoveUserRoom', roomName, nick)
            console.log(nick + ' remove ->' + roomName);
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
                <SectionMiddle data={<Search />}/>

                <div className="Friends-container aside-div-container">
                    {listFriend.map((x, index) =>
                        <div className="Friends aside-body" key={index} onClick={(e) => SetPrivateroom(x.firstName, x.lastName, x.nickname)}>
                            <div className="Friends main-avatar">
                                <MainAvatar picture={x.picture} />
                            </div>
                            <FullName firstName={x.firstName} lastName={x.lastName} />
                            <div className="aside-foot">
                                <p>______________________________________</p>
                            </div> 
                        </div>)}
                </div>
                <div className="Friends-container aside-div-container">
                    {group.map((x, index) => (
                        <div className="Friends aside-body" key={index} onClick={(e) => SetGroup(x)}>
                            {x}
                        </div>))}
                </div>
            </section>
            <aside>
                <div>
                    <div className="section-header">
                        <div className="home-refresh">
                            <span>
                                <FullName firstName={fName} lastName={lName}/>
                                <div>
                                    <div onClick={(e) => boolCheck()}>
                                        {(check === true) ?
                                            <div>Stworz Grupe</div>
                                            :
                                            <div>
                                                <input
                                                    type="text"
                                                    value={roomName}
                                                    onChange={e => setroomName(e.target.value)}
                                                    maxLength={255}
                                                />
                                                <button onClick={createGroup}>Create</button>
                                            </div>
                                        }
                                    </div>
                                    {(roomName === '') || (check === false) ?
                                        <div></div> :
                                        <div>
                                            <button onClick={(e) => setboolCheckPlus(true)}>Plus</button>
                                            <br />
                                            <button onClick={(e) => setboolCheckMinus(true)}>Minus</button>
                                        </div>
                                    }
                                </div>
                            </span>
                        </div>
                    </div>
                    {((fName === '' && lName === '') && roomName === '') ?
                        <div> Z kim  rozmawiac chcesz </div>
                        :
                        <div>
                            {(boolCheckPlus === false && boolCheckMinus === false) ?
                                <div>
                                    <div className="name">
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
                                    <div className="section-header">

                                        <div className="home-refresh">
                                            <span>
                                                <input
                                                    type="text"
                                                    value={message}
                                                    onChange={e => setMessage(e.target.value)}
                                                    maxLength={255} />
                                                <button onClick={Message}>Send</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                : (boolCheckPlus === true && boolCheckMinus === false) ?
                                    <div className="Friends-container aside-div-container">
                                        {listFriend.map((x, index) =>
                                            <div className="Friends aside-body" key={index} onClick={(e) => addUser(x.nickname)}>
                                                <div className="Friends main-avatar">
                                                    <MainAvatar picture={x.picture} />
                                                </div>
                                                <FullName firstName={x.firstName} lastName={x.lastName} />
                                                <div className="aside-foot">
                                                    <p>______________________________________</p>
                                                </div>

                                            </div>)}
                                    </div>
                                    :
                                    <div className="Friends-container aside-div-container">
                                        {listFriend.map((x, index) =>
                                            <div className="Friends aside-body" key={index} onClick={(e) => RemoveUser(x.nickname)}>
                                                <div className="Friends main-avatar">
                                                    <MainAvatar picture={x.picture} />
                                                </div>
                                                <FullName firstName={x.firstName} lastName={x.lastName} />
                                                <div className="aside-foot">
                                                    <p>______________________________________</p>
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