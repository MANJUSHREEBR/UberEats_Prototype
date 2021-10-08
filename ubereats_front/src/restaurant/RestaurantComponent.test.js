/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import Enzyme, { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useDispatch, useSelector, Provider } from 'react-redux';
import store from '../js/store';
import RestaurantComponent from './RestaurantComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing customer Landing Component', () => {
  let wrapper;
  beforeEach(() => {
    const location = {};
    const match = { params: ' ' };
    wrapper = render(<Provider store={store}><RestaurantComponent location={location} match={match} /></Provider>);
  });

  test('Renders Heading with text', () => {
    expect(wrapper.find('Button').text()).toContain('Order now');
  });
//   test('Renders Button with text', () => {
//     expect(wrapper.find('Button').text()).toContain('Search All Restaurants');
//   });
});
