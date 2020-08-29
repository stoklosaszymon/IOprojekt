import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TimeStamp from '../Components/mainComponents/PostComponents/TimeStamp'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');

let time = "12";

describe('components/NavBar - logged in', () => {
    it('Renders with comonent', () => {
        const wrapper = mount(<TimeStamp />);
        expect(wrapper).toBeTruthy();
    });
    it('Renders timeStamp ', () => {
        const wrapper = mount(<TimeStamp time={time} />);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('span')).toHaveLength(1); 
    });
    it('Renders timeStamp with proper props', () => {
        const wrapper = mount(<TimeStamp time={time}/>);
        const ClasshWraper = wrapper.find('div');
        const TimeWraper = wrapper.find('span');
        expect(TimeWraper.text()).toEqual(`${time}`);
        expect(TimeWraper.prop('className')).toEqual("timestamp");
        expect(ClasshWraper.prop('className')).toEqual("time");
    });
});

