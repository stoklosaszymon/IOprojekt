import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavBar from '../components/NavBar';


configure({ adapter: new Adapter() });

it('renders log in button', () => {
    const mocked = {
        isAuthenticated: true,
        loginWithRedirect: jest.fn(),
        logout: jest.fn()
    }

    const { getByText } = render(<NavBar {...mocked}/>)

    const button = shallow((<NavBar {...mocked}>Log out</NavBar>));
    button.find('button').simulate('click');


    expect(mocked.logout.mock.calls.length).toEqual(1);
   // expect(getByText("Log out")).toBeTruthy();
});
