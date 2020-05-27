import React from "react";

const MediaContainer = ({ image }) => {

    let render =
        <div className="stream-media-container">
            <img src={image} alt="SpongeBob" className="media-img" />
        </div>;

    return image !== '' ? render : <p></p>
}

export default MediaContainer;
