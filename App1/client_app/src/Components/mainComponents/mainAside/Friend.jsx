
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import FullName from "./../PostComponents/FullName";
import MainAvatar from "./../PostComponents/MainAvatar";


const Friend = ({ id }) => {

    const [users, setUsers] = useState([]);
    const [friends, setFriend] = useState([]);


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
                                         (userId: "${id}"){ userId friendsList}
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

    }, [id]);

    

    let listFriend = friends.map(x => {
        return ({ ...users.find(p => p.id === x, ...x) })
    });


    return (
        <div className="Friends-container aside-div-container">
            <div className="Friends aside-div">
                <div className="Friends-head aside-head">
                    <div>
                        <span>Znajomi</span>
                    </div>
                </div>
                <div className="Friends aside-body">
                    {listFriend.filter((i, idx) => idx < 4).map(x =>

                        <a href={`/${x.nickname}`}>
                            <div className="Friends main-avatar">
                                <MainAvatar picture={x.picture} />
                            </div>
                            <FullName firstName={x.firstName} lastName={x.lastName} />
                        </a>

                    )}
                </div>
                <div className="aside-foot">
                    <a href="#Friend">Show more</a>
                </div>
            </div>

        </div>
    )
};

export default Friend;
