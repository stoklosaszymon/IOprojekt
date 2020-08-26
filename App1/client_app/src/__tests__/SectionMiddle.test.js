import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SectionMiddle from '../Components/mainComponents/mainSection/SectionMiddle'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');

let data = "123";

describe('components/NavBar - logged in', () => {
    it('Renders with comonent', () => {
        const wrapper = mount(<SectionMiddle />);
        expect(wrapper).toBeTruthy();
    });
    it('Renders sectionMiddle ', () => {
        const wrapper = mount(<SectionMiddle data={data} />);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('div')).toHaveLength(1); 
    });
    it('Renders sectionMiddle with proper props', () => {
        const wrapper = mount(<SectionMiddle data={data}/>);
        expect(wrapper.text()).toEqual(`${data}`);
    });
});

