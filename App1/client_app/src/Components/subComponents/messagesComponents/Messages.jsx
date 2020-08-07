import React, { useState, useEffect } from 'react';
import SectionHeader from "../../mainComponents/mainSection/SectionHeader";
import SectionMiddle from "../../mainComponents/mainSection/SectionMiddle";
import MessageLogo from "../../assets/MessageLogo";
import Search from "../../mainComponents/mainAside/Search";
import "../../../../../client_app/src/Styles/Messages.css";
import MainAvatar from "../../../Components/mainComponents/PostComponents/MainAvatar"
import FullName from "../../../Components/mainComponents/PostComponents/FullName"
import { useSelector } from 'react-redux';


const Messages = () => {

    const [users, setUsers] = useState([]);
    const [friends, setFriend] = useState([]);
    const user = useSelector(state => state.loggedUser);



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

    return (
        <div className="main-container messages">
            <section>
                <SectionHeader heading="Messages" logo={<MessageLogo/>}/>
                <SectionMiddle data={<Search/>}/>
                <div className="Friends-container aside-div-container">
                    {listFriend.map((x, index) =>
                        <div className="Friends aside-body" key={index}>
                            <div className="Friends main-avatar">
                                <MainAvatar picture={x.picture}/>
                            </div>
                            <FullName firstName={x.firstName} lastName={x.lastName}/>
                            <div className="aside-foot">
                                <p>______________________________________</p>
                            </div>
                        </div>)}
                </div>
            </section>
            <aside>
            </aside>
        </div>
    );
}

 export default Messages;