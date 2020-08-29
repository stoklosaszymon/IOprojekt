import React, { useState, useEffect } from "react";

import FullName from "./../../mainComponents/PostComponents/FullName";
import MainAvatar from "./../../mainComponents/PostComponents/MainAvatar";
import MediaContainer from "./../../mainComponents/PostComponents/MediaContainer";
import MessageContainer from "./../../mainComponents/PostComponents/MessageContainer";
import PostFooter from "./../../mainComponents/PostComponents/PostFooter";
import TimeStamp from "./../../mainComponents/PostComponents/TimeStamp";
import Comments from "./../messagesComponents/Comment";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

const HomeStream = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const user = useSelector(state => state.loggedUser);

    useEffect(() => {
        fetch('graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{ 
                         posts { 
                            getAll {
                                postId body createdAt userId image
                            }
                         }
                          users {
                               getAll {
                                id firstName lastName picture nickname 
                            }
                          }
                         }`
            })
        })
            .then(res => res.json())
            .then(res => {
                setPosts(res.posts.getAll);
                setUsers(res.users.getAll);
            })
    }, []);

    let newPosts = posts.map(p => {
        return ({ ...users.find(u => u.id === p.userId), ...p })
    });

    return (
        <div className="stream-container">
            {
                newPosts.map(post =>
                    <div className="stream" key={post.postId}>
                        <div className="content">
                            <div className="stream-header-container">
                                <NavLink to={`/${post.nickname}`}>
                                    <MainAvatar picture={post.picture} />
                                    <FullName firstName={post.firstName} lastName={post.lastName} />
                                </NavLink>
                                <TimeStamp time={post.createdAt} />
                            </div>
                            <MessageContainer message={post.body} />
                            <MediaContainer image={post.image} />
                            <PostFooter />
                            <Comments userName={user.nickname} idpost={post.postId} />
                        </div>
                    </div>
                )}

        </div>
    );
};

export default HomeStream;