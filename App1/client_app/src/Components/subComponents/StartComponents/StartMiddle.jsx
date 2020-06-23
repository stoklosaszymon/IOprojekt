import React from 'react'
import { useAuth0 } from "../../../react-auth0-spa";
import { useDispatch } from 'react-redux'


const StartMiddle = () => {

    let dispatch = useDispatch();

    const { isAuthenticated, loginWithPopup, getTokenSilently, user } = useAuth0();

    let user2 = {};

    const addUser = async () => {
        let token = '';
        if (user !== undefined && getTokenSilently !== undefined) {

            await getTokenSilently().then(e => token = e)

            await fetch('graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                      users {
                        addUser(token: "${token}")  
                      }
                    }`
                }),
            }).then(res => res.json())
                .then(res => user2 = res.users.addUser)
                .then(res => dispatch({ type: 'LOG_IN', loggedUser: user2 }))
        }
    }

    if (isAuthenticated) {
        addUser();
        console.log("auth0 user: ", user);
    }

    return (
        <div className="main-container home">
            <div className="section-middle">
                <p className="text-light">
                    Use this awesome icon to login in our socialmedia student project.
                    </p>
            </div>
            <div className="btn-container text-center">
                {!isAuthenticated && (
                    <button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={() => loginWithPopup({})}
                    >
                        <span className="btn-inner--icon">
                            <img
                                alt="..."
                                src={require("./../../github.svg")}
                            />
                        </span>
                        <span className="btn-inner--text">Github</span>
                    </button>
                )}
                {!isAuthenticated && (
                    <button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={() => loginWithPopup({})}
                    >
                        <span className="btn-inner--icon">
                            <img
                                alt="..."
                                src={require("./../../google.svg")}
                            />
                        </span>
                        <span className="btn-inner--text">Google</span>
                    </button>
                )}
            </div>

        </div>
    );
};

export default StartMiddle;
