import React from "react";

const MessageContainer = ({ message }) =>
    <div className="tweet-text-container">
        <p>{message}</p>
        <HashTag />
    </div>

export default MessageContainer;
