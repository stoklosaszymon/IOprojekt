import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SectionHeader from '../Components/mainComponents/mainSection/SectionHeader'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');



let heading = "AA";
let logo = "123";
let subText = "SS";

describe('components/NavBar - logged in', () => {
    it('Renders with comonent', () => {
        const wrapper = mount(<SectionHeader />);
        expect(wrapper).toBeTruthy();
    });
    it('Renders sectionHeader ', () => {
        const wrapper = mount(<SectionHeader heading={heading} logo={logo} subText={subText} />);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('span')).toHaveLength(2); 
        expect(wrapper.find('div')).toHaveLength(2); 
    });
    it('Renders sectionHeader with proper props', () => {
        const wrapper = mount(<SectionHeader heading={heading} logo={logo} subText={subText} />);
        expect(wrapper.text()).toEqual(`${heading} ${subText} ${logo}`); 
    });
});

