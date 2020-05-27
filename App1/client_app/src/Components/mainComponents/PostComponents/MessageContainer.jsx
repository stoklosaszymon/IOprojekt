import React from "react";

import HashTag from "./HashTag";

const MessageContainer = ({ message }) =>
    <div className="tweet-text-container">
        <p>{message}</p>
        <HashTag />
    </div>

export default MessageContainer;
