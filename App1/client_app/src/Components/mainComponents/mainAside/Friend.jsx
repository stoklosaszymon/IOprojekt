
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
    console.log(listFriend);
    return (
        <div >
            <h1>ll</h1>
        </div>
    )
};

export default Friend;
