export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, logged: true, loggedUser: action.loggedUser };
        case 'LOG_OUT':
            return { ...state, logged: false, loggedUser: null };
        default:
            return state;
    }
};