import React from 'react'
import { useAuth0 } from "../react-auth0-spa";
import { connect } from 'react-redux';

let NavBar = () => {

    const { isAuthenticated, loginWithPopup, logout, getTokenSilently, user } = useAuth0();

    const addUser = async ({ sub, given_name, family_name, locale, email }) => {
        let token = '';
        if (user !== undefined && getTokenSilently != undefined) {

            await getTokenSilently().then(e => token = e)

            fetch('graphql', {
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
                .then(res => console.log(res));
        }
    }

    if (isAuthenticated) {
        addUser(user);
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
