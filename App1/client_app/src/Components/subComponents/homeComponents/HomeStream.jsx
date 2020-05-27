import React, { useState, useEffect } from "react";

import FullName from "./../../mainComponents/PostComponents/FullName";
import HashTag from "./../../mainComponents/PostComponents/HashTag";
import MainAvatar from "./../../mainComponents/PostComponents/MainAvatar";
import MediaContainer from "./../../mainComponents/PostComponents/MediaContainer";
import MessageContainer from "./../../mainComponents/PostComponents/MessageContainer";
import PostFooter from "./../../mainComponents/PostComponents/PostFooter";

const HomeStream = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

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
                                id firstName lastName picture 
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
                                <a href="/demo">
                                    <MainAvatar picture={post.picture} />
                                    <FullName firstName={post.firstName} lastName={post.lastName} />
                                </a>
                                <TimeStamp time={post.createdAt} />
                            </div>
                            <MessageContainer message={post.body} />
                            <MediaContainer image={post.image} />
                            <PostFooter />
                        </div>
                    </div>
                )}

        </div>
    );
};

const TimeStamp = ({ time }) =>
    <div className="time">
        <span className="timestamp">{time}</span>
    </div>

export default HomeStream;