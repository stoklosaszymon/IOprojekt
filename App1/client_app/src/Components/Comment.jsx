import React from "react";
import WriteComments from "./WriteComments"

const Comments = ({ userName, idpost }) => {


    return (
        <div>
            <div>
                <h1>{idpost}</h1>
            </div>
            <div>
                <WriteComments userName={userName} idpost={idpost} />
            </div>
        </div>
    );
};

export default Comments;

