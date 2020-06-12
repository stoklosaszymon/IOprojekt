import React, { useState, useEffect } from "react";

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
 
                {body}
            </div>
        </div>
    );
};

export default Comments;