import React, { useState, useEffect } from "react";
import WriteComments from "./WriteComments"
import DisplayComments from "./DisplayComments"
const Comments = ({ userName, idpost }) => {

        const [comment, setValue] = useState([])
        useEffect(() => {
            fetch('graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query:
                        `{ comments { getByPostId(postId: "${idpost}") {body userId}}
  
                    }`
                }),
            })
                .then(res => res.json())
                .then(res => setValue(res.comments.getByPostId))
                    
                   
                
        }, [idpost]);


    console.log(comment);
    return (
        <div>
            <div>
                {comment.map(x =>
                    <div>
                        <DisplayComments userID={x.userId} body={x.body} />
                    </div>                  
                    )}
            </div>
            <div>
                <WriteComments userName={userName} idpost={idpost} />
            </div>
        </div>
    );
};

export default Comments;

