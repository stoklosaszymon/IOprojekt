import React from 'react'
import { useAuth0 } from "../react-auth0-spa";
import { connect } from 'react-redux';

let NavBar = () => {

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                    <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </div>
  );
};

const mapStateToProps = (state) => {
    return { logged: state.logged, loggedUserId: state.loggedUserId };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: (userId) => dispatch({ type: 'LOG_IN', loggedUserId: userId }),
        onLogOut: () => dispatch({ type: 'LOG_OUT' }),
    }
};

export default NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);