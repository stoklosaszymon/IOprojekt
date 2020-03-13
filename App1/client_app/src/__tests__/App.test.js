import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavBar from '../components/NavBar';

import { useAuth0 } from "../react-auth0-spa";

configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');

const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
};

describe('components/NavBar - logged in', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });
    });

    it('Renders with required props', () => {
        const wrapper = mount(<NavBar />);
        expect(wrapper).toBeTruthy();
    });

    it('Renders with correct link in the menu', () => {
        const wrapper = mount(<NavBar />);
        expect(wrapper).toBeTruthy();
        // should contain a button to be defined
        expect(wrapper.find('button')).toHaveLength(1);
        // the button should be the "Log out" one since the user is logged in
        expect(wrapper.find('button').text()).toEqual('Log out');
        // should contain a <h1>Zalogowano</h1>
        expect(wrapper.find('h1').text()).toEqual('Zalogowano');

    });
});

describe('components/NavBar - logged out', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });
    });

    it('Renders with required props', () => {
        const wrapper = mount(<NavBar />);
        expect(wrapper).toBeTruthy();
    });

    it('Renders Log in button', () => {
        const wrapper = mount(<NavBar />);
        expect(wrapper).toBeTruthy();
        // should contain a button to be defined
        expect(wrapper.find('button')).toHaveLength(1);
        // the button should be the "Log out" one since the user is logged in
        expect(wrapper.find('button').text()).toEqual('Log in');
    });
});