import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HashTag from '../Components/mainComponents/PostComponents/HashTag'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');


describe('components/NavBar - logged in', () => {
    it('Renders with comonent', () => {
        const wrapper = mount(<HashTag />);
        expect(wrapper).toBeTruthy();
    });
    it('Renders hashTag ', () => {
        const wrapper = mount(<HashTag />);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('a')).toHaveLength(1);
    });
    it('Renders hashTag with proper props', () => {
        const wrapper = mount(<HashTag />);
        const hashWraper = wrapper.find('a');
        expect(hashWraper.text()).toEqual(`#tag`);
        expect(hashWraper.prop('href')).toEqual("#demo");
        expect(hashWraper.prop('className')).toEqual("hashtag");
    });
});

