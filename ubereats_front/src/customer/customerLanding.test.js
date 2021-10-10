/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import Enzyme, { render, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { useDispatch, useSelector, Provider } from 'react-redux';
import {
  Row, Col, ButtonGroup,
  ToggleButton, Button,
} from 'react-bootstrap';
import CardComponent from '../core/CardComponent';
import { listRestaurants } from '../js/actions/restaurantAction';
import Checkbox from '../core/Checkbox';
import store from '../js/store';
import Home from './customerLanding';

Enzyme.configure({ adapter: new Adapter() });
const radios = [
  { name: 'veg', value: '1' },
  { name: 'nonveg', value: '2' },
  { name: 'vegan', value: '3' },
];
describe('Testing customer Landing Component', () => {
  let wrapper;
  beforeEach(() => {
    const location = {};
    const match = { params: ' ' };
    wrapper = render(<Provider store={store}><Home location={location} match={match} /></Provider>);
  });

  test('Renders Heading with text', () => {
    expect(wrapper.find('h2').text()).toContain("We didn't find matching");
  });
  test('Renders Button with text', () => {
    expect(wrapper.find('Button').text()).toContain('Search All Restaurants');
  });
//   test('Checking for the prop values', () => {
//     const location = { };
//     const match = { params: ' ' };
//     const wrap = mount(<Home location={location} match={match} />);
//     console.log(wrap);
//     expect(wrapper.find('Button').text()).toContain('Search All Restaurants');
//   });
});
