import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FullName from '../Components/mainComponents/PostComponents/FullName'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');
let firstName = 'aa';
let lastName = 'bb';

describe('components/NavBar - logged in', () => {
    it('Renders with comonent', () => {
        const wrapper = mount(<FullName />);
        expect(wrapper).toBeTruthy();
    });
    it('Renders fullName ', () => {
        const wrapper = mount(<FullName firstName={firstName} lastName={lastName}/>);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('strong')).toHaveLength(1);
    });
    it('Renders fullName with proper props', () => {
        const wrapper = mount(<FullName firstName={firstName} lastName={lastName} />);
        const nameWraper = wrapper.find('strong');
        expect(nameWraper.text()).toEqual(`${firstName} ${lastName}`);
        expect(nameWraper.prop('className')).toEqual("fullname");
    });
});

