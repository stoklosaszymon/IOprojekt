import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MessageContainer from '../Components/mainComponents/PostComponents/MessageContainer'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');

let message = "123";

describe('components/NavBar - logged in', () => {
    it('Renders with comonent', () => {
        const wrapper = mount(<MessageContainer />);
        expect(wrapper).toBeTruthy();
    });
    it('Renders messageContainer ', () => {
        const wrapper = mount(<MessageContainer message={message} />);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('p')).toHaveLength(2);
        expect(wrapper.find('HashTag')).toHaveLength(1);
    });
    it('Renders messageContainer with proper props', () => {
        const wrapper = mount(<MessageContainer message={message} />);
        const ClasshWraper = wrapper.find('div');
        expect(wrapper.text()).toEqual(`${message}#tag`);
        expect(ClasshWraper.prop('className')).toEqual("tweet-text-container");
    });
});

