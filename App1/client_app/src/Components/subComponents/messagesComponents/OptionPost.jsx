import React, { useState } from "react";

const Option = ({ idpost }) => {

    const [chose, setChose] = useState(false);


    const del = (postId) => {
        fetch('../graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                      posts{
                        deletePost(postId: "${postId}")
                      }
                    }`
            }),
        })
            .then(res => res.json())
            .then(res => console.log(res));
        setChose(false)
    }

    const edit = (postId) => {
        setChose(false)
    }

    return (
        <div className="option">
            {(chose === true) ?
                <div>
                    <p className="option delete" onClick={() => del(idpost)}>Delete</p>
                    <p className="option edit" onClick={() => edit(idpost)}>Edit</p>
                </div>
                :
                <div onClick={(e) => setChose(true)}>...</div>
            }
        </div>
    );
};

export default Option;
