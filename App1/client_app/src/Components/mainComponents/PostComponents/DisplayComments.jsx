import React, { useState, useEffect } from "react";
import FullName from "./FullName";
import MainAvatar from "./MainAvatar";
import { NavLink } from "react-router-dom";

const DisplayComments = ({ userID, body }) => {

    
    const [user, setUser] = useState({ firstName: '', lastName: '', picture: '' });

    useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `{ users { getById(id: "${userID}") {  firstName lastName picture nickname}}}` }),
        })
            .then(res => res.json())
            .then(res => setUser(res.users.getById))
    }, [userID]);
    
    return (
        <div>
            <div>
                <MainAvatar picture={user.picture} />
                <NavLink to={`/${user.nickname}`}>
                    <FullName firstName={user.firstName} lastName={user.lastName} />
                </NavLink><br />
                {body}
            </div>
        </div>
    );
};

export default DisplayComments;