import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Banner from '../Components/mainComponents/PostComponents/Banner'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');

let bannerSrc = 'imgSource';

describe('components/NavBar - logged in', () => {
    it('Renders with comonent', () => {
        const wrapper = mount(<Banner />);
        expect(wrapper).toBeTruthy();
    });
    it('Renders banner ', () => {
        const wrapper = mount(<Banner picture={bannerSrc}/>);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find('img')).toHaveLength(1);
    });
    it('Renders banner with props', () => {
        const wrapper = mount(<Banner picture={bannerSrc} />);
        const imgWraper = wrapper.find('img');
        expect(imgWraper.prop('src')).toEqual(bannerSrc);
        expect(imgWraper.prop('alt')).toEqual('banner');
        expect(imgWraper.prop('className')).toEqual("main-Banner-img");
    });
});

