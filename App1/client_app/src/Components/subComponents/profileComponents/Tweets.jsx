import React, { useState, useEffect } from "react";
import Default from "../Default";
import { useParams } from "react-router-dom";

const Tweets = () => {
  let defaultHeading = "You haven’t Tweeted yet";
  let defaultSubText = "When you post a Tweet, it’ll show up here.";

    let { userName } = useParams();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: '{ posts { getByUserId(userId: "3") { postId body createdAt userId image}}}' }),
        })
            .then(res => res.json())
            .then(res => setPosts(res.posts.getByUserId))
    }, [posts.postsList]);

    return (
        <div>
            {
                posts.map(post =>
                <div key={post.postId}>
                    <h1>{post.body}</h1>
                </div>    
             )}
        <Default
          heading={`${defaultHeading}`}
          subText={`${defaultSubText}`}
          btnText="Tweet Now"
            />
      </div>  
  );
};

export default Tweets;
