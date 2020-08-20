import React, { useState, useEffect } from "react";

import FullName from "./../../mainComponents/PostComponents/FullName";
import MainAvatar from "./../../mainComponents/PostComponents/MainAvatar";
import MediaContainer from "./../../mainComponents/PostComponents/MediaContainer";
import MessageContainer from "./../../mainComponents/PostComponents/MessageContainer";
import PostFooter from "./../../mainComponents/PostComponents/PostFooter";
import TimeStamp from "./../../mainComponents/PostComponents/TimeStamp";
import Comments from "./../../subComponents/messagesComponents/Comment";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Tweets = ({ userId }) => {
    let { userName } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{ 
                          posts {
                                getByUserId(userId: "${userId}") { 
                                    postId body createdAt userId image
                                   }
                                }
                           users {
                                getById(id: "${userId}") {
                                    picture firstName lastName nickname
                                }
                           }
                        }`
            }),
        })
            .then(res => res.json())
            .then(res => {
                setPosts(res.posts.getByUserId)
                setUser(res.users.getById)
            })
    }, [userId]);

    return ( 
        <div className="stream-container">
            {
                posts.map(post =>
                    <div className="stream" key={post.postId}>
                        <div className="content">
                            <div className="stream-header-container">
                                <NavLink to={`/${user.nickname}`}>                               
                                    <MainAvatar picture={user.picture}/>
                                    <FullName firstName={user.firstName} lastName={user.lastName}/>
                                </NavLink>
                                <TimeStamp time={post.createdAt} />
                            </div>
                            <MessageContainer message={post.body} />
                            <MediaContainer image={post.image} />
                            <PostFooter />
                            <Comments userName={userName} idpost={post.postId} />  
                        </div>
                    </div>
                )}

        </div> 
  );
};

export default Tweets;
