import React from 'react';
import { useSelector } from 'react-redux'

const Account = () => {
    const user = useSelector(state => state.loggedUser);
    
    return (
    <div>
        {(user.nickname === '')? 
            <div className= "account-container" >
                <strong> when you log in you will see your details </strong>
            </div>
            :
            <div className="account-container">
                <strong className="writeFirstName"> First Name: </strong>
                <strong className="firstName"> {user.firstName} </strong>
                <br />
                <strong className="writeLastName"> Lasr Name: </strong>
                <strong className="lastName"> {user.lastName} </strong>
                <br />
                <strong className="writeEmail"> Email: </strong>
                <strong className="email"> {user.email} </strong>
                <br />
                <strong className="writeNickName"> Nickname: </strong>
                <strong className="nickName"> {user.nickname} </strong>
                <br />
            </div >
        }
    </div>
    );
};
export default Account;


