import React from 'react'
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    const { isAuthenticated, loginWithRedirect, logout } = props;

    return (
        <>

        {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}

        { isAuthenticated && <button onClick={() => logout()}>Log out</button>}

        {
            isAuthenticated && (
                <>
                    <h1>Zalogowano</h1>
                </>
            )
        }
        </>
  );
};

export default NavBar;