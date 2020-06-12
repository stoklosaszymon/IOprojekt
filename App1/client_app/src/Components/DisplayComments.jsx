import React, { useState, useEffect } from "react";
import FullName from "./mainComponents/PostComponents/FullName";
import MainAvatar from "./mainComponents/PostComponents/MainAvatar";
const Comments = ({ userID, body }) => {

    
    const [user, setUser] = useState({ firstName: '', lastName: '', picture: '' });

    useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `{ users { getById(id: "${userID}") {  firstName lastName picture }}}` }),
        })
            .then(res => res.json())
            .then(res => setUser(res.users.getById))
    }, [userID]);
    
    return (
        <div>
            <div>
                <MainAvatar picture={user.picture} />
                <FullName firstName={user.firstName} lastName={user.lastName} />
                {body}
            </div>
        </div>
    );
};

export default Comments;