import { createStore } from 'redux';

export const store = createStore(reducer, { logged: false, loggedUserId: 0 });