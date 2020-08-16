import React, { useEffect, useState } from "react";
import "../../../../../client_app/src/Styles/Profile.css";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const FirendsAddRemove = () => {
    const loginUser = useSelector(state => state.loggedUser);
    let { userName } = useParams();
    const [boolCheck, setboolCheck] = useState(true);
    const [user, setUser] = useState('');
    const [friends, setFriend] = useState([]);
    //Delete
    //userName = "ricoss123";
    //
    useEffect(() => {
        if (userName !== loginUser.nickname) {
            fetch('../graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `{
                                users { getByNickname(nickname: "${userName}") { id  }}
                                friends { getFriendsByUserId (userId: "${loginUser.id}"){ userId friendsList}}  
                                }`
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    setUser(res.users.getByNickname)
                    setFriend(res.friends.getFriendsByUserId.friendsList);
                })
                .catch(err => console.error(err));
        }
    }, [userName, loginUser.id, loginUser.nickname]);

    useEffect(() => {
        if ((userName !== loginUser.nickname) && (userName !== "settings")) {
            friends.find((element)=>{
                element === user.id ? setboolCheck(false) : setboolCheck(true)
                    return null;
            });
        }
    });

    const addFriendf = () => {
        fetch('graphql',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `
                    mutation {
                      friends {
                        addFriend(userId: "${loginUser.id}", friendId:"${user}")
                        {friendsList}
                      }
                    }`
                    }),
                })
            .then(res => res.json())
            .then(res => console.log(res));
        setboolCheck(false);
    }

    const removeFriend = () => {
        //Api dla usuwanie znajomego Brak
        //fetch('graphql',
        //        {
        //            method: 'POST',
        //            headers: {
        //                'Content-Type': 'application/json'
        //            },
        //            body: JSON.stringify({
        //                query: `
        //            mutation {
        //              friends {
        //                romoveFriend(userId: "${loginUser.id}", friendId:"${user.id}")
        //                {friendsList}
        //              }
        //            }`
        //            }),
        //        })
        //    .then(res => res.json())
        //    .then(res => console.log(res));
        friends.splice(user);
        setboolCheck(true);
    }

    return ( 
        <div className="addRemove">
            {((userName === loginUser.nickname) || userName === "settings") ?
                <div></div>
                :
                (boolCheck === true) ?
                    <button className="addRemove btn btn-small btn-solid" onClick={(e) => addFriendf()}>
                        Add friend
                    </button>
                :
                    <button className="addRemove btn btn-small btn-solid"  onClick={(e) => removeFriend()}>
                        Remove a friend
                </button>
            }
        </div> 
  );
};

export default FirendsAddRemove;
