/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import Enzyme, { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Image, Modal, Button } from 'react-bootstrap';
import store from '../js/store';
import Customerdashboard from './Customerdashboard';
import { API } from '../config';
import { customerUpdateProfile } from '../js/actions/customerActions';
import locations from '../location';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing customer Landing Component', () => {
  let wrapper;
  beforeEach(() => {
    const location = {};
    const match = { params: ' ' };
    wrapper = render(<Provider store={store}><Customerdashboard location={location} match={match} /></Provider>);
  });

  test('Renders Heading with text', () => {
    expect(wrapper.find('h2').text()).toContain("We didn't find matching");
  });
  test('Renders Button with text', () => {
    expect(wrapper.find('Button').text()).toContain('Search All Restaurants');
  });
});
