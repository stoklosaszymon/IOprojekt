import React from 'react'
import { useAuth0 } from "../react-auth0-spa";
import { useDispatch } from 'react-redux'

const NavBar = () => {
    let dispatch = useDispatch();

    const { isAuthenticated, loginWithPopup, logout, getTokenSilently, user } = useAuth0();

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
                .then(res => dispatch({ type: 'LOG_IN', loggedUser: user2 }) )
        }
    }

    if (isAuthenticated) {
        addUser();
        console.log("auth0 user: ", user);
    }

    return (
        <div>
            <div>
                {!isAuthenticated && (
                    <button onClick={() => loginWithPopup({})}>Log in</button>
                )}

                {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                
            </div>
        </div>
  );
};

export default NavBar;