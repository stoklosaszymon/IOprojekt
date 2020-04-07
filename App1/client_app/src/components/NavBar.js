import React from 'react'
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {

    const { isAuthenticated, loginWithPopup, logout, getTokenSilently, user } = useAuth0();

    return (
        <div>
            <div>
                {!isAuthenticated && (
                    <button onClick={() => loginWithPopup({})}>Log in</button>
                )}

                {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                {isAuthenticated && user !== undefined ? addUser(user) : console.log(user)}
            </div>
        </div>
  );
};

const addUser = ({ sub, given_name, family_name, locale, email }) => {
    fetch('graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                    mutation {
                      users {
                        addUser(user: {
                                  sub: "${sub}",
                                  firstName: "${given_name}",
                                  lastName: "${family_name}",                         
                                  locale: "${locale}",
                                  email: "${email}",
                                }) 
                        {
                           sub
                        }
                      }
                    }`
        }),
    })
}
export default NavBar;