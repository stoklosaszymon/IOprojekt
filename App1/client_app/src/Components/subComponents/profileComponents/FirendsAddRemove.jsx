import React, { useEffect, useState } from "react";
import "../../../../../client_app/src/Styles/Profile.css";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const FirendsAddRemove = () => {
    const loginUser = useSelector(state => state.loggedUser);
    let { userName } = useParams();
    const [boolCheck, setboolCheck] = useState(true);
    const [found, setfound] = useState('');
    const [user, setUser] = useState({ id: '' });
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
        }}, [userName, loginUser.id]);


    useEffect(() => {
        if ((userName !== loginUser.nickname) && (userName !== "settings")) {
            let element = friends.find((element) => {
            return element === user.id;

        });
        element === user.id ? setboolCheck(false) : setboolCheck(true);
        }});

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
                        addFriend(userId: "${loginUser.id}", friendId:"${user.id}")
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
        friends.splice(user.id);
        setboolCheck(true);
    }
    return ( 
        <div className="addRemove">
            {((userName === loginUser.nickname) || userName === "settings") ?
                <div></div>
                :
                (boolCheck === true) ?
                    <button className="addRemove btn btn-small btn-solid" onClick={(e) => addFriendf()}>
                    Dodaj Znajomego
                </button>
                :
                    <button className="addRemove btn btn-small btn-solid"  onClick={(e) => removeFriend()}>
                    Usun znajomego
                </button>
            }
        </div> 
  );
};

export default FirendsAddRemove;
