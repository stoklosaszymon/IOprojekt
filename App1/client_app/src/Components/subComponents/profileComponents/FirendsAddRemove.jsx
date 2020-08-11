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
    userName = "ricoss123";
    const [tab, settab] = useState([]);
    //
    useEffect(() => {
        if (userName !== loginUser.nickname) {
            fetch('graphql', {
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
        if (userName !== loginUser.nickname) {
        let element = tab.find((element) => {
            return element === user.id;

        });
        element === user.id ? setboolCheck(false) : setboolCheck(true);
        console.log("+++++");//
        console.log(user.id);//
        }});

    const addFriendf = () => {
        settab(x => [...x, user.id]);
        setboolCheck(false);
        //Api 2

    }

    const removeFriend = () => {
        tab.splice(user.id);
        setboolCheck(true);
        //Api3

    }
    return ( 
        <div className="addRemove">
            {(userName === loginUser.nickname) ?
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
