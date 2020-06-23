import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MainAvatar from '../Components/mainComponents/PostComponents/MainAvatar'


configure({ adapter: new Adapter() });

jest.mock('../react-auth0-spa');

let imgSrc = 'imgSource';

describe('components/NavBar - logged in', () => {
    it('Renders with required props', () => {
        const wrapper = mount(<MainAvatar />);

        expect(wrapper).toBeTruthy();
    });

    it('Renders img ', () => {
        const wrapper = mount(<MainAvatar picture={imgSrc}/>);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('img')).toHaveLength(1);

    });
    it('Renders img with proper props', () => {
        const wrapper = mount(<MainAvatar picture={imgSrc} />);

        const imgWraper = wrapper.find('img');

        expect(imgWraper.prop('src')).toEqual(imgSrc);
        expect(imgWraper.prop('alt')).toEqual('avatar');
        expect(imgWraper.prop('className')).toEqual("main-avatar-img");

    });
});

