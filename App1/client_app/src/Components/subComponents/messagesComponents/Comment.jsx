import React, { useState, useEffect } from "react";
import WriteComments from "./WriteComments"
import DisplayComments from "./../../mainComponents/PostComponents/DisplayComments"
const Comments = ({ userName, idpost }) => {
        const [count, setCount] = useState(1);
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

    

    return (
        <div>
            {comment.slice(0, count).map(x =>
                <div className="DisplayComments">
                    <DisplayComments userID={x.userId} body={x.body} />
                </div>
            )}
            <div>
                <p onClick={() => setCount(count + 1)}> More comments</p>
            </div>
            <div className=" WriteComments aside-foot">
                <WriteComments userName={userName} idpost={idpost} />
            </div>
        </div>
    );
};

export default Comments;

