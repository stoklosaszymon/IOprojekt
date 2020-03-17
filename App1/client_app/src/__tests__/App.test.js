import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavBar from '../components/NavBar';


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');
import { useAuth0 } from "../react-auth0-spa";

const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
};

describe('components/NavBar - logged in', () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });
    });

    it('Renders with required props', () => {
        const wrapper = mount(<NavBar />);
        const { isAuthenticated } = useAuth0();

        expect(wrapper).toBeTruthy();
        expect(isAuthenticated).toEqual(true);
    });

    it('Renders Log out button', () => {
        const wrapper = mount(<NavBar />);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('button')).toHaveLength(1);
        expect(wrapper.find('button').text()).toEqual('Log out');
        expect(wrapper.find('h1').text()).toEqual('Zalogowano');

    });
    it('Calls logout method once on button click', () => {
        const wrapper = mount(<NavBar />)
        wrapper.find('button').simulate('click');
        const { logout } = useAuth0();
        expect(logout).toHaveBeenCalledTimes(1);
    });
});

describe('components/NavBar - logged out', () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Renders with required props', () => {
        const wrapper = shallow(<NavBar />);
        expect(wrapper).toBeTruthy();
        const { isAuthenticated } = useAuth0();
        expect(isAuthenticated).toEqual(false);
    });

    it('Renders Log in button', () => {
        const wrapper = mount(<NavBar />);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('button')).toHaveLength(1);
        expect(wrapper.find('button').text()).toEqual('Log in');
    });

    it('Calls loginWithRedirect method once on button click', () => {
        const wrapper = mount(<NavBar />)
        wrapper.find('button').simulate('click');
        const { loginWithRedirect } = useAuth0();
        expect(loginWithRedirect).toHaveBeenCalledTimes(1);
    });
});