import React, { useState, useEffect } from 'react';
import SearchLogo from "../../assets/SearchLogo";
import "../../../../../client_app/src/Styles/Profile.css";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import MainAvatar from "../../../Components/mainComponents/PostComponents/MainAvatar"
import FullName from "../../../Components/mainComponents/PostComponents/FullName"

const FriendList = () => {

    const [users, setUsers] = useState([]);
    const [friends, setFriend] = useState([]);
    const user = useSelector(state => state.loggedUser);

    useEffect(() => {
        fetch('graphql', {
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

    return (
        <div className="Friend-List">
        <div className="body compose">
         <SearchLogo />
         <input type="text" autoFocus />
        </div>
            <div className="Friend-List aside-div-container">
                {listFriend.map((x, index) =>
                    <NavLink className="Friend-List aside-body" key={index} to={`/${x.nickname}`}>
                        <div className="Friend-List main-avatar">
                          <MainAvatar picture={x.picture} />
                      </div>
                        <div className="Friend-List name">
                          <FullName firstName={x.firstName} lastName={x.lastName} />
                       </div>
                    </NavLink>
                  )}
             </div>
    </div>
  );
};

export default FriendList;
