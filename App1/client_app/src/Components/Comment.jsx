import React from "react";


const Comments = ({ userName, idpost }) => {
    //<AllComments idpost={idpost}/>
    //<WritComment username={useParams}/>

    return (
        <div>
            <div>
                <h1>{idpost}</h1>
            </div>
            <div>
                {userName}
            </div>
        </div>
    );
};

export default Comments;

