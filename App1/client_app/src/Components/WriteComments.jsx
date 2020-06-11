import React, { useState, useEffect } from "react";
import MainAvatar from "./mainComponents/PostComponents/MainAvatar"
const Comments = ({ userName, idpost }) => {




    const [comment, setValue] = useState('');
    const [user, setUser] = useState({ id: '', picture: '' });;
    useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `{ users { getByNickname(nickname: "${userName}") { id picture }}}` }),
        })
            .then(res => res.json())
            .then(res => setUser(res.users.getByNickname))
    }, [userName]);

    const Send = () => {

            fetch('graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                      mutation {
                      comments {
                        addComment (comment: { body: "${comment}", userId: "${user.id}", postId: "${idpost}"}) {
                          body
                        }
                      }
                    }`
                }),
            })
                .then(res => res.json())
                .then(res => console.log(res))
       
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
                <button className="btn btn-small btn-solid" onClick={Send}>Wysliji</button>
            </div>
        </div>
    );
};

export default Comments;