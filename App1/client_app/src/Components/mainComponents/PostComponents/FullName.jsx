import React from "react";

const FullName = ({ firstName, lastName }) => 
    <div className="fullname-container">
        <strong className="fullname">{`${firstName} ${lastName}`}</strong>
    </div>

export default FullName;
