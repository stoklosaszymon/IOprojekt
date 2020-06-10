import React, { useState, useEffect } from "react";
import MainAvatar from "./mainComponents/PostComponents/MainAvatar"
const Comments = ({ userName }) => {




    const [comment, setValue] = useState('');
    const [user, setUser] = useState({ picture: '' });;
    useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `{ users { getByNickname(nickname: "${userName}") { picture }}}` }),
        })
            .then(res => res.json())
            .then(res => setUser(res.users.getByNickname))
    }, [userName]);

    const Send = () => {
        console.log(comment);
        setValue('');
    };

  

    return (
        <div>

            <div>
                <div className="WriteComments main-avatar">
                    <MainAvatar picture={user.picture} />
                </div>
                <input type="text"
                    name="comment"
                    value={comment}
                    onChange={event => setValue(event.target.value)} />
                <button onClick={Send}>Wysliji</button>
            </div>
        </div>
    );
};

export default Comments;