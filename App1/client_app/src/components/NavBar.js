import React from 'react'
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {

    const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();



    return (
        <div>
            <div>
                {!isAuthenticated && (
                        <button onClick={() => loginWithRedirect({})}>Log in</button>
                )}

                {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                    {isAuthenticated ? console.log(getTokenSilently()) : console.log("brak tokena")}
            </div>
        </div>
  );
};

export default NavBar;